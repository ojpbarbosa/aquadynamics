import { type IUniqueIdProvider } from '@application/ports/providers'
import { nanoid } from 'nanoid'

export class NanoIdUniqueIdProvider implements IUniqueIdProvider {
  generate(): string {
    return nanoid()
  }

  isValid(id: string): boolean {
    return /^[0-9A-Za-z_-]{21}$/.test(id)
  }
}
