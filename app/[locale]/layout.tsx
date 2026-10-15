import type { Metadata } from 'next'
import ReactDOM from 'react-dom'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Rakmyat — Foundation',
  description: 'Rakmyat application foundation.',
}

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const htmlLocale = locale === 'ar' ? 'ar-EG' : 'en'
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  if (locale === 'en') {
    ReactDOM.preload('/fonts/space-grotesk-latin.woff2', {
      as: 'font',
      crossOrigin: 'anonymous',
      type: 'font/woff2',
    })
    ReactDOM.preload('/fonts/inter-latin.woff2', {
      as: 'font',
      crossOrigin: 'anonymous',
      type: 'font/woff2',
    })
  }

  return (
    <html lang={htmlLocale} dir={direction}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
