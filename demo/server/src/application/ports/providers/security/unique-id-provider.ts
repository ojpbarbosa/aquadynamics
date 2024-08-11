export interface IUniqueIdProvider {
  generate: () => string
  isValid: (id: string) => boolean
}
