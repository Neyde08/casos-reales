import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Actualizando imágenes de víctimas de los nuevos casos...\n')

  // Cecilia Cubas - mujer adulta
  await prisma.victim.updateMany({
    where: { fullName: { contains: 'Cecilia Cubas' } },
    data: { imageUrl: '/images/victims/placeholder-female.svg' }
  })
  console.log('✅ Cecilia Cubas')

  // Nayoung - niña
  await prisma.victim.updateMany({
    where: { fullName: { contains: 'Nayoung' } },
    data: { imageUrl: '/images/victims/placeholder-child.svg' }
  })
  console.log('✅ Nayoung')

  // Junko Furuta - mujer joven
  await prisma.victim.updateMany({
    where: { fullName: { contains: 'Junko Furuta' } },
    data: { imageUrl: '/images/victims/placeholder-female.svg' }
  })
  console.log('✅ Junko Furuta')

  // Víctimas de Hwaseong - mujeres
  const hwaseongVictims = [
    'Lee Wan-im',
    'Park Hyun-sook',
    'Kwon Jung-bon',
    'Lee Gye-sook',
    'Hong Jin-young'
  ]

  for (const name of hwaseongVictims) {
    await prisma.victim.updateMany({
      where: { fullName: { contains: name.split(' ')[0] } },
      data: { imageUrl: '/images/victims/placeholder-female.svg' }
    })
  }
  console.log('✅ Víctimas de Hwaseong')

  // Niño del Buzón - niño
  await prisma.victim.updateMany({
    where: { fullName: { contains: 'Niño del Buzón' } },
    data: { imageUrl: '/images/victims/placeholder-child.svg' }
  })
  console.log('✅ Niño del Buzón')

  console.log('\n¡Imágenes de víctimas actualizadas!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
