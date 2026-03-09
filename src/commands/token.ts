import { defineCommand } from 'citty'
import consola from 'consola'
import { apiFetch } from '../http'

export const tokenCommand = defineCommand({
  meta: {
    name: 'token',
    description: 'Get grant token JWT',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Grant ID',
      required: true,
    },
  },
  async run({ args }) {
    const result = await apiFetch<{ token: string }>(`/api/grants/${args.id}/token`, {
      method: 'POST',
    })

    if (!result.token) {
      consola.error('No token received. Grant may not be approved.')
      return process.exit(1)
    }

    // Output raw token to stdout (pipeable)
    process.stdout.write(result.token)
  },
})
