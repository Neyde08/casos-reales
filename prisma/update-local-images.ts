import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Actualiza las víctimas para usar imágenes locales descargadas
 */

const localImages: { searchName: string; localPath: string; source: string }[] = [
  // Elizabeth Short - Black Dahlia
  {
    searchName: 'Elizabeth Short',
    localPath: '/images/victims/elizabeth-short.jpg',
    source: 'FBI / Santa Barbara Police - Dominio publico'
  },
  // Zodiac victims
  {
    searchName: 'Betty Lou Jensen',
    localPath: '/images/victims/betty-lou-jensen.jpg',
    source: 'Archivo del caso Zodiac - Uso educativo'
  },
  {
    searchName: 'David Faraday',
    localPath: '/images/victims/david-faraday.jpg',
    source: 'Archivo del caso Zodiac - Uso educativo'
  },
  {
    searchName: 'Darlene Ferrin',
    localPath: '/images/victims/darlene-ferrin.jpg',
    source: 'Archivo del caso Zodiac - Uso educativo'
  },
  {
    searchName: 'Cecelia Shepard',
    localPath: '/images/victims/cecelia-shepard.jpg',
    source: 'Archivo del caso Zodiac - Uso educativo'
  },
  {
    searchName: 'Bryan Hartnell',
    localPath: '/images/victims/bryan-hartnell.jpg',
    source: 'Archivo del caso Zodiac - Uso educativo'
  },
  {
    searchName: 'Paul Stine',
    localPath: '/images/victims/paul-stine.jpg',
    source: 'Archivo del caso Zodiac - Uso educativo'
  },
  // Ted Bundy victims
  {
    searchName: 'Lynda Healy',
    localPath: '/images/victims/lynda-healy.gif',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Donna Manson',
    localPath: '/images/victims/donna-manson.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Susan Rancourt',
    localPath: '/images/victims/susan-rancourt.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Roberta Parks',
    localPath: '/images/victims/roberta-parks.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Georgeann Hawkins',
    localPath: '/images/victims/georgeann-hawkins.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Janice Ott',
    localPath: '/images/victims/janice-ott.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Denise Naslund',
    localPath: '/images/victims/denise-naslund.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Laura Aime',
    localPath: '/images/victims/laura-aime.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Melissa Smith',
    localPath: '/images/victims/melissa-smith.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Debra Kent',
    localPath: '/images/victims/debra-kent.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Caryn Campbell',
    localPath: '/images/victims/caryn-campbell.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Margaret Bowman',
    localPath: '/images/victims/margaret-bowman.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Lisa Levy',
    localPath: '/images/victims/lisa-levy.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
  {
    searchName: 'Kimberly Leach',
    localPath: '/images/victims/kimberly-leach.jpg',
    source: 'Archivo del caso - Uso educativo'
  },
]

async function updateLocalImages() {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  ACTUALIZANDO IMAGENES LOCALES')
  console.log('═══════════════════════════════════════════════════════════════\n')

  let updated = 0

  for (const img of localImages) {
    const result = await prisma.victim.updateMany({
      where: {
        fullName: { contains: img.searchName }
      },
      data: {
        imageUrl: img.localPath,
        imageSource: img.source
      }
    })

    if (result.count > 0) {
      console.log(`✓ ${img.searchName}: ${img.localPath}`)
      updated += result.count
    } else {
      console.log(`⚠ ${img.searchName}: No encontrada en BD`)
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log(`  TOTAL ACTUALIZADAS: ${updated}`)
  console.log('═══════════════════════════════════════════════════════════════\n')
}

updateLocalImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
