import { LogSQLiteRepositories } from './Log-sqlite-repositories'
import {
  type ICreateLogRepository,
  type IFindLogsRepository
} from '@application/ports/repositories'

const logSQLiteRepositories = new LogSQLiteRepositories()

const createLogSQLiteRepository: ICreateLogRepository = logSQLiteRepositories
const findLogsSQLiteRepository: IFindLogsRepository = logSQLiteRepositories

export { createLogSQLiteRepository, findLogsSQLiteRepository }
