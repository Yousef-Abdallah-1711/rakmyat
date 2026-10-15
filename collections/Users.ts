import type { CollectionConfig, PayloadRequest } from 'payload'

const isAuthenticated = ({ req }: { req: PayloadRequest }) => Boolean(req.user)

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    admin: isAuthenticated,
    create: isAuthenticated,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
    unlock: isAuthenticated,
  },
  fields: [],
}
