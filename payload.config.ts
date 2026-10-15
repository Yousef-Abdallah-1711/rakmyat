import 'server-only'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { Users } from './collections/Users'

const databaseUri = process.env.DATABASE_URI
const payloadSecret = process.env.PAYLOAD_SECRET

if (!databaseUri) {
  throw new Error('DATABASE_URI is required to initialize Payload.')
}

if (!payloadSecret || payloadSecret.length < 32) {
  throw new Error(
    'PAYLOAD_SECRET must be set to a secret of at least 32 characters.',
  )
}

export default buildConfig({
  secret: payloadSecret,
  graphQL: {
    disable: true,
    disableIntrospectionInProduction: true,
    disablePlaygroundInProduction: true,
  },
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [Users],
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),
  typescript: {
    outputFile: 'payload-types.ts',
  },
})
