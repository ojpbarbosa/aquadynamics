import { type Controller } from '@core/entities'

export interface IRequest {
  parameters?: any
  query?: any
  headers?: any
  body?: any
  controller?: Controller
}
