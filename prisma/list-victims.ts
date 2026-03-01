import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function listVictims() {
  const victims = await prisma.victim.findMany({
    select: {
      fullName: true,
      imageUrl: true,
      case: {
        select: { title: true }
      }
    },
    orderBy: { fullName: 'asc' }
  })

  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  LISTA DE VICTIMAS EN LA BASE DE DATOS')
  console.log('═══════════════════════════════════════════════════════════════\n')

  for (const v of victims) {
    const hasImage = v.imageUrl ? '✓' : '⚠'
    console.log(`${hasImage} ${v.fullName}`)
    console.log(`   Caso: ${v.case.title}`)
    if (v.imageUrl) {
      console.log(`   Imagen: ${v.imageUrl}`)
    }
    console.log('')
  }

  const withImage = victims.filter(v => v.imageUrl).length
  const withoutImage = victims.filter(v => !v.imageUrl).length

  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`  Con imagen: ${withImage} | Sin imagen: ${withoutImage}`)
  console.log('═══════════════════════════════════════════════════════════════\n')
}

listVictims()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
