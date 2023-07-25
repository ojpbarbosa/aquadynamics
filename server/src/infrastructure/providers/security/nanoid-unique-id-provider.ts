import { type IUniqueIdProvider } from '@application/ports/providers'
import { customRandom, random } from 'nanoid'

export class NanoIdUniqueIdProvider implements IUniqueIdProvider {
  private nanoId: () => string

  constructor() {
    // generating 300 ids/hour would take 3.1 * 10^24 (quadrillion)
    // ids for a collision to happen using this cleaner custom alphabet
    this.nanoId = customRandom('1234567890abcdefghijklmnopqrstuvwxyz', 21, random)
  }

  generate(): string {
    return this.nanoId()
  }

  isValid(id: string): boolean {
    return /^[0-9a-z]{21}$/.test(id)
  }
}
