import { defineCommand } from 'citty'
import consola from 'consola'
import { apiFetch } from '../http'

export const approveCommand = defineCommand({
  meta: {
    name: 'approve',
    description: 'Approve a grant request',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Grant ID',
      required: true,
    },
  },
  async run({ args }) {
    await apiFetch(`/api/grants/${args.id}/approve`, {
      method: 'POST',
    })
    consola.success(`Grant ${args.id} approved.`)
  },
})
