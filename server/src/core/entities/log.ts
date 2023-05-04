import { type Device } from './device'

export interface Log {
  id: string
  deviceId: Device['id']
  data: string
  timestamp: Date

  device?: Device
}
