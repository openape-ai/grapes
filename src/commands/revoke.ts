import { defineCommand } from 'citty'
import consola from 'consola'
import { apiFetch } from '../http'

export const revokeCommand = defineCommand({
  meta: {
    name: 'revoke',
    description: 'Revoke a grant',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Grant ID',
      required: true,
    },
  },
  async run({ args }) {
    await apiFetch(`/api/grants/${args.id}/revoke`, {
      method: 'POST',
    })
    consola.success(`Grant ${args.id} revoked.`)
  },
})
