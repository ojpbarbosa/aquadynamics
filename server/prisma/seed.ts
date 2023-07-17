import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function main() {
  await prisma.aquarium.deleteMany()
  await prisma.camera.deleteMany()
  await prisma.controller.deleteMany()
  await prisma.log.deleteMany()

  for (let i = 0; i < 5; i++) {
    const aquarium = await prisma.aquarium.create({
      data: {
        id: nanoid(),
        name: `Aquário ${i + 1}`,
        registeredAt: new Date()
      }
    })

    console.log(aquarium)
  }

  console.log(
    await prisma.aquarium.create({
      data: {
        id: nanoid(),
        name: `Aquário Teste`,
        registeredAt: new Date()
      }
    })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
  })
