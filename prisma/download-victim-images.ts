import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'

const prisma = new PrismaClient()

/**
 * DESCARGA DE IMAGENES DE VICTIMAS - Dominio Publico
 *
 * Este script descarga imagenes de fuentes de dominio publico
 * y actualiza la base de datos con las rutas locales.
 *
 * Ejecutar con: npx tsx prisma/download-victim-images.ts
 */

interface ImageConfig {
  victimName: string
  searchTerms: string[]  // Para buscar por nombre parcial
  imageUrl: string
  localPath: string
  source: string
  isPublicDomain: boolean
}

// Imagenes de dominio publico con URLs verificadas de Wikimedia Commons
const publicDomainImages: ImageConfig[] = [
  // ELIZABETH SHORT - Black Dahlia (FBI/Police - Dominio Publico)
  {
    victimName: 'Elizabeth Short',
    searchTerms: ['Elizabeth Short', 'Elizabeth', 'Short'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Black_Dahlia.jpg',
    localPath: '/images/victims/elizabeth-short.jpg',
    source: 'FBI / LAPD - Dominio publico',
    isPublicDomain: true
  },
]

// URLs externas verificadas (no descargables pero usables directamente)
const externalImages: Record<string, { url: string; source: string }> = {
  // Wikimedia Commons - Dominio Publico
  'Elizabeth Short': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Black_Dahlia.jpg',
    source: 'FBI / Santa Barbara Police - Dominio publico via Wikimedia Commons'
  },
}

// Funcion para descargar imagen
async function downloadImage(url: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const fullPath = path.join(process.cwd(), 'public', destPath)
    const dir = path.dirname(fullPath)

    // Crear directorio si no existe
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const file = fs.createWriteStream(fullPath)
    const protocol = url.startsWith('https') ? https : http

    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CasosReales/1.0; Educational Project)'
      }
    }, (response) => {
      // Manejar redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location
        if (redirectUrl) {
          file.close()
          fs.unlinkSync(fullPath)
          downloadImage(redirectUrl, destPath).then(resolve)
          return
        }
      }

      if (response.statusCode !== 200) {
        console.log(`   Error HTTP ${response.statusCode} para ${url}`)
        file.close()
        fs.unlinkSync(fullPath)
        resolve(false)
        return
      }

      response.pipe(file)

      file.on('finish', () => {
        file.close()
        resolve(true)
      })
    }).on('error', (err) => {
      file.close()
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath)
      }
      console.log(`   Error de red: ${err.message}`)
      resolve(false)
    })
  })
}

async function updateVictimImages() {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  ACTUALIZANDO IMAGENES DE VICTIMAS')
  console.log('═══════════════════════════════════════════════════════════════\n')

  let updated = 0
  let errors = 0

  // 1. Procesar imagenes de dominio publico (descargar)
  console.log('📥 Descargando imagenes de dominio publico...\n')

  for (const img of publicDomainImages) {
    console.log(`   Procesando: ${img.victimName}`)

    const downloaded = await downloadImage(img.imageUrl, img.localPath)

    if (downloaded) {
      // Actualizar en la base de datos
      const result = await prisma.victim.updateMany({
        where: {
          OR: img.searchTerms.map(term => ({ fullName: { contains: term } }))
        },
        data: {
          imageUrl: img.localPath,
          imageSource: img.source
        }
      })

      if (result.count > 0) {
        console.log(`   ✓ Descargada y actualizada: ${img.localPath}`)
        updated += result.count
      } else {
        console.log(`   ⚠ Descargada pero no encontrada en BD`)
      }
    } else {
      console.log(`   ✗ Error al descargar`)
      errors++
    }
  }

  // 2. Para imagenes que no se pueden descargar, usar URLs externas
  console.log('\n🔗 Configurando URLs externas...\n')

  for (const [name, config] of Object.entries(externalImages)) {
    // Verificar si ya tiene imagen local
    const victim = await prisma.victim.findFirst({
      where: { fullName: { contains: name } }
    })

    if (victim && !victim.imageUrl) {
      const result = await prisma.victim.updateMany({
        where: { fullName: { contains: name } },
        data: {
          imageUrl: config.url,
          imageSource: config.source
        }
      })

      if (result.count > 0) {
        console.log(`   ✓ ${name}: URL externa configurada`)
        updated += result.count
      }
    }
  }

  // 3. Resumen
  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log('  RESUMEN')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`   Imagenes actualizadas: ${updated}`)
  console.log(`   Errores: ${errors}`)
  console.log('═══════════════════════════════════════════════════════════════\n')

  // 4. Mostrar victimas sin imagen
  const victimsWithoutImage = await prisma.victim.findMany({
    where: {
      OR: [
        { imageUrl: null },
        { imageUrl: '' }
      ]
    },
    select: { fullName: true }
  })

  if (victimsWithoutImage.length > 0) {
    console.log('⚠ Victimas sin imagen (requieren descarga manual):')
    victimsWithoutImage.forEach(v => {
      console.log(`   - ${v.fullName}`)
    })
    console.log('\n   Para estas victimas, descarga manualmente las imagenes de:')
    console.log('   - Sitios oficiales de las familias')
    console.log('   - Medios de comunicacion con permiso')
    console.log('   - Fundaciones y memoriales oficiales')
    console.log('\n   Guardalas en: public/images/victims/')
  }
}

updateVictimImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
