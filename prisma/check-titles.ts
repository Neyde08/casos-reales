import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Actualizar Jeffrey Dahmer
  await prisma.case.update({
    where: { slug: 'jeffrey-dahmer' },
    data: { title: 'Jeffrey Dahmer y sus Victimas' }
  })
  console.log('Jeffrey Dahmer actualizado')

  // Mostrar todos los títulos
  const cases = await prisma.case.findMany({
    where: { type: 'SERIAL_KILLER' },
    select: { title: true, slug: true }
  })
  console.log('\nTitulos de asesinos seriales:')
  cases.forEach(c => console.log(`${c.slug}: ${c.title}`))
}

main().finally(() => prisma.$disconnect())
