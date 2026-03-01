import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Imágenes locales descargadas de fuentes públicas (FBI, dominio público)
// Para los demás casos se usa imagen local o null para mostrar placeholder
const caseImages: Record<string, string> = {
  // ===== ASESINOS SERIALES (imágenes locales del FBI/dominio público) =====
  'ted-bundy': '/images/cases/ted-bundy.jpg',
  'jeffrey-dahmer': '/images/cases/jeffrey-dahmer.jpg',
  'john-wayne-gacy': '/images/cases/placeholder-serial.svg',
  'zodiac-killer': '/images/cases/placeholder-mystery.svg',
  'jack-el-destripador': '/images/cases/placeholder-historical.svg',

  // ===== CASOS HISTÓRICOS DE EEUU =====
  'dalia-negra': '/images/cases/dalia-negra.png',
  'jonbenet-ramsey': '/images/cases/placeholder-case.svg',
  'caso-elisa-lam': '/images/cases/placeholder-mystery.svg',
  'natalee-holloway': '/images/cases/placeholder-missing.svg',
  'laci-peterson': '/images/cases/placeholder-case.svg',
  'amy-mihaljevic': '/images/cases/placeholder-case.svg',
  'maura-murray': '/images/cases/placeholder-missing.svg',
  'delphi-murders': '/images/cases/placeholder-case.svg',
  'chandra-levy': '/images/cases/placeholder-case.svg',
  'tammy-lynn-leppert': '/images/cases/placeholder-missing.svg',
  'caylee-anthony': '/images/cases/placeholder-case.svg',

  // ===== CASOS DE ESPAÑA =====
  'crimen-alcasser': '/images/cases/placeholder-spain.svg',
  'caso-diana-quer': '/images/cases/placeholder-spain.svg',
  'marta-del-castillo': '/images/cases/placeholder-spain.svg',
  'caso-gabriel-cruz': '/images/cases/placeholder-spain.svg',
  'caso-asunta-basterra': '/images/cases/placeholder-spain.svg',
  'yeremi-vargas': '/images/cases/placeholder-missing.svg',
  'anabel-segura': '/images/cases/placeholder-spain.svg',

  // ===== CASOS INTERNACIONALES =====
  'madeleine-mccann': '/images/cases/placeholder-missing.svg',
  'caso-paulette': '/images/cases/placeholder-case.svg',
  'maria-marta-garcia-belsunce': '/images/cases/placeholder-case.svg',
  'meredith-kercher': '/images/cases/placeholder-case.svg',
  'emanuela-orlandi': '/images/cases/placeholder-missing.svg',
  'oriel-briant': '/images/cases/placeholder-case.svg',
  'solange-grabenheimer': '/images/cases/placeholder-case.svg',
}

async function main() {
  console.log('Updating case images with real URLs...')

  for (const [slug, imageUrl] of Object.entries(caseImages)) {
    try {
      const result = await prisma.case.updateMany({
        where: { slug },
        data: { mainImageUrl: imageUrl }
      })
      if (result.count > 0) {
        console.log(`✓ Updated image for: ${slug}`)
      } else {
        console.log(`⚠ Case not found: ${slug}`)
      }
    } catch (error) {
      console.log(`✗ Error updating ${slug}:`, error)
    }
  }

  console.log('Image update complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
