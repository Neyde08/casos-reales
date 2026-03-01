import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const cases = await prisma.case.findMany({
    select: { slug: true, title: true, type: true },
    orderBy: { type: 'asc' }
  })
  console.log('Casos actuales:\n')
  cases.forEach(c => {
    const tipo = c.type.padEnd(15)
    console.log(`${tipo} | ${c.title}`)
  })
  console.log(`\nTotal: ${cases.length} casos`)
}

main()
  .finally(() => prisma.$disconnect())
