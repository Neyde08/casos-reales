import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * CONFIGURACION DE IMAGENES DE VICTIMAS
 *
 * Usa URLs externas de fuentes verificadas y de dominio publico.
 * Para imagenes protegidas por derechos, se usan placeholders.
 *
 * Ejecutar con: npx tsx prisma/set-victim-images.ts
 */

interface VictimImage {
  searchName: string
  imageUrl: string | null
  imageSource: string
  notes?: string
}

const victimImages: VictimImage[] = [
  // ══════════════════════════════════════════════════════════════════
  // CASO ALCASSER - Espana (1992)
  // NOTA: Imagenes protegidas por la familia. Usar con respeto.
  // ══════════════════════════════════════════════════════════════════
  {
    searchName: 'Miriam García',
    imageUrl: null, // Requiere permiso de la familia
    imageSource: 'Pendiente - Foto familiar via medios espanoles autorizados',
    notes: 'Buscar en RTVE documentales sobre el caso'
  },
  {
    searchName: 'Toñi',
    imageUrl: null,
    imageSource: 'Pendiente - Foto familiar via medios espanoles autorizados',
  },
  {
    searchName: 'Desirée',
    imageUrl: null,
    imageSource: 'Pendiente - Foto familiar via medios espanoles autorizados',
  },

  // ══════════════════════════════════════════════════════════════════
  // ELIZABETH SHORT - Black Dahlia (1947)
  // Dominio publico - FBI/Police records
  // ══════════════════════════════════════════════════════════════════
  {
    searchName: 'Elizabeth Short',
    // Imagen del articulo de Wikipedia - mugshot de Santa Barbara Police
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Black_Dahlia_Mugshot.jpg/220px-Black_Dahlia_Mugshot.jpg',
    imageSource: 'Santa Barbara Police Department (1943) - Dominio publico via Wikimedia Commons'
  },

  // ══════════════════════════════════════════════════════════════════
  // MADELEINE MCCANN (2007)
  // Solo usar imagenes del sitio oficial FindMadeleine.com
  // ══════════════════════════════════════════════════════════════════
  {
    searchName: 'Madeleine',
    imageUrl: null, // Solo usar con autorizacion de la familia
    imageSource: 'Pendiente - Solo usar imagenes de findmadeleine.com',
    notes: 'Visitar https://www.findmadeleine.com/ para descargar poster oficial'
  },

  // ══════════════════════════════════════════════════════════════════
  // JONBENET RAMSEY (1996)
  // Imagenes familiares - usar con respeto
  // ══════════════════════════════════════════════════════════════════
  {
    searchName: 'JonBen',
    imageUrl: null, // Imagenes protegidas
    imageSource: 'Pendiente - Foto familiar via medios autorizados',
    notes: 'Usar solo fotos familiares, NO de concursos de belleza'
  },

  // ══════════════════════════════════════════════════════════════════
  // PAULETTE GEBARA (2010) - Mexico
  // ══════════════════════════════════════════════════════════════════
  {
    searchName: 'Paulette',
    imageUrl: null,
    imageSource: 'Pendiente - Foto de busqueda oficial via Proceso/El Universal',
  },

  // ══════════════════════════════════════════════════════════════════
  // MARIA MARTA GARCIA BELSUNCE (2002) - Argentina
  // ══════════════════════════════════════════════════════════════════
  {
    searchName: 'García Belsunce',
    imageUrl: null,
    imageSource: 'Pendiente - Foto familiar via La Nacion Argentina',
  },

  // ══════════════════════════════════════════════════════════════════
  // DIANA QUER (2016) - Espana
  // ══════════════════════════════════════════════════════════════════
  {
    searchName: 'Diana Quer',
    imageUrl: null,
    imageSource: 'Pendiente - Foto proporcionada por la familia Quer',
  },

  // ══════════════════════════════════════════════════════════════════
  // MARTA DEL CASTILLO (2009) - Espana
  // ══════════════════════════════════════════════════════════════════
  {
    searchName: 'Marta del Castillo',
    imageUrl: null,
    imageSource: 'Pendiente - Foto de campana de busqueda familiar',
  },

  // ══════════════════════════════════════════════════════════════════
  // ELISA LAM (2013) - Canada/EEUU
  // ══════════════════════════════════════════════════════════════════
  {
    searchName: 'Elisa Lam',
    imageUrl: null,
    imageSource: 'Pendiente - Foto familiar via medios canadienses',
    notes: 'NO usar capturas del video del ascensor'
  },

  // ══════════════════════════════════════════════════════════════════
  // ZODIAC VICTIMS (1968)
  // ══════════════════════════════════════════════════════════════════
  {
    searchName: 'Betty Lou Jensen',
    imageUrl: null,
    imageSource: 'Pendiente - Foto escolar via archivos del caso',
  },
]

async function setVictimImages() {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  CONFIGURANDO IMAGENES DE VICTIMAS')
  console.log('═══════════════════════════════════════════════════════════════\n')

  let updated = 0
  let pending = 0

  for (const img of victimImages) {
    const result = await prisma.victim.updateMany({
      where: {
        fullName: { contains: img.searchName }
      },
      data: {
        imageUrl: img.imageUrl,
        imageSource: img.imageSource
      }
    })

    if (result.count > 0) {
      if (img.imageUrl) {
        console.log(`✓ ${img.searchName}: Imagen configurada`)
        updated += result.count
      } else {
        console.log(`⏳ ${img.searchName}: Pendiente de imagen (${result.count} registro(s))`)
        pending += result.count
      }
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log('  RESUMEN')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`   Con imagen: ${updated}`)
  console.log(`   Pendientes: ${pending}`)

  // Mostrar instrucciones para imagenes pendientes
  console.log('\n📋 INSTRUCCIONES PARA IMAGENES PENDIENTES:')
  console.log('═══════════════════════════════════════════════════════════════\n')

  const pendingImages = victimImages.filter(v => !v.imageUrl)
  for (const img of pendingImages) {
    console.log(`📷 ${img.searchName}`)
    console.log(`   Fuente: ${img.imageSource}`)
    if (img.notes) {
      console.log(`   Nota: ${img.notes}`)
    }
    console.log('')
  }

  console.log('Para agregar imagenes manualmente:')
  console.log('1. Descarga la imagen de la fuente indicada')
  console.log('2. Guardala en: public/images/victims/nombre-victima.jpg')
  console.log('3. Actualiza imageUrl en la base de datos con: /images/victims/nombre-victima.jpg')
  console.log('═══════════════════════════════════════════════════════════════\n')
}

setVictimImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
