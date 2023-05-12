import { type Controller } from './controller'

export interface Log {
  id: string
  controllerId: Controller['id']
  data: string
  timestamp: Date

  controller?: Controller
}
