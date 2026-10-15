import { describe, expect, it } from 'vitest'
import { negotiateLocale } from '../lib/i18n/negotiate-locale'

describe('negotiateLocale', () => {
  it('honors a saved locale over the request language', () => {
    expect(negotiateLocale('ar', 'en-US,en;q=0.9')).toBe('ar')
  })

  it('selects Arabic for Arabic language preferences', () => {
    expect(negotiateLocale(undefined, 'ar-EG,ar;q=0.9,en;q=0.8')).toBe('ar')
  })

  it('follows language quality and header order for supported locales', () => {
    expect(negotiateLocale(undefined, 'en;q=1,ar;q=0.5')).toBe('en')
    expect(negotiateLocale(undefined, 'fr;q=1,ar;q=0.5')).toBe('ar')
  })

  it('ignores explicitly unacceptable language ranges', () => {
    expect(negotiateLocale(undefined, 'ar;q=0,en;q=0.8')).toBe('en')
  })

  it('ignores invalid quality weights outside the zero-to-one range', () => {
    expect(negotiateLocale(undefined, 'ar;q=1.5,en;q=0.5')).toBe('en')
  })

  it('falls back to English for other or missing language preferences', () => {
    expect(negotiateLocale(undefined, 'fr-FR,fr;q=0.9')).toBe('en')
    expect(negotiateLocale(undefined, undefined)).toBe('en')
  })
})
