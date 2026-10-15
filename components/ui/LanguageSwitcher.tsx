'use client'

import { useEffect, useState } from 'react'
import { getPathname, usePathname } from '@/i18n/navigation'
import type { Locale } from '@/lib/i18n/locale-switch'
import { resolveLocaleSwitchPath } from '@/lib/i18n/locale-switch'

type LanguageSwitcherProps = {
  locale: Locale
  groupLabel: string
  englishLabel: string
  arabicLabel: string
  fallbackNotice: string
}

const FALLBACK_NOTICE_KEY = 'rakmyat-locale-switch-fallback'

export function LanguageSwitcher({
  locale,
  groupLabel,
  englishLabel,
  arabicLabel,
  fallbackNotice,
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (window.sessionStorage.getItem(FALLBACK_NOTICE_KEY) === '1') {
        setShowNotice(true)
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  const result = resolveLocaleSwitchPath(pathname)
  const englishHref = getPathname({
    href: result.pathname as '/',
    locale: 'en',
  })
  const arabicHref = getPathname({
    href: result.pathname as '/',
    locale: 'ar',
  })

  function prepareSwitch() {
    if (result.usedFallback) {
      window.sessionStorage.setItem(FALLBACK_NOTICE_KEY, '1')
    } else {
      window.sessionStorage.removeItem(FALLBACK_NOTICE_KEY)
    }
  }

  return (
    <div className="language-switcher">
      <div
        aria-label={groupLabel}
        className="language-switcher__group"
        role="group"
      >
        {locale === 'en' ? (
          <span aria-current="true" className="language-switcher__current">
            {englishLabel}
          </span>
        ) : (
          <a
            className="language-switcher__choice focus-ring"
            href={englishHref}
            onClick={prepareSwitch}
          >
            {englishLabel}
          </a>
        )}
        <span aria-hidden="true" className="language-switcher__separator">
          /
        </span>
        {locale === 'ar' ? (
          <span aria-current="true" className="language-switcher__current">
            {arabicLabel}
          </span>
        ) : (
          <a
            className="language-switcher__choice focus-ring"
            href={arabicHref}
            onClick={prepareSwitch}
          >
            {arabicLabel}
          </a>
        )}
      </div>
      {showNotice ? (
        <p
          aria-live="polite"
          className="language-switcher__notice"
          role="status"
        >
          {fallbackNotice}
        </p>
      ) : null}
    </div>
  )
}
