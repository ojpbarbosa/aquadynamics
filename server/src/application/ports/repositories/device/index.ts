import { type ICreateDeviceRepository } from './create-device-repository'
import { type IFindDevicesRepository } from './find-devices-repository'
import { type IUpdateDeviceRepository } from './update-device-repository'

export * from './create-device-repository'
export * from './find-devices-repository'
export * from './update-device-repository'

export interface IDeviceRepositories
  extends ICreateDeviceRepository,
    IFindDevicesRepository,
    IUpdateDeviceRepository {}
