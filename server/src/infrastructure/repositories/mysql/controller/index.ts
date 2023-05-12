import { ControllerMysqlRepositories } from './controller-mysql-repositories'
import {
  type ICreateControllerRepository,
  type IFindControllersRepository,
  type IUpdateControllerRepository
} from '@application/ports/repositories'

const controllerMysqlRepositories = new ControllerMysqlRepositories()

export const createControllerMysqlRepository: ICreateControllerRepository =
  controllerMysqlRepositories
export const findControllersMysqlRepository: IFindControllersRepository =
  controllerMysqlRepositories
export const updateControllerMysqlRepository: IUpdateControllerRepository =
  controllerMysqlRepositories
