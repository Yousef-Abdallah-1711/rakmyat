import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const outputRoot = 'screenshots/phase-02/corrective'
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow-mobile', width: 320, height: 740 },
]

const browser = await chromium.launch({ headless: true })
try {
  for (const locale of ['en', 'ar']) {
    for (const viewport of viewports) {
      const directory = `${outputRoot}/${locale}-${viewport.name}`
      await mkdir(directory, { recursive: true })
      const page = await browser.newPage({ viewport })
      await page.goto(`http://127.0.0.1:3102/${locale}/phase-02`, {
        waitUntil: 'networkidle',
      })
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({
        path: `${directory}/prototype.png`,
        fullPage: true,
      })

      const accordion = page.getByTestId('review-accordion')
      const trigger = accordion.getByRole('button')
      await accordion.screenshot({
        path: `${directory}/accordion-collapsed.png`,
      })
      await trigger.click()
      await accordion.getByRole('region').waitFor({ state: 'visible' })
      await accordion.screenshot({
        path: `${directory}/accordion-expanded.png`,
      })

      const service = page.getByTestId('review-service-row')
      await service.screenshot({ path: `${directory}/service-row-default.png` })
      await service.focus()
      await service.screenshot({ path: `${directory}/service-row-focus.png` })
      if (viewport.width >= 768) {
        await service.hover()
        await service.screenshot({ path: `${directory}/service-row-hover.png` })
      }

      await page
        .getByTestId('prototype-form-fixtures')
        .screenshot({ path: `${directory}/form-controls.png` })

      const emailField = page.locator('input[name="fixture-email"]')
      await emailField.scrollIntoViewIfNeeded()
      const stickyHeaderCheck = await page.evaluate(() => {
        const header = document.querySelector('header')
        const field = document.querySelector('input[name="fixture-email"]')
        if (!header || !field) throw new Error('Header or email field missing')
        const headerRect = header.getBoundingClientRect()
        const fieldRect = field.getBoundingClientRect()
        const labelRect = field
          .closest('.form-field')
          ?.querySelector('label')
          ?.getBoundingClientRect()
        return {
          headerBottom: headerRect.bottom,
          labelTop: labelRect?.top ?? 0,
          fieldTop: fieldRect.top,
          fieldBottom: fieldRect.bottom,
        }
      })
      if (
        stickyHeaderCheck.fieldBottom > 0 &&
        (stickyHeaderCheck.fieldTop < stickyHeaderCheck.headerBottom ||
          stickyHeaderCheck.labelTop < stickyHeaderCheck.headerBottom)
      ) {
        throw new Error(
          `Sticky header overlaps email field at ${locale}/${viewport.name}: ${JSON.stringify(stickyHeaderCheck)}`,
        )
      }
      if (viewport.width <= 390) {
        await page.screenshot({
          path: `${directory}/form-visible-below-sticky-header.png`,
          fullPage: false,
        })
      }

      if (viewport.width < 1024) {
        const menuTrigger = page.getByRole('banner').getByRole('button').first()
        await menuTrigger.focus()
        await page.keyboard.press('Enter')
        await page
          .getByTestId('mobile-drawer-content')
          .waitFor({ state: 'visible' })
        await page
          .getByTestId('mobile-drawer-content')
          .evaluate(async (element) => {
            await Promise.all(
              element
                .getAnimations({ subtree: true })
                .map((animation) => animation.finished.catch(() => undefined)),
            )
          })
        await page.getByTestId('mobile-drawer-content').screenshot({
          path: `${directory}/drawer-open.png`,
        })
        await page.keyboard.press('Escape')
      }
      await page.close()
    }
  }
} finally {
  await browser.close()
}
