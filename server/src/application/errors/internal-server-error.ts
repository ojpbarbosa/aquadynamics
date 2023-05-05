import { DefaultError } from './default-error'

export class InternalServerError extends DefaultError {
  constructor(message: string) {
    super(500, 'Internal server error', message)
  }
}
