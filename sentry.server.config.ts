import * as Sentry from '@sentry/nextjs'

const dsn = process.env.SENTRY_DSN

if (dsn && !dsn.includes('REPLACE_WITH')) {
  Sentry.init({ dsn })
}
