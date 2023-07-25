import { PrismaClient } from '@prisma/client'
import { nanoIdUniqueIdProvider } from '@infrastructure/providers/security'

const prisma = new PrismaClient()

async function main() {
  await prisma.aquarium.deleteMany()

  for (let i = 0; i < 6; i++) {
    const aquarium = await prisma.aquarium.create({
      data: {
        id: nanoIdUniqueIdProvider.generate(),
        name: `Aquário ${i + 1}`,
        registeredAt: new Date()
      }
    })

    console.log(aquarium)
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
