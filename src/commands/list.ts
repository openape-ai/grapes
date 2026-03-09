import { defineCommand } from 'citty'
import consola from 'consola'
import { apiFetch } from '../http'

interface Grant {
  id: string
  type: string
  status: string
  requester: string
  owner: string
  request: {
    command?: string[]
    grant_type?: string
    reason?: string
  }
  created_at?: string
}

export const listCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List grants',
  },
  args: {
    status: {
      type: 'string',
      description: 'Filter by status (pending, approved, denied, revoked, used)',
    },
    json: {
      type: 'boolean',
      description: 'Output as JSON',
      default: false,
    },
  },
  async run({ args }) {
    const query = args.status ? `?status=${args.status}` : ''
    const grants = await apiFetch<Grant[]>(`/api/grants${query}`)

    if (args.json) {
      console.log(JSON.stringify(grants, null, 2))
      return
    }

    if (grants.length === 0) {
      consola.info('No grants found.')
      return
    }

    for (const grant of grants) {
      const cmd = grant.request?.command?.join(' ') || '(no command)'
      const type = grant.request?.grant_type || grant.type
      console.log(`${grant.id}  ${grant.status.padEnd(8)}  ${type.padEnd(6)}  ${cmd}`)
      if (grant.request?.reason) {
        console.log(`  Reason: ${grant.request.reason}`)
      }
    }
  },
})
