import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkVictimInfo() {
  // Verificar víctimas de Alcàsser
  const alcasserVictims = await prisma.victim.findMany({
    where: {
      case: {
        slug: 'crimen-alcasser'
      }
    },
    select: {
      fullName: true,
      birthDate: true,
      birthPlace: true,
      parents: true,
      siblings: true,
      education: true,
      personality: true,
      hobbies: true,
      lastSeenDetails: true,
      lifeSummary: true,
      legacy: true
    }
  })

  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  INFORMACIÓN DE VÍCTIMAS DE ALCÀSSER')
  console.log('═══════════════════════════════════════════════════════════════\n')

  for (const v of alcasserVictims) {
    console.log(`\n📋 ${v.fullName}`)
    console.log('─'.repeat(50))
    console.log(`   birthDate: ${v.birthDate ? '✓' : '✗'}`)
    console.log(`   birthPlace: ${v.birthPlace ? '✓' : '✗'}`)
    console.log(`   parents: ${v.parents ? '✓' : '✗'}`)
    console.log(`   siblings: ${v.siblings ? '✓' : '✗'}`)
    console.log(`   education: ${v.education ? '✓' : '✗'}`)
    console.log(`   personality: ${v.personality ? '✓' : '✗'}`)
    console.log(`   hobbies: ${v.hobbies ? '✓' : '✗'}`)
    console.log(`   lastSeenDetails: ${v.lastSeenDetails ? '✓' : '✗'}`)
    console.log(`   lifeSummary: ${v.lifeSummary ? '✓' : '✗'}`)
    console.log(`   legacy: ${v.legacy ? '✓' : '✗'}`)

    if (v.personality) {
      console.log(`\n   Personalidad (preview): ${v.personality.substring(0, 100)}...`)
    }
  }

  console.log('\n')
}

checkVictimInfo()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
