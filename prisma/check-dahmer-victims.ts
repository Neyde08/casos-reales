import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const caso = await prisma.case.findUnique({
    where: { slug: 'jeffrey-dahmer' },
    include: { victims: true }
  })

  if (caso) {
    console.log('Victimas encontradas:', caso.victims.length)
    console.log('')
    caso.victims.forEach(v => {
      console.log('='.repeat(50))
      console.log('Nombre:', v.fullName)
      console.log('Edad:', v.ageAtDeathOrMissing)
      console.log('Tiene personalidad:', v.personality ? 'SI' : 'NO')
      console.log('Tiene biografia:', v.biography ? 'SI' : 'NO')
      console.log('Tiene suenos:', v.dreams ? 'SI' : 'NO')
      console.log('Tiene hobbies:', v.hobbies ? 'SI' : 'NO')
      console.log('Tiene familia:', v.familyBackground ? 'SI' : 'NO')
      console.log('Tiene lifeSummary:', v.lifeSummary ? 'SI' : 'NO')
    })
  }
}

main().finally(() => prisma.$disconnect())
