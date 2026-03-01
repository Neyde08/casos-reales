import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const cases = await prisma.case.findMany({
    select: { id: true, slug: true, title: true },
    orderBy: { title: 'asc' }
  })

  const impacts = await prisma.caseImpact.findMany({
    select: { caseId: true }
  })

  const caseIdsWithImpact = new Set(impacts.map(i => i.caseId))

  console.log('CASOS SIN IMPACTO:')
  for (const c of cases) {
    if (!caseIdsWithImpact.has(c.id)) {
      console.log('  - ' + c.slug)
    }
  }

  console.log('\nCASOS CON IMPACTO:')
  for (const c of cases) {
    if (caseIdsWithImpact.has(c.id)) {
      console.log('  + ' + c.slug)
    }
  }
}

main().finally(() => prisma.$disconnect())
