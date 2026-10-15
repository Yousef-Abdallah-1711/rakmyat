import { Link } from '@/i18n/navigation'
import { Container } from './Container'
import { IconButton } from './IconButton'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileDrawer, type DrawerItem } from './MobileDrawer'
import { PrimaryButton } from './PrimaryButton'
import { HeaderScrollShell } from './HeaderScrollShell'
import styles from './Header.module.css'

export type HeaderNavItem = DrawerItem

export type HeaderProps = {
  locale: 'en' | 'ar'
  logoLabel: string
  navLabel: string
  menuLabel: string
  closeLabel: string
  languageGroupLabel: string
  englishLabel: string
  arabicLabel: string
  fallbackNotice: string
  primaryLabel: string
  primaryHref: string
  navigation: HeaderNavItem[]
}

function MenuGlyph() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
    >
      <path
        d="M3 5.5h14M3 10h14M3 14.5h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

export function Header(props: HeaderProps) {
  const switcher = (
    <LanguageSwitcher
      arabicLabel={props.arabicLabel}
      englishLabel={props.englishLabel}
      fallbackNotice={props.fallbackNotice}
      groupLabel={props.languageGroupLabel}
      locale={props.locale}
    />
  )

  return (
    <HeaderScrollShell className={styles.header}>
      <Container className={styles.inner}>
        <Link aria-label={props.logoLabel} className={styles.logo} href="/">
          {props.locale === 'ar' ? 'رقميات' : 'Rakmyat'}
        </Link>
        <nav aria-label={props.navLabel} className={styles.desktopNav}>
          {props.navigation.map((item) => (
            <Link
              className={styles.navLink}
              href={item.href as '/'}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.utility}>
          {switcher}
          <PrimaryButton
            href={props.primaryHref}
            locale={props.locale}
            size="sm"
          >
            {props.primaryLabel}
          </PrimaryButton>
        </div>
        <div className={styles.mobileControls}>
          {switcher}
          <MobileDrawer
            closeLabel={props.closeLabel}
            items={props.navigation}
            languageSwitcher={switcher}
            locale={props.locale}
            menuLabel={props.menuLabel}
            primaryHref={props.primaryHref}
            primaryLabel={props.primaryLabel}
            title={props.navLabel}
            trigger={
              <IconButton label={props.menuLabel}>
                <MenuGlyph />
              </IconButton>
            }
          />
        </div>
      </Container>
    </HeaderScrollShell>
  )
}
