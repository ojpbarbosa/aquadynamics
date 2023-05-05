import { LogSqliteRepositories } from './Log-sqlite-repositories'
import {
  type ICreateLogRepository,
  type IFindLogsRepository
} from '@application/ports/repositories'

const logSqliteRepositories = new LogSqliteRepositories()

export const createLogSqliteRepository: ICreateLogRepository = logSqliteRepositories
export const findLogsSqliteRepository: IFindLogsRepository = logSqliteRepositories
