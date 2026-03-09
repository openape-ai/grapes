import { getAuthToken, getIdpUrl } from './config'

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  options: {
    method?: string
    body?: unknown
    idp?: string
    token?: string
  } = {},
): Promise<T> {
  const idp = options.idp || getIdpUrl()
  if (!idp) {
    throw new Error('No IdP URL configured. Run `grapes login` first or pass --idp.')
  }

  const token = options.token || getAuthToken()
  if (!token) {
    throw new Error('Not authenticated. Run `grapes login` first.')
  }

  const url = `${idp}${path}`
  const headers: Record<string, string> = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new ApiError(response.status, `${response.status} ${response.statusText}: ${text}`)
  }

  return response.json() as Promise<T>
}
