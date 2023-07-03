import { AquariumMysqlRepositories } from './aquarium-mysql-repositories'
import { type IFindAquariumsRepository } from '@application/ports/repositories'

const aquariumMysqlRepositories = new AquariumMysqlRepositories()

export const findAquariumsMysqlRepository: IFindAquariumsRepository = aquariumMysqlRepositories
