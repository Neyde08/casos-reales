import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const casos = await prisma.case.findMany({
    select: { slug: true, title: true, country: true, year: true },
    orderBy: { title: 'asc' }
  })

  console.log('Casos encontrados:', casos.length)
  casos.forEach(c => {
    console.log(`- ${c.slug} | ${c.title} (${c.country}, ${c.year})`)
  })
}

main().finally(() => prisma.$disconnect())
