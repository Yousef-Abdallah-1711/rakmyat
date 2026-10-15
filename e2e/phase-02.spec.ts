import { mkdir } from 'node:fs/promises'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const locales = [
  { locale: 'en', lang: 'en', title: 'Phase 02 component foundation' },
  { locale: 'ar', lang: 'ar-EG', title: 'أساس مكونات المرحلة الثانية' },
] as const

for (const { locale, lang, title } of locales) {
  test(`prototype ${locale} renders all labeled slots without horizontal overflow`, async ({
    page,
  }, testInfo) => {
    await page.goto(`/${locale}/phase-02`)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    expect(
      await page.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue('--dir')
          .trim(),
      ),
    ).toBe(locale === 'ar' ? '-1' : '1')
    await expect(
      page.getByRole('heading', { level: 1, name: title }),
    ).toBeVisible()
    for (const slot of ['HOME-01', 'HOME-02', 'HOME-03', 'HOME-04']) {
      await expect(page.getByText(slot, { exact: true })).toBeVisible()
    }
    const navigation =
      testInfo.project.name === 'desktop'
        ? page.getByRole('navigation', {
            name: locale === 'en' ? 'Primary navigation' : 'التنقل الرئيسي',
            exact: true,
          })
        : page.getByRole('dialog').getByRole('navigation')
    if (testInfo.project.name !== 'desktop') {
      await page
        .getByRole('button', {
          name: locale === 'en' ? 'Open navigation menu' : 'فتح قائمة التنقل',
        })
        .click()
    }
    const navNames = await navigation.getByRole('link').allTextContents()
    expect(navNames).toEqual(
      locale === 'en'
        ? ['Work', 'Services', 'Process', 'About', 'Contact']
        : ['أعمالنا', 'خدماتنا', 'منهجيتنا', 'من نحن', 'تواصل معنا'],
    )
    if (testInfo.project.name !== 'desktop') {
      await page
        .getByRole('dialog')
        .getByRole('button', {
          name:
            locale === 'en' ? 'Close navigation menu' : 'إغلاق قائمة التنقل',
        })
        .click()
    }
    for (const label of locale === 'en'
      ? ['Navigation', 'Services', 'Contact and legal']
      : ['التنقل', 'الخدمات', 'التواصل والمعلومات القانونية']) {
      await expect(
        page.getByRole('navigation', { name: label, exact: true }),
      ).toBeVisible()
    }
    await expect(
      page.getByText(/NOT REAL CONTENT|محتوى غير حقيقي/).first(),
    ).toBeVisible()
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(overflow).toBe(false)
    const badgeBorderColors = await page
      .locator('span[data-kind]')
      .evaluateAll((badges) =>
        badges.map((badge) => getComputedStyle(badge).borderTopColor),
      )
    expect(new Set(badgeBorderColors).size).toBe(4)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(
      results.violations.filter((violation) =>
        ['critical', 'serious'].includes(violation.impact ?? ''),
      ),
    ).toEqual([])

    const reveal = page.locator('[data-scroll-reveal="ready"]')
    await reveal.evaluate((element) => {
      const top = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: top - window.innerHeight * 0.5,
        behavior: 'instant',
      })
    })
    await expect
      .poll(() =>
        reveal.evaluate((element) => getComputedStyle(element).transform),
      )
      .toBe('matrix(1, 0, 0, 1, 0, 0)')

    const fonts = await page.evaluate(() =>
      performance
        .getEntriesByType('resource')
        .filter((entry) => /\/fonts\/.*\.woff2(?:\?|$)/.test(entry.name))
        .map((entry) => ({
          name: entry.name,
          bytes: (entry as PerformanceResourceTiming).transferSize,
        })),
    )
    const fontURLs = fonts.map((font) => font.name)
    const loadedFamilies = await page.evaluate(() => [
      ...new Set(
        [...document.fonts]
          .filter((font) => font.status === 'loaded')
          .map((font) => font.family),
      ),
    ])
    const preloadedFontCount = await page
      .locator('link[rel="preload"][as="font"]')
      .count()
    expect(preloadedFontCount).toBe(locale === 'en' ? 2 : 0)
    if (locale === 'en') {
      expect(fontURLs.some((url) => url.includes('ibm-plex-sans-arabic'))).toBe(
        false,
      )
      expect(loadedFamilies).toContain('Space Grotesk')
      expect(loadedFamilies).toContain('Inter')
      expect(loadedFamilies).toContain('IBM Plex Mono')
      expect(loadedFamilies).not.toContain('IBM Plex Sans Arabic')
    } else {
      expect(
        fontURLs.some((url) =>
          /space-grotesk|inter-latin|ibm-plex-mono/.test(url),
        ),
      ).toBe(false)
      expect(loadedFamilies).toContain('IBM Plex Sans Arabic')
      expect(loadedFamilies).not.toContain('Space Grotesk')
      expect(loadedFamilies).not.toContain('Inter')
      expect(
        await page.evaluate(() =>
          document.fonts.check('16px "IBM Plex Sans Arabic"', 'رقميات'),
        ),
      ).toBe(true)
    }
    const fontBytes = fonts.reduce((total, font) => total + font.bytes, 0)
    expect(
      fontBytes,
      `${locale} font transfer budget: ${JSON.stringify(fonts)}`,
    ).toBeLessThanOrEqual(locale === 'en' ? 180 * 1024 : 120 * 1024)

    if (testInfo.project.name !== 'narrow-mobile') {
      await mkdir('screenshots/phase-02', { recursive: true })
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: 'instant' }),
      )
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
      await page.screenshot({
        path: `screenshots/phase-02/${locale}-${testInfo.project.name}.png`,
        fullPage: true,
      })
    }
  })
}

for (const { locale, lang } of locales) {
  test(`mobile drawer supports keyboard open and Escape close in ${locale}`, async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name === 'desktop')
    await page.goto(`/${locale}/phase-02`)
    const trigger = page.getByRole('button', {
      name: locale === 'en' ? 'Open navigation menu' : 'فتح قائمة التنقل',
    })
    await trigger.focus()
    await page.keyboard.press('Enter')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('navigation')).toBeVisible()
    const focusable = dialog.locator('a[href], button:not([disabled])')
    const focusableCount = await focusable.count()
    for (let index = 0; index < focusableCount + 1; index += 1) {
      await page.keyboard.press('Tab')
      await expect
        .poll(() =>
          dialog.evaluate((element) =>
            element.contains(document.activeElement),
          ),
        )
        .toBe(true)
    }
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
  })
}

test('language switch preserves the prototype route in both directions', async ({
  page,
}, testInfo) => {
  await page.goto('/en/phase-02')
  await page.waitForLoadState('networkidle')
  const arabicChoice = page.locator(
    'a.language-switcher__choice[href="/ar/phase-02"]',
  )
  if (testInfo.project.name !== 'desktop') {
    await page.getByRole('banner').getByRole('button').click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await dialog.evaluate(async (element) => {
      await Promise.all(
        element
          .getAnimations({ subtree: true })
          .map((animation) => animation.finished.catch(() => undefined)),
      )
    })
    await dialog
      .locator('a.language-switcher__choice[href="/ar/phase-02"]')
      .click()
  } else {
    await expect(arabicChoice.first()).toHaveAttribute('href', '/ar/phase-02')
    await arabicChoice.first().click()
  }
  await expect(page).toHaveURL(/\/ar\/phase-02$/, { timeout: 15_000 })
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar-EG')

  if (testInfo.project.name !== 'desktop') {
    await page.waitForLoadState('networkidle')
    await page.getByRole('banner').getByRole('button').click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await dialog.evaluate(async (element) => {
      await Promise.all(
        element
          .getAnimations({ subtree: true })
          .map((animation) => animation.finished.catch(() => undefined)),
      )
    })
    await dialog
      .locator('a.language-switcher__choice[href="/en/phase-02"]')
      .click()
  } else {
    const englishChoice = page.locator(
      'a.language-switcher__choice[href="/en/phase-02"]',
    )
    await expect(englishChoice.first()).toHaveAttribute('href', '/en/phase-02')
    await englishChoice.first().click()
  }
  await expect(page).toHaveURL(/\/en\/phase-02$/, { timeout: 15_000 })
})

for (const { locale } of locales) {
  test(`modal traps focus and closes with Escape in ${locale}`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/phase-02`)
    const trigger = page.getByTestId('modal-preview-trigger')
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await dialog.evaluate(async (element) => {
      await Promise.all(
        element
          .getAnimations({ subtree: true })
          .map((animation) => animation.finished.catch(() => undefined)),
      )
    })

    const focusable = dialog.locator('a[href], button:not([disabled])')
    const focusableCount = await focusable.count()
    for (let index = 0; index < focusableCount + 1; index += 1) {
      await page.keyboard.press('Tab')
      await expect
        .poll(() =>
          dialog.evaluate((element) =>
            element.contains(document.activeElement),
          ),
        )
        .toBe(true)
    }

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })
}

test('404 shell remains available without any Payload data request', async ({
  page,
}) => {
  await page.route('**/api/**', (route) => route.abort())
  await page.goto('/en/this-page-does-not-exist')
  await expect(
    page.getByRole('heading', { name: 'This page is not here.' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Go to home' })).toBeVisible()
})

test('scroll reveal leaves content static when reduced motion is requested', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/en/phase-02')
  const reveal = page.locator('[data-scroll-reveal="ready"]')
  await reveal.scrollIntoViewIfNeeded()
  await expect(
    reveal.getByRole('heading', { name: 'Section reveal test' }),
  ).toBeVisible()
  expect(
    await reveal.evaluate((element) => getComputedStyle(element).transform),
  ).toBe('none')
})

test('primary button hover deepens to the approved deep cobalt', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')
  await page.goto('/en/phase-02')
  const button = page.getByRole('link', { name: 'Start a Project' })
  expect(
    await button.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    ),
  ).toBe('rgb(36, 83, 255)')
  await button.hover()
  await expect
    .poll(() =>
      button.evaluate((element) => getComputedStyle(element).backgroundColor),
    )
    .toBe('rgb(23, 54, 184)')
})
