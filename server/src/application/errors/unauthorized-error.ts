import { DefaultError } from './default-error'

export class UnauthorizedError extends DefaultError {
  constructor(message: string) {
    super(401, 'Unauthorized', message)
  }
}
