import { LogMysqlRepositories } from './log-mysql-repositories'
import {
  type ICreateLogRepository,
  type IFindLogsRepository
} from '@application/ports/repositories'

const logMysqlRepositories = new LogMysqlRepositories()

export const createLogMysqlRepository: ICreateLogRepository = logMysqlRepositories
export const findLogsMysqlRepository: IFindLogsRepository = logMysqlRepositories
