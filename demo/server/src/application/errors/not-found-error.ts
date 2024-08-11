import { DefaultError } from './default-error'

export class NotFoundError extends DefaultError {
  constructor(message: string) {
    super(404, 'Not found', message)
  }
}
