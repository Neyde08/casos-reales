import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Verificar contenido de asesinos seriales donde probablemente está el problema
  const dahmer = await prisma.case.findFirst({
    where: { slug: 'jeffrey-dahmer' },
    select: {
      title: true,
      content: true,
      suspects: {
        select: { fullName: true, description: true }
      },
      victims: {
        select: { fullName: true, biography: true }
      }
    }
  })

  console.log('=== Jeffrey Dahmer ===')
  console.log('Título:', dahmer?.title)
  console.log('\nContenido (primeros 500 chars):')
  console.log(dahmer?.content?.substring(0, 500))

  // Buscar palabras con ñ y acentos en todo el contenido
  const todosLosCasos = await prisma.case.findMany({
    select: { slug: true, content: true }
  })

  console.log('\n=== Buscando palabras problemáticas ===')
  const palabras = ['año', 'niño', 'prisión', 'víctima', 'canónica', 'España']

  todosLosCasos.forEach(c => {
    const content = c.content || ''
    palabras.forEach(p => {
      if (content.toLowerCase().includes(p.toLowerCase())) {
        console.log(`✓ "${p}" encontrado en ${c.slug}`)
      }
    })
  })

  // Buscar versiones sin acento
  const sinAcento = ['ano ', 'nino', 'prision', 'victima', 'canonica']
  console.log('\n=== Buscando versiones SIN acento ===')
  todosLosCasos.forEach(c => {
    const content = c.content || ''
    sinAcento.forEach(p => {
      if (content.toLowerCase().includes(p)) {
        const idx = content.toLowerCase().indexOf(p)
        console.log(`✗ "${p}" (sin acento) en ${c.slug}: "...${content.substring(idx-10, idx+20)}..."`)
      }
    })
  })
}

main()
  .finally(() => prisma.$disconnect())
