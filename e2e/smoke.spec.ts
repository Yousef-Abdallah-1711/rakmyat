import { expect, test } from '@playwright/test'

for (const locale of ['en', 'ar'] as const) {
  test(`${locale} foundation route responds and sets document direction`, async ({
    page,
  }) => {
    const response = await page.goto(`/${locale}`)

    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      locale === 'ar' ? 'ar-EG' : 'en',
    )
    await expect(page.locator('html')).toHaveAttribute(
      'dir',
      locale === 'ar' ? 'rtl' : 'ltr',
    )
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
}

test('root negotiates from Accept-Language and saves the decision', async ({
  request,
}) => {
  const response = await request.get('/', {
    headers: { 'Accept-Language': 'ar-EG,ar;q=0.9' },
    maxRedirects: 0,
  })

  expect(response.status()).toBe(307)
  expect(response.headers().location).toBe('/ar')
  expect(response.headers()['set-cookie']).toContain('NEXT_LOCALE=ar')
})

test('root honors the saved locale over an Arabic Accept-Language header', async ({
  request,
}) => {
  const response = await request.get('/', {
    headers: {
      cookie: 'NEXT_LOCALE=en',
      'Accept-Language': 'ar-EG,ar;q=0.9',
    },
    maxRedirects: 0,
  })

  expect(response.status()).toBe(307)
  expect(response.headers().location).toBe('/en')
  expect(response.headers()['set-cookie']).toContain('NEXT_LOCALE=en')
})

test('root follows Accept-Language quality preferences', async ({
  request,
}) => {
  const response = await request.get('/', {
    headers: { 'Accept-Language': 'en;q=1,ar;q=0.5' },
    maxRedirects: 0,
  })

  expect(response.status()).toBe(307)
  expect(response.headers().location).toBe('/en')
})

test('Payload admin and REST routes remain available with protected users', async ({
  request,
}) => {
  const admin = await request.get('/admin')
  expect(admin.status()).toBe(200)

  const publicRead = await request.get('/api/users?limit=1')
  expect(publicRead.status()).toBe(403)
})

test('unused Payload GraphQL routes are disabled', async ({ request }) => {
  const graphql = await request.post('/api/graphql', {
    data: { query: '{ __typename }' },
  })
  expect(graphql.status()).toBe(404)

  const playground = await request.get('/api/graphql-playground')
  expect(playground.status()).toBe(404)
})
