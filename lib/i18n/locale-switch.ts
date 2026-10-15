export type Locale = 'en' | 'ar'

export const localizedPrototypeRoutes = ['/', '/phase-02'] as const

export function resolveLocaleSwitchPath(
  pathname: string,
  availableRoutes: readonly string[] = localizedPrototypeRoutes,
) {
  const normalized = pathname.replace(/\/$/, '') || '/'
  const exists = availableRoutes.includes(normalized)

  return {
    pathname: exists ? normalized : '/',
    usedFallback: !exists,
  }
}
