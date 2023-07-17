import { CameraMysqlRepositories } from './camera-mysql-repositories'
import {
  type ICreateCameraRepository,
  type IFindCamerasRepository
} from '@application/ports/repositories'

const cameraMysqlRepositories = new CameraMysqlRepositories()

export const createCameraMysqlRepository: ICreateCameraRepository = cameraMysqlRepositories
export const findCamerasMysqlRepository: IFindCamerasRepository = cameraMysqlRepositories
