import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const locale of ['en', 'ar'] as const) {
  test(`${locale} foundation has no serious or critical axe violations`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`)
    const result = await new AxeBuilder({ page }).analyze()

    expect(
      result.violations.filter(
        ({ impact }) => impact === 'critical' || impact === 'serious',
      ),
    ).toEqual([])
  })
}
