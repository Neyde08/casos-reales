import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('=== Verificando acentos en la base de datos ===\n')

  // Buscar palabras con acentos correctos
  const todosLosCasos = await prisma.case.findMany({
    select: { slug: true, content: true, title: true }
  })

  const palabrasConAcento = ['año', 'niño', 'prisión', 'víctima', 'policía', 'día', 'después', 'cárcel', 'psicología']
  const palabrasSinAcento = ['ano ', 'nino', 'prision', 'victima', 'policia', ' dia ', 'despues', 'carcel', 'psicologia']

  console.log('✓ Buscando palabras CON acento (correcto):')
  todosLosCasos.forEach(c => {
    palabrasConAcento.forEach(p => {
      if (c.content?.toLowerCase().includes(p.toLowerCase())) {
        console.log(`  ✓ "${p}" encontrado en ${c.slug}`)
      }
    })
  })

  console.log('\n✗ Buscando palabras SIN acento (incorrecto):')
  let errores = 0
  todosLosCasos.forEach(c => {
    palabrasSinAcento.forEach(p => {
      if (c.content?.toLowerCase().includes(p)) {
        const idx = c.content.toLowerCase().indexOf(p)
        console.log(`  ✗ "${p.trim()}" (sin acento) en ${c.slug}: "...${c.content.substring(Math.max(0, idx-10), idx+20)}..."`)
        errores++
      }
    })
  })

  if (errores === 0) {
    console.log('  ¡Ninguna palabra sin acento encontrada! ✓')
  }

  console.log('\n=== Ted Bundy - Muestra de contenido ===')
  const bundy = await prisma.case.findFirst({ where: { slug: 'ted-bundy' } })
  console.log('Título:', bundy?.title)
  console.log('\nPrimeros 500 caracteres del contenido:')
  console.log(bundy?.content?.substring(0, 500))
}

main()
  .finally(() => prisma.$disconnect())
