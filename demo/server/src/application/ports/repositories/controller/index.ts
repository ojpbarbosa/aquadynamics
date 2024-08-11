import { type ICreateControllerRepository } from './create-controller-repository'
import { type IFindControllersRepository } from './find-controllers-repository'
import { type IUpdateControllerRepository } from './update-controller-repository'

export * from './create-controller-repository'
export * from './find-controllers-repository'
export * from './update-controller-repository'

export interface IControllerRepositories
  extends ICreateControllerRepository,
    IFindControllersRepository,
    IUpdateControllerRepository {}
