import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Actualizar Ted Bundy
  await prisma.case.update({
    where: { slug: 'ted-bundy' },
    data: { title: 'Ted Bundy y sus Victimas' }
  })
  console.log('Ted Bundy actualizado')

  // Actualizar John Wayne Gacy para incluir su nombre
  await prisma.case.update({
    where: { slug: 'john-wayne-gacy' },
    data: { title: 'John Wayne Gacy y sus Victimas' }
  })
  console.log('John Wayne Gacy actualizado')

  // Verificar todos los títulos
  const cases = await prisma.case.findMany({
    where: { type: 'SERIAL_KILLER' },
    select: { title: true }
  })
  console.log('\nTitulos de asesinos seriales:')
  cases.forEach(c => console.log(`- ${c.title}`))
}

main().finally(() => prisma.$disconnect())
