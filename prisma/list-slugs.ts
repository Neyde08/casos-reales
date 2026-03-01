import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function listSlugs() {
  const cases = await prisma.case.findMany({
    select: { slug: true, title: true },
    orderBy: { title: 'asc' }
  })

  console.log('SLUGS DE CASOS:')
  cases.forEach(c => console.log(`  ${c.slug} -> ${c.title}`))
}

listSlugs()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
