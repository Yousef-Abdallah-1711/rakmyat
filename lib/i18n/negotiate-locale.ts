export type PublicLocale = 'en' | 'ar'

export function negotiateLocale(
  savedLocale: string | undefined,
  acceptLanguage: string | undefined,
): PublicLocale {
  if (savedLocale === 'en' || savedLocale === 'ar') {
    return savedLocale
  }

  const preferences = (acceptLanguage ?? '')
    .split(',')
    .map((preference, index) => {
      const [languageRange, ...parameters] = preference
        .trim()
        .toLowerCase()
        .split(';')
      const qualityParameter = parameters.find((parameter) =>
        parameter.trim().startsWith('q='),
      )
      const quality = qualityParameter
        ? Number(qualityParameter.trim().slice(2))
        : 1

      return {
        languageRange,
        quality: quality >= 0 && quality <= 1 ? quality : 0,
        index,
      }
    })
    .filter(
      ({ languageRange, quality }) =>
        Boolean(languageRange) && Number.isFinite(quality) && quality > 0,
    )
    .sort((a, b) => b.quality - a.quality || a.index - b.index)

  for (const { languageRange } of preferences) {
    if (languageRange === 'ar' || languageRange?.startsWith('ar-')) {
      return 'ar'
    }

    if (languageRange === 'en' || languageRange?.startsWith('en-')) {
      return 'en'
    }
  }

  return 'en'
}
