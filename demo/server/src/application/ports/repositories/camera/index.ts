import { type ICreateCameraRepository } from './create-camera-repository'
import { type IFindCamerasRepository } from './find-cameras-repository'

export * from './create-camera-repository'
export * from './find-cameras-repository'

export interface ICameraRepositories extends ICreateCameraRepository, IFindCamerasRepository {}
