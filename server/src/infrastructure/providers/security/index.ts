import { CryptoJsCryptographyProvider } from './crypto-js-cryptography-provider'
import { NanoIdUniqueIdProvider } from './nanoid-unique-id-provider'
import { UuidUniqueIdProvider } from './uuid-unique-id-provider'

export * from './crypto-js-cryptography-provider'
export * from './nanoid-unique-id-provider'
export * from './uuid-unique-id-provider'

export const cryptoJsCryptographyProvider = new CryptoJsCryptographyProvider()
export const nanoIdUniqueIdProvider = new NanoIdUniqueIdProvider()
export const uuidUniqueIdProvider = new UuidUniqueIdProvider()
