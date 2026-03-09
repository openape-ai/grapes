import { defineCommand } from 'citty'
import consola from 'consola'
import { apiFetch } from '../http'

export const denyCommand = defineCommand({
  meta: {
    name: 'deny',
    description: 'Deny a grant request',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Grant ID',
      required: true,
    },
  },
  async run({ args }) {
    await apiFetch(`/api/grants/${args.id}/deny`, {
      method: 'POST',
    })
    consola.success(`Grant ${args.id} denied.`)
  },
})
