import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixAsterisks() {
  console.log('Corrigiendo asteriscos en el contenido de los casos...')

  // Obtener todos los casos
  const cases = await prisma.case.findMany()

  for (const caso of cases) {
    let content = caso.content || ''
    let updated = false

    // Reemplazar **texto** por TEXTO (mayúsculas)
    const regex = /\*\*([^*]+)\*\*/g
    if (regex.test(content)) {
      content = content.replace(/\*\*([^*]+)\*\*/g, (match, text) => text.toUpperCase())
      updated = true
    }

    if (updated) {
      await prisma.case.update({
        where: { id: caso.id },
        data: { content }
      })
      console.log(`Corregido: ${caso.title}`)
    }
  }

  console.log('Corrección completada!')
}

fixAsterisks()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
