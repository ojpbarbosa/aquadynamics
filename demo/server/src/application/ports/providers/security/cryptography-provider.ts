export interface ICryptographyProvider {
  encrypt: (plaintext: string, secret: string) => string
  decrypt: (ciphertext: string, secret: string) => string
}
