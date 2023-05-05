import { type Device } from '@core/entities'

export interface IRequest {
  parameters?: any

  query?: any

  headers?: any

  body?: any

  device?: Device
}

