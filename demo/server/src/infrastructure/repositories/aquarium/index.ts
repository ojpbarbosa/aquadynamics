import { AquariumRepositories } from './aquarium-repositories'
import { type IFindAquariumsRepository } from '@application/ports/repositories'

const aquariumRepositories = new AquariumRepositories()

export const findAquariumsRepository: IFindAquariumsRepository = aquariumRepositories
