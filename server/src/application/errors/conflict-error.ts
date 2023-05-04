import { DefaultError } from './default-error'

export class ConflictError extends DefaultError {
  constructor(message: string) {
    super(409, 'Conflict', message)
  }
}
