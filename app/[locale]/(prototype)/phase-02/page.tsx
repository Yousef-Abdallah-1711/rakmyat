import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ClassificationBadge } from '@/components/ui/ClassificationBadge'
import { Container } from '@/components/ui/Container'
import { Footer } from '@/components/ui/Footer'
import { Header } from '@/components/ui/Header'
import { Modal } from '@/components/ui/Modal'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { Section } from '@/components/ui/Section'
import { routing } from '@/i18n/routing'
import styles from './PrototypePage.module.css'

type PrototypePageProps = Readonly<{
  params: Promise<{ locale: string }>
}>

const prototypeSlots = ['HOME-01', 'HOME-02', 'HOME-03', 'HOME-04'] as const

export default async function Phase02PrototypePage({
  params,
}: PrototypePageProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const localizedLocale = locale as 'en' | 'ar'
  const t = await getTranslations('Prototype')
  const header = await getTranslations('Header')
  const footer = await getTranslations('Footer')
  const navigation = [
    { label: header('links.work'), href: '/work' },
    { label: header('links.services'), href: '/services' },
    { label: header('links.process'), href: '/process' },
    { label: header('links.about'), href: '/about' },
    { label: header('links.contact'), href: '/contact' },
  ]

  return (
    <div className={styles.page}>
      <Header
        arabicLabel={header('arabic')}
        closeLabel={header('close')}
        englishLabel={header('english')}
        fallbackNotice={header('fallbackNotice')}
        languageGroupLabel={header('languageGroup')}
        locale={localizedLocale}
        logoLabel={header('logo')}
        menuLabel={header('menu')}
        navigation={navigation}
        navLabel={header('navigation')}
        primaryHref="/contact"
        primaryLabel={header('primaryCta')}
      />

      <main>
        <Section>
          <Container>
            <div className={styles.intro}>
              <p className={styles.fixtureNotice}>{t('notReal')}</p>
              <h1 className="type-display-lg">{t('title')}</h1>
              <p className="type-body">{t('description')}</p>
            </div>

            <div aria-label={t('reserved')} className={styles.slots}>
              {prototypeSlots.map((slot) => (
                <section
                  aria-labelledby={`${slot}-title`}
                  className={styles.slot}
                  id={slot.toLowerCase()}
                  key={slot}
                >
                  <p className={styles.slotLabel}>{slot}</p>
                  <h2 id={`${slot}-title`}>{t('reserved')}</h2>
                  <p>{t('notReal')}</p>
                </section>
              ))}
            </div>

            <div className={styles.componentProof}>
              <h2 className="type-h3">{t('badgeTitle')}</h2>
              <p className="type-body-sm">{t('badgeHelp')}</p>
              <div className={styles.badges}>
                <ClassificationBadge
                  classification="real-client-project"
                  label={t('classifications.client')}
                  placement="inline"
                />
                <ClassificationBadge
                  classification="internal-product"
                  label={t('classifications.internal')}
                  placement="inline"
                />
                <ClassificationBadge
                  classification="concept-demo"
                  label={t('classifications.concept')}
                  placement="inline"
                />
                <ClassificationBadge
                  classification="confidential-summary"
                  label={t('classifications.confidential')}
                  placement="inline"
                />
              </div>
              <Modal
                closeLabel={t('dialog.close')}
                description={t('dialog.description')}
                title={t('dialog.title')}
                trigger={
                  <SecondaryButton
                    data-testid="modal-preview-trigger"
                    size="sm"
                  >
                    {t('dialog.open')}
                  </SecondaryButton>
                }
              >
                <div className={styles.badges}>
                  <SecondaryButton size="sm">
                    {t('dialog.first')}
                  </SecondaryButton>
                  <SecondaryButton size="sm">
                    {t('dialog.last')}
                  </SecondaryButton>
                </div>
              </Modal>
            </div>

            <ScrollReveal
              className={styles.motionDemo}
              label={t('motionTitle')}
            >
              <h2>{t('motionTitle')}</h2>
              <p>{t('motionDescription')}</p>
            </ScrollReveal>
          </Container>
        </Section>
      </main>

      <Footer
        arabicLabel={header('arabic')}
        brandName={footer('brandName')}
        contactHeading={footer('contact')}
        contactLinks={[]}
        copyright={footer('copyright')}
        englishLabel={header('english')}
        fallbackNotice={header('fallbackNotice')}
        languageGroupLabel={header('languageGroup')}
        locale={localizedLocale}
        mission={footer('mission')}
        navigationHeading={footer('navigation')}
        navigationLinks={navigation.slice(0, 2)}
        privacyHref="/privacy"
        privacyLabel={footer('privacy')}
        serviceLinks={[
          {
            href: '/services/custom-software',
            label: footer('serviceLinks.software'),
          },
          {
            href: '/services/enterprise-solutions',
            label: footer('serviceLinks.enterprise'),
          },
          {
            href: '/services/ai-agents-automation',
            label: footer('serviceLinks.automation'),
          },
        ]}
        servicesHeading={footer('services')}
      />
    </div>
  )
}
