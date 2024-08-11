import { ControllerStatus } from './types'

const TEMPERATURE_IDEAL_MINIMUM = 20
const TEMPERATURE_IDEAL_MAXIMUM = 30

const PH_IDEAL_MINIMUM = 6.5
const PH_IDEAL_MAXIMUM = 7.5

export function getTemperatureMetadata(temperature: number) {
  return temperature >= TEMPERATURE_IDEAL_MINIMUM && temperature <= TEMPERATURE_IDEAL_MAXIMUM
    ? { color: '#22c55e', term: 'Ideal' }
    : temperature < TEMPERATURE_IDEAL_MINIMUM
    ? { color: '#3b82f6', term: 'Low' }
    : temperature > TEMPERATURE_IDEAL_MAXIMUM
    ? { color: '#ef4444', term: 'High' }
    : { color: '', term: '' }
}

export function getPhMetadata(pH: number) {
  return pH >= PH_IDEAL_MINIMUM && pH <= PH_IDEAL_MAXIMUM
    ? { color: '#22c55e', term: 'Ideal' }
    : pH < PH_IDEAL_MINIMUM
    ? { color: '#f59e0b', term: 'Acidic' }
    : pH > PH_IDEAL_MAXIMUM
    ? { color: '#6366f1', term: 'Alkaline' }
    : { color: '', term: '' }
}

export const controllerStatusesMetadata = {
  unknown: {
    term: 'No info',
    description: 'The server is not connected to the controller',
    color: '#737373'
  },
  booting: {
    term: 'Booting',
    description: 'The controller is initializing the sensors to connect to the server',
    color: '#84cc16'
  },
  idling: {
    term: 'Idle',
    description: 'The controller is not performing any tasks or recording data',
    color: '#3b82f6'
  },
  logging: {
    term: 'Logging',
    description: 'The controller is capturing the parameters to be sent to the server',
    color: '#22c55e'
  },
  restarting: {
    term: 'Restarting',
    description: 'Procedure for restarting the controller and sensors',
    color: '#f59e0b'
  },
  crashed: {
    term: 'Error',
    description: 'There is an issue with the controller; if it persists, contact the administrator',
    color: '#ef4444'
  }
}

export function getControllerStatusMetadata(status: ControllerStatus) {
  return controllerStatusesMetadata[status] || controllerStatusesMetadata.unknown
}
