import { Aquarium, ControllerStatus, Log } from './types'

export const CORE_URL = 'aquadynamics-core-demo.onrender.com'
const API_URL = 'https://' + CORE_URL + '/api'

type GetEntityParameters = {
  orderBy?: string
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  include?: { [field: string]: boolean }
  where?: { [field: string]: string | number }
}

function convertParametersToQueryString(parameters: GetEntityParameters): string {
  let queryString = '?'

  if (parameters.orderBy) queryString += `orderBy=${encodeURIComponent(parameters.orderBy)}&`

  if (parameters.order) queryString += `order=${encodeURIComponent(parameters.order)}&`

  if (parameters.page) queryString += `page=${encodeURIComponent(parameters.page.toString())}&`

  if (parameters.perPage)
    queryString += `perPage=${encodeURIComponent(parameters.perPage.toString())}&`

  if (parameters.include) {
    const includeFields = Object.keys(parameters.include)
    for (const field of includeFields) {
      const value = parameters.include[field]
      queryString += `${field}=${value}&`
    }
  }

  if (parameters.where) {
    const whereFields = Object.keys(parameters.where)
    for (const field of whereFields) {
      const value = parameters.where[field]
      queryString += `${field}=${encodeURIComponent(value.toString())}&`
    }
  }

  // remove trailing '&' character if queryString is not empty
  return queryString !== '?' ? queryString.slice(0, -1) : ''
}

export async function getAquariums(
  parameters: GetEntityParameters = {}
): Promise<Aquarium[] | undefined> {
  const queryString = convertParametersToQueryString(parameters)
  const url = `${API_URL}/aquariums${queryString}`

  const response = await fetch(url, {
    cache: 'no-cache'
  })

  if (!response.ok) return undefined

  const data = await response.json()

  if (Object.keys(data).length === 0) return undefined

  return data
}

export async function getAquarium(
  id: string,
  parameters: GetEntityParameters = {}
): Promise<Aquarium | undefined> {
  const queryString = convertParametersToQueryString(parameters)
  const url = `${API_URL}/aquariums/${id}` + queryString

  const response = await fetch(url, { cache: 'no-cache' })

  if (!response.ok) return undefined

  const data = await response.json()

  if (Object.keys(data).length === 0) return undefined

  return data
}

export async function getLogs(parameters: GetEntityParameters = {}): Promise<Log[] | undefined> {
  const queryString = convertParametersToQueryString(parameters)
  const url = `${API_URL}/logs${queryString}`

  const response = await fetch(url, {
    cache: 'no-cache'
  })

  if (!response.ok) return undefined

  const data = await response.json()

  if (Object.keys(data).length === 0) return []

  return data
}

export async function setControllerStatus(controllerId: string, status: ControllerStatus) {
  const url = `${API_URL}/controllers/${controllerId}`

  const response = await fetch(url, {
    body: JSON.stringify({ status }),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function logData(
  temperature: number,
  ph: number,
  lightning: boolean,
  aquariumId: string,
  controllerId: string
) {
  const url = `${API_URL}/logs`

  const response = await fetch(url, {
    body: JSON.stringify({ temperature, ph, lightning, aquariumId, controllerId }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
