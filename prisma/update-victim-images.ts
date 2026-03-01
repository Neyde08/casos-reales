import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * GUÍA DE IMÁGENES DE VÍCTIMAS - Casos Reales
 *
 * Este archivo contiene DOS tipos de configuración:
 *
 * 1. LOCAL (recomendado): Usa rutas como '/images/victims/nombre.jpg'
 *    - Debes descargar manualmente las imágenes de las fuentes indicadas
 *    - Guardarlas en: public/images/victims/
 *    - Ventaja: Control total, no dependes de terceros
 *
 * 2. EXTERNA: URLs directas a imágenes en servidores externos
 *    - Solo para imágenes de dominio público (FBI, Wikimedia, etc.)
 *    - Riesgo: Los links pueden romperse
 *
 * IMPORTANTE: No usamos URLs de artículos - solo URLs directas de imágenes (.jpg, .png)
 */

interface VictimImageConfig {
  // URL de la imagen (local o externa)
  url: string | null
  // Fuente original de la imagen (OBLIGATORIO)
  source: string
  // Instrucciones para descarga manual
  downloadFrom?: string
  // Si es true, la URL es externa y verificada
  isExternal?: boolean
}

const victimImages: Record<string, VictimImageConfig> = {
  // ══════════════════════════════════════════════════════════════════
  // CASOS ESPAÑOLES
  // ══════════════════════════════════════════════════════════════════

  // --- CRIMEN DE ALCÀSSER (1992) ---
  'Miriam García Iborra': {
    url: '/images/victims/miriam-garcia-iborra.jpg',
    source: 'Archivo familiar vía El País / RTVE',
    downloadFrom: 'https://elpais.com/tag/caso_alcasser/ - Buscar fotos familiares de las tres niñas'
  },
  'Antonia "Toñi" Gómez Rodríguez': {
    url: '/images/victims/toni-gomez-rodriguez.jpg',
    source: 'Archivo familiar vía El País / RTVE',
    downloadFrom: 'https://elpais.com/tag/caso_alcasser/'
  },
  'Desirée Hernández Folch': {
    url: '/images/victims/desiree-hernandez-folch.jpg',
    source: 'Archivo familiar vía El País / RTVE',
    downloadFrom: 'https://elpais.com/tag/caso_alcasser/'
  },

  // --- DIANA QUER (2016) ---
  'Diana Quer López': {
    url: '/images/victims/diana-quer-lopez.jpg',
    source: 'Familia Quer vía El Mundo',
    downloadFrom: 'https://www.elmundo.es/ - Buscar "Diana Quer" - Usar fotos compartidas por la familia'
  },

  // --- MARTA DEL CASTILLO (2009) ---
  'Marta del Castillo Casanueva': {
    url: '/images/victims/marta-del-castillo.jpg',
    source: 'Familia Del Castillo vía ABC Sevilla',
    downloadFrom: 'https://sevilla.abc.es/ - Foto oficial de campañas de búsqueda'
  },

  // --- ASUNTA BASTERRA (2013) ---
  'Asunta Yong Fang Basterra Porto': {
    url: '/images/victims/asunta-basterra-porto.jpg',
    source: 'Archivo escolar vía La Voz de Galicia',
    downloadFrom: 'https://www.lavozdegalicia.es/ - Fotos escolares, NO de la serie de Netflix'
  },

  // --- YÉREMI VARGAS (2007) ---
  'Yéremi Vargas': {
    url: '/images/victims/yeremi-vargas.jpg',
    source: 'Familia Vargas vía Canarias7',
    downloadFrom: 'https://www.canarias7.es/ - Foto oficial de búsqueda'
  },

  // --- ANABEL SEGURA (1993) ---
  // NOTA: El apellido correcto es "Segura Foles", no "García"
  'Anabel Segura García': {
    url: '/images/victims/anabel-segura.jpg',
    source: 'Campaña de búsqueda vía Telemadrid',
    downloadFrom: 'https://www.telemadrid.es/ - Buscar "Anabel Segura 30 años"'
  },

  // --- GABRIEL CRUZ (2018) ---
  // NOTA: La madre ha denunciado uso indebido de fotos - ser muy cuidadoso
  'Gabriel Cruz Ramírez': {
    url: '/images/victims/gabriel-cruz.jpg',
    source: 'Familia Cruz - Usar solo fotos autorizadas',
    downloadFrom: 'Consultar medios que tengan autorización de la familia'
  },

  // ══════════════════════════════════════════════════════════════════
  // CASOS ARGENTINOS
  // ══════════════════════════════════════════════════════════════════

  // --- MARÍA MARTA GARCÍA BELSUNCE (2002) ---
  'María Marta García Belsunce': {
    url: '/images/victims/maria-marta-garcia-belsunce.jpg',
    source: 'La Nación Argentina / Télam',
    downloadFrom: 'https://www.lanacion.com.ar/ - Buscar "García Belsunce" - Fotos familiares'
  },

  // ══════════════════════════════════════════════════════════════════
  // CASOS MÉXICO
  // ══════════════════════════════════════════════════════════════════

  // --- PAULETTE GEBARA (2010) ---
  'Paulette Gebara Farah': {
    url: '/images/victims/paulette-gebara.jpg',
    source: 'Proceso / El Universal México',
    downloadFrom: 'https://www.proceso.com.mx/ - Foto de búsqueda oficial'
  },

  // ══════════════════════════════════════════════════════════════════
  // CASOS INTERNACIONALES - REINO UNIDO / PORTUGAL
  // ══════════════════════════════════════════════════════════════════

  // --- MADELEINE MCCANN (2007) ---
  'Madeleine Beth McCann': {
    url: '/images/victims/madeleine-mccann.jpg',
    source: 'FindMadeleine.com - Sitio oficial de la familia McCann',
    downloadFrom: 'https://www.findmadeleine.com/ - ÚNICA fuente autorizada por la familia'
  },

  // --- MEREDITH KERCHER (2007) ---
  'Meredith Susanna Cara Kercher': {
    url: '/images/victims/meredith-kercher.jpg',
    source: 'Familia Kercher vía BBC / The Guardian',
    downloadFrom: 'https://www.bbc.com/ o https://www.theguardian.com/ - Fotos proporcionadas por familia'
  },

  // ══════════════════════════════════════════════════════════════════
  // CASOS ESTADOS UNIDOS - DOMINIO PÚBLICO (FBI)
  // ══════════════════════════════════════════════════════════════════

  // --- ELIZABETH SHORT / BLACK DAHLIA (1947) ---
  // Las fotos del FBI son de dominio público (gobierno de EEUU)
  'Elizabeth Short': {
    url: '/images/victims/elizabeth-short.jpg',
    source: 'FBI Vault - Dominio público (17 U.S.C. § 105)',
    downloadFrom: 'https://vault.fbi.gov/Black%20Dahlia - Foto de retrato, NO escena del crimen',
    isExternal: false
  },

  // --- AMY MIHALJEVIC (1989) ---
  'Amy Renee Mihaljevic': {
    url: '/images/victims/amy-mihaljevic.jpg',
    source: 'FBI Wanted - Foto escolar',
    downloadFrom: 'https://www.fbi.gov/wanted/seeking-info/amy-renee-mihaljevic'
  },

  // --- JONBENÉT RAMSEY (1996) ---
  'JonBenét Patricia Ramsey': {
    url: '/images/victims/jonbenet-ramsey.jpg',
    source: 'Boulder Police Department / Archivos de prensa',
    downloadFrom: 'https://bouldercolorado.gov/jonbenet-ramsey-homicide - Retratos familiares, NO concursos'
  },

  // --- NATALEE HOLLOWAY (2005) ---
  'Natalee Ann Holloway': {
    url: '/images/victims/natalee-holloway.jpg',
    source: 'Familia Holloway vía CBS News',
    downloadFrom: 'https://www.cbsnews.com/pictures/natalee-holloway-paradise-lost/ - Foto de graduación'
  },

  // --- LACI PETERSON (2002) ---
  'Laci Denise Peterson': {
    url: '/images/victims/laci-peterson.jpg',
    source: 'Familia Rocha vía CBS News',
    downloadFrom: 'https://www.cbsnews.com/pictures/laci-life-and-death/ - Fotos familiares'
  },

  // --- ELISA LAM (2013) ---
  'Elisa Lam': {
    url: '/images/victims/elisa-lam.jpg',
    source: 'Familia Lam vía The Globe and Mail',
    downloadFrom: 'https://www.theglobeandmail.com/ - Fotos familiares, NO capturas del video'
  },

  // --- MAURA MURRAY (2004) ---
  'Maura Murray': {
    url: '/images/victims/maura-murray.jpg',
    source: 'Familia Murray - MauraMurrayMissing.org',
    downloadFrom: 'https://www.mauramurraymissing.org/ o redes sociales de la familia'
  },

  // --- DELPHI MURDERS (2017) ---
  'Abigail Joyce Williams': {
    url: '/images/victims/abigail-williams.jpg',
    source: 'Familia Williams vía Indiana State Police / WRTV',
    downloadFrom: 'https://www.wrtv.com/news/delphi-murders-family-photos-of-liberty-german-abigail-williams'
  },
  'Liberty Rose German': {
    url: '/images/victims/liberty-german.jpg',
    source: 'Familia German vía Indiana State Police / WRTV',
    downloadFrom: 'https://www.wrtv.com/news/delphi-murders-family-photos-of-liberty-german-abigail-williams'
  },

  // ══════════════════════════════════════════════════════════════════
  // CASOS ZODIAC KILLER (1968-1969)
  // ══════════════════════════════════════════════════════════════════

  'David Faraday': {
    url: '/images/victims/david-faraday.jpg',
    source: 'Archivos escolares vía San Francisco Chronicle',
    downloadFrom: 'https://www.sfchronicle.com/ - Fotos de anuario escolar'
  },
  'Betty Lou Jensen': {
    url: '/images/victims/betty-lou-jensen.jpg',
    source: 'Archivos escolares vía San Francisco Chronicle',
    downloadFrom: 'https://www.sfchronicle.com/ - Fotos de anuario escolar'
  },

  // ══════════════════════════════════════════════════════════════════
  // CASOS ITALIA / VATICANO
  // ══════════════════════════════════════════════════════════════════

  // --- EMANUELA ORLANDI (1983) ---
  'Emanuela Orlandi': {
    url: '/images/victims/emanuela-orlandi.jpg',
    source: 'Familia Orlandi vía La Repubblica',
    downloadFrom: 'https://www.repubblica.it/ - Foto escolar clásica'
  },

  // ══════════════════════════════════════════════════════════════════
  // VÍCTIMAS TED BUNDY (selección)
  // ══════════════════════════════════════════════════════════════════

  'Lynda Ann Healy': {
    url: '/images/victims/lynda-ann-healy.jpg',
    source: 'University of Washington Archives / Seattle Times',
    downloadFrom: 'Archivos de University of Washington o Seattle Times'
  },
  'Lisa Levy': {
    url: '/images/victims/lisa-levy.jpg',
    source: 'Florida State University / Tallahassee Democrat',
    downloadFrom: 'Archivos de Florida State University'
  },

  // ══════════════════════════════════════════════════════════════════
  // JACK THE RIPPER (1888) - SIN FOTOS EN VIDA
  // ══════════════════════════════════════════════════════════════════
  // NOTA: No existen fotografías de estas víctimas en vida.
  // Solo existen imágenes post-mortem que NO deben usarse.
  // Opción: Usar ilustraciones de época o dejar sin imagen.

  'Mary Ann Nichols': {
    url: null,
    source: 'No existen fotografías en vida - Solo ilustraciones de época disponibles'
  },
  'Annie Chapman': {
    url: null,
    source: 'No existen fotografías en vida'
  },
  'Elizabeth Stride': {
    url: null,
    source: 'No existen fotografías en vida'
  },
  'Catherine Eddowes': {
    url: null,
    source: 'No existen fotografías en vida'
  },
  'Mary Jane Kelly': {
    url: null,
    source: 'No existen fotografías en vida - Existe una foto dudosa sin verificar'
  },
}

async function updateVictimImages() {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  ACTUALIZANDO IMÁGENES DE VÍCTIMAS - Casos Reales')
  console.log('═══════════════════════════════════════════════════════════════\n')

  let updated = 0
  let notFound = 0
  let noImage = 0
  const downloadList: string[] = []

  for (const [fullName, data] of Object.entries(victimImages)) {
    // Buscar víctima por nombre (exacto o parcial)
    const result = await prisma.victim.updateMany({
      where: {
        OR: [
          { fullName },
          { fullName: { contains: fullName.split(' ')[0] } }
        ]
      },
      data: {
        imageUrl: data.url,
        imageSource: data.source
      }
    })

    if (result.count > 0) {
      if (data.url) {
        console.log(`✓ ${fullName}`)
        console.log(`  URL: ${data.url}`)
        console.log(`  Fuente: ${data.source}`)
        updated++

        // Agregar a lista de descarga si tiene instrucciones
        if (data.downloadFrom) {
          downloadList.push(`\n📷 ${fullName}\n   ${data.downloadFrom}\n   Guardar como: ${data.url}`)
        }
      } else {
        console.log(`⚠ ${fullName} - Sin imagen disponible`)
        console.log(`  Nota: ${data.source}`)
        noImage++
      }
    } else {
      console.log(`✗ No encontrada en BD: ${fullName}`)
      notFound++
    }
  }

  // Resumen
  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log('  RESUMEN')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`✓ Víctimas actualizadas: ${updated}`)
  console.log(`⚠ Sin imagen disponible: ${noImage}`)
  console.log(`✗ No encontradas en BD:  ${notFound}`)

  // Mostrar lista de descargas pendientes
  if (downloadList.length > 0) {
    console.log('\n═══════════════════════════════════════════════════════════════')
    console.log('  IMÁGENES PENDIENTES DE DESCARGA MANUAL')
    console.log('═══════════════════════════════════════════════════════════════')
    console.log('\nDebes descargar las siguientes imágenes y guardarlas en:')
    console.log('public/images/victims/\n')
    downloadList.forEach(item => console.log(item))
  }

  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log('  SIGUIENTE PASO')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`
1. Descarga las imágenes de las fuentes indicadas arriba
2. Guárdalas en: public/images/victims/
3. Usa los nombres de archivo indicados
4. Reinicia el servidor de desarrollo

Carpeta de imágenes: casos-reales/public/images/victims/
  `)
}

// Función auxiliar para generar guía de descarga
async function generateDownloadGuide() {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  GUÍA DE DESCARGA DE IMÁGENES')
  console.log('═══════════════════════════════════════════════════════════════\n')

  for (const [fullName, data] of Object.entries(victimImages)) {
    if (data.url && data.downloadFrom) {
      console.log(`📷 ${fullName}`)
      console.log(`   Fuente: ${data.source}`)
      console.log(`   Descargar de: ${data.downloadFrom}`)
      console.log(`   Guardar como: public${data.url}`)
      console.log('')
    }
  }
}

// Ejecutar actualización
const args = process.argv.slice(2)
if (args.includes('--guide')) {
  generateDownloadGuide()
    .catch(console.error)
    .finally(() => process.exit(0))
} else {
  updateVictimImages()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
