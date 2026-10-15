import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs/config'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  reactStrictMode: true,
}

const payloadConfig = withPayload(withNextIntl(nextConfig))

export default withSentryConfig(payloadConfig, {
  silent: true,
})
