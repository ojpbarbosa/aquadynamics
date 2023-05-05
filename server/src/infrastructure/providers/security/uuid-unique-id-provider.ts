import { type IUniqueIdProvider } from '@application/ports/providers'
import { v4 as uuid } from 'uuid'

export class UuidUniqueIdProvider implements IUniqueIdProvider {
  generate(): string {
    return uuid()
  }
}
