import { type Aquarium, type Log } from '@core/entities'

export type TGetLogsDTO = {
  orderBy?: 'temperature' | 'pH' | 'lightning' | 'timestamp'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  aquariums?: boolean
  controllers?: boolean

  id?: Log['id']
  aquariumId?: Aquarium['id']
  controllerId?: Log['controllerId']
  temperature?: Log['temperature']
  pH?: Log['pH']
  lightning?: Log['lightning']
}

export interface IGetLogsUseCase {
  get: (data: TGetLogsDTO) => Promise<Log[] | Log>
}
