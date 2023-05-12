import { type Controller } from './controller'

export enum LogType {
  Camera = 'camera',
  Oxygen = 'dissolved-oxygen-analyzer-reading',
  Ph = 'ph-sensor-reading',
  Temperature = 'temperature-sensor-reading'
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
