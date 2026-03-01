import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Normaliza texto para busqueda: convierte a minusculas y elimina acentos/tildes
 */
function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .trim()
}

async function main() {
  console.log('Poblando campos de busqueda normalizados...\n')

  // Actualizar casos
  const cases = await prisma.case.findMany()
  console.log(`Procesando ${cases.length} casos...`)

  for (const caso of cases) {
    await prisma.case.update({
      where: { id: caso.id },
      data: {
        titleSearch: normalizeForSearch(caso.title),
        countrySearch: normalizeForSearch(caso.country),
        citySearch: caso.city ? normalizeForSearch(caso.city) : null,
      }
    })
    console.log(`  ✓ ${caso.title}`)
  }

  // Actualizar victimas
  const victims = await prisma.victim.findMany()
  console.log(`\nProcesando ${victims.length} victimas...`)

  for (const victim of victims) {
    await prisma.victim.update({
      where: { id: victim.id },
      data: {
        fullNameSearch: normalizeForSearch(victim.fullName),
      }
    })
    console.log(`  ✓ ${victim.fullName}`)
  }

  console.log('\n¡Completado!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
