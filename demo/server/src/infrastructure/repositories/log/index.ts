import { LogRepositories } from './log-repositories'
import {
  type ICreateLogRepository,
  type IFindLogsRepository
} from '@application/ports/repositories'

const logRepositories = new LogRepositories()

export const createLogRepository: ICreateLogRepository = logRepositories
export const findLogsRepository: IFindLogsRepository = logRepositories
