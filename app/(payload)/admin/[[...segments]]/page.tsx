import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config, params, searchParams })

export default async function Page({ params, searchParams }: Args) {
  const { segments = [] } = await params

  if (segments.length === 0) {
    const payload = await getPayload({ config })
    const { totalDocs } = await payload.count({ collection: 'users' })

    if (totalDocs === 0) redirect('/admin/create-first-user')
  }

  return RootPage({ config, params, searchParams, importMap })
}
