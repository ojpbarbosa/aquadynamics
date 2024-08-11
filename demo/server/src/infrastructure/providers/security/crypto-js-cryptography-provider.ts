import { type ICryptographyProvider } from '@application/ports/providers'
import { AES, enc as encoder } from 'crypto-js'

export class CryptoJsCryptographyProvider implements ICryptographyProvider {
  encrypt(plaintext: string, secret: string): string {
    return AES.encrypt(plaintext, secret).toString()
  }

  decrypt(ciphertext: string, secret: string): string {
    return AES.decrypt(ciphertext, secret).toString(encoder.Utf8)
  }
}
