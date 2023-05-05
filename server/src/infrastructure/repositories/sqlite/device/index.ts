import { DeviceSqliteRepositories } from './device-sqlite-repositories'
import {
  type ICreateDeviceRepository,
  type IFindDevicesRepository,
  type IUpdateDeviceRepository
} from '@application/ports/repositories'

const deviceSqliteRepositories = new DeviceSqliteRepositories()

export const createDeviceSqliteRepository: ICreateDeviceRepository = deviceSqliteRepositories
export const findDevicesSqliteRepository: IFindDevicesRepository = deviceSqliteRepositories
export const updateDeviceSqliteRepository: IUpdateDeviceRepository = deviceSqliteRepositories
