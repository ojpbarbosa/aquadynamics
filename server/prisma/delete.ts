import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.log.deleteMany()
  await prisma.controller.delete({
    where: {
      id: 'Yh_8CMO_UcSr7QzaK021c'
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
  })
