import { DeviceSQLiteRepositories } from './device-sqlite-repositories'
import {
  type ICreateDeviceRepository,
  type IFindDevicesRepository,
  type IUpdateDeviceRepository
} from '@application/ports/repositories'

const deviceSQLiteRepositories = new DeviceSQLiteRepositories()

const createDeviceSQLiteRepository: ICreateDeviceRepository = deviceSQLiteRepositories
const findDevicesSQLiteRepository: IFindDevicesRepository = deviceSQLiteRepositories
const updateDeviceRepository: IUpdateDeviceRepository = deviceSQLiteRepositories

export { createDeviceSQLiteRepository, findDevicesSQLiteRepository, updateDeviceRepository }
