import { Link } from '@/i18n/navigation'
import { Container } from './Container'
import { LanguageSwitcher } from './LanguageSwitcher'
import styles from './Footer.module.css'

export type FooterLink = {
  label: string
  href: string
}

type FooterProps = {
  locale: 'en' | 'ar'
  brandName: string
  mission: string
  navigationHeading: string
  servicesHeading: string
  contactHeading: string
  navigationLinks: FooterLink[]
  serviceLinks: FooterLink[]
  contactLinks: FooterLink[]
  languageGroupLabel: string
  englishLabel: string
  arabicLabel: string
  fallbackNotice: string
  copyright: string
  privacyLabel: string
  privacyHref: string
}

function LinkColumn({
  heading,
  links,
}: {
  heading: string
  links: FooterLink[]
}) {
  return (
    <nav aria-label={heading} className={styles.column}>
      <h2 className={styles.heading}>{heading}</h2>
      {links.map((link) => (
        <Link className={styles.link} href={link.href as '/'} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function Footer(props: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.brandName}>{props.brandName}</p>
            <p className={styles.mission}>{props.mission}</p>
            <LanguageSwitcher
              arabicLabel={props.arabicLabel}
              englishLabel={props.englishLabel}
              fallbackNotice={props.fallbackNotice}
              groupLabel={props.languageGroupLabel}
              locale={props.locale}
            />
          </div>
          <LinkColumn
            heading={props.navigationHeading}
            links={props.navigationLinks}
          />
          <LinkColumn
            heading={props.servicesHeading}
            links={props.serviceLinks}
          />
          <nav aria-label={props.contactHeading} className={styles.column}>
            <h2 className={styles.heading}>{props.contactHeading}</h2>
            {props.contactLinks.map((link) => (
              <Link
                className={styles.link}
                href={link.href as '/'}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
            <Link className={styles.link} href={props.privacyHref as '/'}>
              {props.privacyLabel}
            </Link>
          </nav>
        </div>
        <p className={styles.copyright}>{props.copyright}</p>
      </Container>
    </footer>
  )
}
