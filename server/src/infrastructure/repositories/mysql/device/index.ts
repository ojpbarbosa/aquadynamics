import { DeviceMysqlRepositories } from './device-mysql-repositories'
import {
  type ICreateDeviceRepository,
  type IFindDevicesRepository,
  type IUpdateDeviceRepository
} from '@application/ports/repositories'

const deviceMysqlRepositories = new DeviceMysqlRepositories()

export const createDeviceMysqlRepository: ICreateDeviceRepository = deviceMysqlRepositories
export const findDevicesMysqlRepository: IFindDevicesRepository = deviceMysqlRepositories
export const updateDeviceMysqlRepository: IUpdateDeviceRepository = deviceMysqlRepositories
