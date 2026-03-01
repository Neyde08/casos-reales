import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Actualizando imágenes de los nuevos casos...\n')

  // Cecilia Cubas - Paraguay
  await prisma.case.update({
    where: { slug: 'cecilia-cubas' },
    data: { mainImageUrl: '/images/cases/placeholder-paraguay.svg' }
  })
  console.log('✅ Cecilia Cubas - placeholder-paraguay.svg')

  // Caso Nayoung - Corea del Sur
  await prisma.case.update({
    where: { slug: 'caso-nayoung' },
    data: { mainImageUrl: '/images/cases/placeholder-korea.svg' }
  })
  console.log('✅ Caso Nayoung - placeholder-korea.svg')

  // Junko Furuta - Japón
  await prisma.case.update({
    where: { slug: 'junko-furuta' },
    data: { mainImageUrl: '/images/cases/placeholder-japan.svg' }
  })
  console.log('✅ Junko Furuta - placeholder-japan.svg')

  // Asesinatos de Hwaseong - Corea del Sur
  await prisma.case.update({
    where: { slug: 'asesino-hwaseong' },
    data: { mainImageUrl: '/images/cases/placeholder-korea.svg' }
  })
  console.log('✅ Asesinatos de Hwaseong - placeholder-korea.svg')

  // Niño del Buzón - España (caso frío)
  await prisma.case.update({
    where: { slug: 'nino-buzon-almeria' },
    data: { mainImageUrl: '/images/cases/placeholder-coldcase.svg' }
  })
  console.log('✅ Niño del Buzón - placeholder-coldcase.svg')

  console.log('\n¡Imágenes actualizadas!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
