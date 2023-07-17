import { type IUniqueIdProvider } from '@application/ports/providers'
import { v4 as uuid, validate } from 'uuid'

export class UuidUniqueIdProvider implements IUniqueIdProvider {
  generate(): string {
    return uuid()
  }

  isValid(id: string): boolean {
    return validate(id)
  }
}
