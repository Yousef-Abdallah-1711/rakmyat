import { describe, expect, it } from 'vitest'
import { resolveLocaleSwitchPath } from '../lib/i18n/locale-switch'

describe('resolveLocaleSwitchPath', () => {
  it('preserves equivalent home and prototype routes', () => {
    expect(resolveLocaleSwitchPath('/')).toEqual({
      pathname: '/',
      usedFallback: false,
    })
    expect(resolveLocaleSwitchPath('/phase-02')).toEqual({
      pathname: '/phase-02',
      usedFallback: false,
    })
  })

  it('falls back to the localized home when no equivalent page exists', () => {
    expect(resolveLocaleSwitchPath('/work')).toEqual({
      pathname: '/',
      usedFallback: true,
    })
  })
})
