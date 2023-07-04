import { Aquarium } from './types'

const apiUrl = 'https://aquadynamics-core.onrender.com/api'

export async function getAquariums(): Promise<Aquarium[]> {
  const response = await fetch(`${apiUrl}/aquariums?logs=true`)

  if (!response.ok) {
    throw new Error('Algo de errado aconteceu :/')
  }

  const data = await response.json()
  return data
}

export async function getAquarium(id: string): Promise<Aquarium> {
  const response = await fetch(`${apiUrl}/aquariums/${id}`)

  if (!response.ok) {
    throw new Error('Algo de errado aconteceu :/')
  }

  const data = await response.json()
  return data
}
