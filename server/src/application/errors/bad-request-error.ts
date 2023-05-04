import { DefaultError } from './default-error'

export class BadRequestError extends DefaultError {
  constructor(message: string) {
    super(400, 'Bad request', message)
  }
}
