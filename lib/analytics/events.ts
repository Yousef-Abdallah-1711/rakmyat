export const analyticsEvents = {
  heroPrimaryClick: 'hero_cta_primary_click',
  heroSecondaryClick: 'hero_cta_secondary_click',
  navigationCtaClick: 'nav_cta_click',
  servicePageCtaClick: 'service_page_cta_click',
  workCardClick: 'work_card_click',
  contactFormStart: 'contact_form_start',
  contactFormSubmitSuccess: 'contact_form_submit_success',
  contactFormSubmitFailure: 'contact_form_submit_fail',
  languageSwitch: 'language_switch',
  discoveryCallClick: 'discovery_call_click',
} as const

export type AnalyticsEventName =
  (typeof analyticsEvents)[keyof typeof analyticsEvents]

export type AnalyticsEventProperties = {
  hero_cta_primary_click: { locale: 'en' | 'ar' }
  hero_cta_secondary_click: { locale: 'en' | 'ar' }
  nav_cta_click: { locale: 'en' | 'ar'; placement: 'header' | 'drawer' }
  service_page_cta_click: {
    locale: 'en' | 'ar'
    pillar: 'custom-software' | 'enterprise-solutions' | 'ai-agents-automation'
  }
  work_card_click: {
    locale: 'en' | 'ar'
    classification:
      | 'real-client-project'
      | 'internal-product'
      | 'concept-demo'
      | 'confidential-summary'
  }
  contact_form_start: { locale: 'en' | 'ar'; form: 'contact' }
  contact_form_submit_success: { locale: 'en' | 'ar'; form: 'contact' }
  contact_form_submit_fail: {
    locale: 'en' | 'ar'
    form: 'contact'
    reason: 'validation' | 'network' | 'server'
  }
  language_switch: { from: 'en' | 'ar'; to: 'en' | 'ar' }
  discovery_call_click: { locale: 'en' | 'ar'; placement: 'contact' }
}
