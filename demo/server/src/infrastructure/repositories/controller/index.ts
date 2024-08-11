import { ControllerRepositories } from './controller-repositories'
import {
  type ICreateControllerRepository,
  type IFindControllersRepository,
  type IUpdateControllerRepository
} from '@application/ports/repositories'

const controllerRepositories = new ControllerRepositories()

export const createControllerRepository: ICreateControllerRepository = controllerRepositories
export const findControllersRepository: IFindControllersRepository = controllerRepositories
export const updateControllerRepository: IUpdateControllerRepository = controllerRepositories
