import { Client } from 'pg'

const connectionString = process.env.DATABASE_URI

if (!connectionString) {
  throw new Error('DATABASE_URI is required to check PostgreSQL connectivity.')
}

const client = new Client({ connectionString })

try {
  await client.connect()
  const result = await client.query<{
    current_database: string
    current_user: string
  }>('SELECT current_database(), current_user')
  console.log(
    `PostgreSQL connection verified: ${result.rows[0]?.current_database}`,
  )
} finally {
  await client.end()
}
