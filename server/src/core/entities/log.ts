import { type Controller } from './controller'

export enum LogType {
  Camera = 'camera',
  Oximeter = 'oximeter',
  PhSensor = 'ph-sensor',
  TemperatureSensor = 'temperature-sensor'
}

export interface Log {
  id: string
  controllerId: Controller['id']
  type: LogType
  data?: object
  reading?: object
  timestamp: Date

  controller?: Controller
}
