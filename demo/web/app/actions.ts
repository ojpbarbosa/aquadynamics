import { getAquariums, getLogs, setControllerStatus, logData } from '@/library/api'
import { Aquarium, Log } from '@/library/types'

export async function log() {
  const aquariums = (await getAquariums({
    include: { controllers: true }
  })) as Aquarium[]

  try {
    const logs = (await getLogs({ order: 'desc', orderBy: 'timestamp' })) as Log[]

    aquariums.forEach(async ({ id, controller }) => {
      if (logs.length > 0) {
        if (new Date().getTime() - new Date(logs[0].timestamp).getTime() < 1 * 20 * 1000) {
          return
        }
      }

      await Promise.resolve(() => setTimeout(() => {}, 5 * 1000))

      await setControllerStatus(controller!.id, 'logging')

      const lastFiveLogs = logs!.slice(0, 5)

      const { lightning, ph, temperature } = generateNextValue(lastFiveLogs)

      await logData(temperature, ph, lightning, id, controller!.id)

      await Promise.resolve(() => setTimeout(() => {}, 5 * 1000))

      await setControllerStatus(controller!.id, 'idling')

      await Promise.resolve(() => setTimeout(() => {}, 5 * 1000))
    })
  } catch {
    aquariums.forEach(async ({ controller }) => {
      await setControllerStatus(controller!.id, 'crashed')

      await Promise.resolve(() => setTimeout(() => {}, 30 * 1000))

      await setControllerStatus(controller!.id, 'restarting')
    })
  }
}

function generateNextValue(lastFiveLogs?: Log[]): {
  temperature: number
  ph: number
  lightning: boolean
} {
  const BASE_TEMPERATURE = 25
  const BASE_PH = 6.9

  const MIN_TEMPERATURE = 22
  const MAX_TEMPERATURE = 29
  const MIN_PH = 6.5
  const MAX_PH = 7.5

  let nextTemperature = BASE_TEMPERATURE
  let nextPh = BASE_PH

  const currentDate = new Date()
  const brtOffset = -3 // BRT is UTC-3
  const currentHour = new Date(currentDate.getTime() + brtOffset * 60 * 60 * 1000).getUTCHours()

  const isNightTime = currentHour >= 18 || currentHour < 6
  const isLightning = currentHour >= 8 && currentHour < 17

  if (lastFiveLogs && lastFiveLogs.length === 5) {
    const avgTemperature =
      lastFiveLogs.reduce((sum, log) => sum + log.temperature, 0) / lastFiveLogs.length
    const avgPh = lastFiveLogs.reduce((sum, log) => sum + log.ph, 0) / lastFiveLogs.length

    const dayTemperatureVariation = (Math.random() - 0.5) * 0.3
    const nightTemperatureVariation = (Math.random() - 0.5) * 0.3
    const phVariation = (Math.random() - 0.5) * 0.1

    nextTemperature =
      avgTemperature + (isNightTime ? nightTemperatureVariation : dayTemperatureVariation)
    nextPh = avgPh + phVariation

    if (nextTemperature > BASE_TEMPERATURE) {
      nextTemperature -= Math.random() * 0.1
    } else if (nextTemperature < BASE_TEMPERATURE) {
      nextTemperature += Math.random() * 0.1
    }

    if (nextPh > BASE_PH) {
      nextPh -= Math.random() * 0.05
    } else if (nextPh < BASE_PH) {
      nextPh += Math.random() * 0.05
    }

    nextTemperature = Math.max(MIN_TEMPERATURE, Math.min(nextTemperature, MAX_TEMPERATURE))
    nextPh = Math.max(MIN_PH, Math.min(nextPh, MAX_PH))

    if (isNightTime) {
      const minimumNightTemperature = avgTemperature - 0.5
      nextTemperature = Math.max(nextTemperature, minimumNightTemperature)
    }
  }

  return {
    temperature: nextTemperature,
    ph: nextPh,
    lightning: isLightning
  }
}
