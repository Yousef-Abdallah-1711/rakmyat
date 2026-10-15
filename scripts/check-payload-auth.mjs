import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { randomBytes, randomUUID } from 'node:crypto'
import { chromium } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3101'
const email = `phase01-${randomUUID()}@example.invalid`
const password = randomBytes(32).toString('base64url')
const browser = await chromium.launch({ headless: true })
let context
let userID
let cleanedUp = false

async function waitForApp() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`${baseURL}/admin`, {
        signal: AbortSignal.timeout(3_000),
      })
      if (response.ok) return
    } catch {
      // The app may be waiting for PostgreSQL to finish restarting.
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  throw new Error('The app did not become healthy after the database restart.')
}

async function getCurrentUser(request) {
  const response = await request.get(`${baseURL}/api/users/me`)
  assert.equal(response.status(), 200, 'authenticated session should be valid')
  const body = await response.json()
  assert.ok(body.user?.id, 'Payload should return the persisted user record')
  return body.user
}

async function signIn(page) {
  await page.goto(`${baseURL}/admin/login`, {
    waitUntil: 'networkidle',
    timeout: 90_000,
  })
  assert.equal(new URL(page.url()).pathname, '/admin/login')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: /log ?in|sign ?in/i }).click()
  await page.waitForURL(
    (url) => url.pathname === '/admin' || url.pathname === '/admin/',
  )
  return getCurrentUser(page.request)
}

async function removeTemporaryUser(request) {
  const login = await request.post(`${baseURL}/api/users/login`, {
    data: { email, password },
  })
  if (!login.ok()) return false

  const { token, user } = await login.json()
  if (!token || !user?.id) return false

  const deletion = await request.delete(
    `${baseURL}/api/users/${encodeURIComponent(user.id)}`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  return [200, 204].includes(deletion.status())
}

try {
  context = await browser.newContext()
  const page = await context.newPage()
  page.setDefaultNavigationTimeout(90_000)

  await waitForApp()
  await page.goto(`${baseURL}/admin`, {
    waitUntil: 'networkidle',
    timeout: 90_000,
  })
  await page.waitForURL((url) => url.pathname === '/admin/create-first-user')
  assert.equal(new URL(page.url()).pathname, '/admin/create-first-user')
  await page.waitForFunction(() => document.title.trim().length > 0)
  assert.equal(await page.getByRole('heading', { name: 'Welcome' }).count(), 1)

  const accessibility = await new AxeBuilder({ page }).analyze()
  const blockingViolations = accessibility.violations.filter(({ impact }) =>
    ['critical', 'serious'].includes(impact),
  )
  assert.deepEqual(blockingViolations, [], 'first-user form should pass axe')

  await page.getByLabel('Email').fill(email)
  await page.getByLabel('New Password').fill(password)
  await page.getByLabel('Confirm Password').fill(password)
  const firstRegisterResponse = page.waitForResponse(
    (response) =>
      response.url().includes('/api/users/first-register') &&
      response.request().method() === 'POST',
  )
  await page.getByRole('button', { name: 'Create' }).click()
  const registration = await firstRegisterResponse
  assert.equal(
    registration.status(),
    200,
    'first-user registration should work',
  )
  const createdUser = await getCurrentUser(page.request)
  userID = createdUser.id
  assert.ok(createdUser.email, 'the first user should be stored with an email')

  const authenticatedRead = await page.request.get(
    `${baseURL}/api/users?limit=1`,
  )
  assert.equal(
    authenticatedRead.status(),
    200,
    'authenticated Payload users read should be allowed',
  )
  const users = await authenticatedRead.json()
  assert.ok(
    users.docs.some((user) => String(user.id) === String(userID)),
    'authenticated users read should include the signed-in user',
  )

  const unauthenticatedContext = await browser.newContext()
  try {
    const publicRead = await unauthenticatedContext.request.get(
      `${baseURL}/api/users?limit=1`,
    )
    assert.equal(publicRead.status(), 403, 'public user reads must be denied')

    const publicCreate = await unauthenticatedContext.request.post(
      `${baseURL}/api/users`,
      { data: { email: `blocked-${randomUUID()}@example.invalid`, password } },
    )
    assert.equal(publicCreate.status(), 403, 'public user creation is denied')
  } finally {
    await unauthenticatedContext.close()
  }

  await context.close()
  context = await browser.newContext()
  const loginPage = await context.newPage()
  const signedInUser = await signIn(loginPage)
  assert.equal(String(signedInUser.id), String(userID))

  execFileSync(
    'docker',
    ['compose', '--env-file', '.env.local', 'restart', 'db'],
    {
      stdio: 'ignore',
    },
  )
  await waitForApp()

  await context.close()
  context = await browser.newContext()
  const persistedPage = await context.newPage()
  const persistedUser = await signIn(persistedPage)
  assert.equal(String(persistedUser.id), String(userID))

  const deleteResponse = await persistedPage.request.delete(
    `${baseURL}/api/users/${encodeURIComponent(userID)}`,
  )
  assert.ok(
    [200, 204].includes(deleteResponse.status()),
    'temporary integration-test account should be removed',
  )
  cleanedUp = true

  console.log(
    'PASS: Payload first-user setup, authenticated admin login, protected user reads/creation, database restart persistence, and test-account cleanup.',
  )
} finally {
  if (userID && !cleanedUp) {
    const cleanupContext = context ?? (await browser.newContext())
    try {
      cleanedUp = await removeTemporaryUser(cleanupContext.request)
      if (!cleanedUp) {
        console.error(
          'Cleanup could not remove the temporary auth-check account; inspect the local Payload Users collection before continuing.',
        )
      }
    } catch {
      console.error(
        'Cleanup could not remove the temporary auth-check account; inspect the local Payload Users collection before continuing.',
      )
    }
    if (cleanupContext !== context) await cleanupContext.close()
  }

  await context?.close()
  await browser.close()
}
