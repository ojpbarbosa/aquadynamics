import { type ICreateLogRepository } from './create-log-repository'
import { type IFindLogsRepository } from './find-logs-repository'

export * from './create-log-repository'
export * from './find-logs-repository'

export interface ILogRepositories extends ICreateLogRepository, IFindLogsRepository {}
