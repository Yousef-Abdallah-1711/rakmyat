import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'

export default async function LocaleNotFound() {
  const t = await getTranslations('NotFound')

  return (
    <main className="not-found section-shell">
      <Container>
        <p className="type-eyebrow">404</p>
        <h1 className="type-display-lg">{t('title')}</h1>
        <p className="type-body">{t('description')}</p>
        <div className="not-found__links">
          <Link className="not-found__link focus-ring" href="/">
            {t('home')}
          </Link>
          <Link className="not-found__link focus-ring" href="/contact">
            {t('contact')}
          </Link>
        </div>
      </Container>
    </main>
  )
}
