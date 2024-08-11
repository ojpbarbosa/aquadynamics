import { DefaultError } from './default-error'

export class ForbiddenError extends DefaultError {
  constructor(message: string) {
    super(403, 'Forbidden', message)
  }
}
