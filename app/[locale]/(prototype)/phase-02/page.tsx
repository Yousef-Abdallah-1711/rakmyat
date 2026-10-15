import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ClassificationBadge } from '@/components/ui/ClassificationBadge'
import { Accordion } from '@/components/ui/Accordion'
import { Checkbox } from '@/components/ui/Checkbox'
import { Container } from '@/components/ui/Container'
import { Footer } from '@/components/ui/Footer'
import { FormField } from '@/components/ui/FormField'
import { Header } from '@/components/ui/Header'
import { Modal } from '@/components/ui/Modal'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { Section } from '@/components/ui/Section'
import { ServiceRow } from '@/components/ui/ServiceRow'
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

        <Section className={styles.reviewSection} surface="tinted">
          <Container>
            <div className={styles.reviewIntro}>
              <p className={styles.fixtureNotice}>{t('notReal')}</p>
              <h2 className="type-h2">{t('reviewTitle')}</h2>
              <p className="type-body">{t('reviewDescription')}</p>
            </div>

            <section
              aria-labelledby="accordion-review-title"
              data-testid="review-accordion"
            >
              <h3 className="type-h3" id="accordion-review-title">
                {t('accordionTitle')}
              </h3>
              <Accordion
                items={[
                  {
                    id: 'responsive-review',
                    title: t('accordionQuestion'),
                    content: <p>{t('accordionAnswer')}</p>,
                  },
                ]}
                label={t('accordionTitle')}
              />
            </section>

            <section
              aria-labelledby="service-review-title"
              data-testid="review-service"
            >
              <h3 className="type-h3" id="service-review-title">
                {t('serviceTitle')}
              </h3>
              <ServiceRow
                href="/phase-02"
                pillarNumber={1}
                summary={t('serviceSummary')}
                title={t('serviceName')}
                className={styles.reviewServiceRow}
                data-testid="review-service-row"
              />
            </section>

            <section aria-labelledby="form-review-title">
              <h3 className="type-h3" id="form-review-title">
                {t('fieldsTitle')}
              </h3>
              <div
                className={styles.formFixtures}
                data-testid="prototype-form-fixtures"
              >
                <FormField
                  hint={t('fieldHint')}
                  label={t('fieldName')}
                  name="fixture-name"
                />
                <FormField
                  error={t('fieldError')}
                  hint={t('fieldHint')}
                  label={t('fieldEmail')}
                  name="fixture-email"
                  type="email"
                />
                <FormField
                  label={t('fieldNumber')}
                  name="fixture-number"
                  type="number"
                />
                <FormField
                  disabled
                  label={t('fieldDisabled')}
                  name="fixture-disabled"
                />
                <FormField
                  label={t('fieldSelect')}
                  name="fixture-type"
                  selectOptions={[
                    { label: t('fieldSelectOption'), value: 'software' },
                  ]}
                  selectPlaceholder={t('fieldSelectPlaceholder')}
                />
                <FormField
                  label={t('fieldMessage')}
                  multiline
                  name="fixture-message"
                />
                <Checkbox label={t('fieldConsent')} name="fixture-consent" />
                <Checkbox
                  disabled
                  label={t('fieldDisabledConsent')}
                  name="fixture-disabled-consent"
                />
              </div>
            </section>
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
