import { ControllerSqliteRepositories } from './controller-sqlite-repositories'
import {
  type ICreateControllerRepository,
  type IFindControllersRepository,
  type IUpdateControllerRepository
} from '@application/ports/repositories'

const controllerSqliteRepositories = new ControllerSqliteRepositories()

export const createControllerSqliteRepository: ICreateControllerRepository =
  controllerSqliteRepositories
export const findControllersSqliteRepository: IFindControllersRepository =
  controllerSqliteRepositories
export const updateControllerSqliteRepository: IUpdateControllerRepository =
  controllerSqliteRepositories
