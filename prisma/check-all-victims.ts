import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const cases = await prisma.case.findMany({
    include: {
      victims: {
        select: {
          fullName: true,
          personality: true,
          lifeSummary: true,
          hobbies: true,
        }
      }
    },
    orderBy: { title: 'asc' }
  })

  for (const caso of cases) {
    if (caso.victims.length === 0) continue

    const incomplete = caso.victims.filter(v => !v.personality || !v.lifeSummary)

    if (incomplete.length > 0) {
      console.log(`\n${'='.repeat(60)}`)
      console.log(`${caso.title}`)
      console.log(`Victimas sin info completa: ${incomplete.length}/${caso.victims.length}`)
      incomplete.forEach(v => {
        console.log(`  - ${v.fullName} (personalidad: ${v.personality ? 'SI' : 'NO'}, resumen: ${v.lifeSummary ? 'SI' : 'NO'})`)
      })
    }
  }
}

main().finally(() => prisma.$disconnect())
