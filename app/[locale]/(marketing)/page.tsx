import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

type HomePageProps = Readonly<{
  params: Promise<{ locale: string }>
}>

export default async function FoundationPage({ params }: HomePageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const t = await getTranslations('Foundation')

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
      <section aria-labelledby="foundation-title">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-slate-600">
          Rakmyat
        </p>
        <h1
          id="foundation-title"
          className="text-4xl font-semibold tracking-tight"
        >
          {t('title')}
        </h1>
        <p className="mt-4 max-w-prose text-lg text-slate-700">
          {t('description')}
        </p>
      </section>
    </main>
  )
}
