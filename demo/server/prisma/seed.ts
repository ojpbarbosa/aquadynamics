import { PrismaClient } from '@prisma/client'
import { nanoIdUniqueIdProvider } from '@infrastructure/providers/security'

const prisma = new PrismaClient()

async function main() {
  await prisma.aquarium.deleteMany()

  for (let i = 1; i <= 2; i++) {
    const aquarium = await prisma.aquarium.create({
      data: {
        id: nanoIdUniqueIdProvider.generate(),
        name: `Aquarium ${i}`
      }
    })

    const controller = await prisma.controller.create({
      data: {
        id: nanoIdUniqueIdProvider.generate(),
        aquariumId: aquarium.id,
        status: 'unknown'
      }
    })

    console.log(aquarium, controller)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
  })
