import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { Section } from '@/components/ui/Section'
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
    <main>
      <Section>
        <Container>
          <section aria-labelledby="foundation-title">
            <p className="type-eyebrow">Rakmyat</p>
            <h1 className="type-h1" id="foundation-title">
              {t('title')}
            </h1>
            <p className="type-body">{t('description')}</p>
          </section>
        </Container>
      </Section>
      <Section surface="tinted">
        <Container>
          <ScrollReveal label={t('motionTitle')}>
            <h2 className="type-h3">{t('motionTitle')}</h2>
            <p className="type-body">{t('motionDescription')}</p>
          </ScrollReveal>
        </Container>
      </Section>
    </main>
  )
}
