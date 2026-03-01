import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Mapa de correcciones ortográficas
const corrections: Record<string, string> = {
  'nina': 'niña',
  'nino': 'niño',
  'ninos': 'niños',
  'ninas': 'niñas',
  'anos': 'años',
  'ano': 'año',
  'manana': 'mañana',
  'espana': 'España',
  'companero': 'compañero',
  'companera': 'compañera',
  'companeros': 'compañeros',
  'pequeno': 'pequeño',
  'pequena': 'pequeña',
  'sueno': 'sueño',
  'suenos': 'sueños',
  'sonaba': 'soñaba',
  'ensenanza': 'enseñanza',
  'montana': 'montaña',
  'banera': 'bañera',
  'bano': 'baño',
  'danino': 'dañino',
  'dano': 'daño',
  'vinculo': 'vínculo',
  'victima': 'víctima',
  'victimas': 'víctimas',
  'musica': 'música',
  'numero': 'número',
  'pagina': 'página',
  'familia': 'familia',
  'policia': 'policía',
  'investigacion': 'investigación',
  'informacion': 'información',
  'educacion': 'educación',
  'habitacion': 'habitación',
  'desaparicion': 'desaparición',
  'organizacion': 'organización',
  'fundacion': 'fundación',
  'atencion': 'atención',
  'relacion': 'relación',
  'accion': 'acción',
  'seccion': 'sección',
  'television': 'televisión',
  'prision': 'prisión',
  'version': 'versión',
  'confesion': 'confesión',
  'presion': 'presión',
  'profesion': 'profesión',
  'pasion': 'pasión',
  'icion ': 'ición ',
  'mas ': 'más ',
  ' mas': ' más',
  'tambien': 'también',
  'habia': 'había',
  'tenia': 'tenía',
  'sabia': 'sabía',
  'queria': 'quería',
  'podia': 'podía',
  'vivia': 'vivía',
  'oia': 'oía',
  'veia': 'veía',
  'creia': 'creía',
  'seria': 'sería',
  'estaria': 'estaría',
  'tendria': 'tendría',
  'podria': 'podría',
  'deberia': 'debería',
  'haria': 'haría',
  'daria': 'daría',
  'gustaria': 'gustaría',
  'llamaria': 'llamaría',
  'dia ': 'día ',
  ' dia': ' día',
  'dias': 'días',
  'todavia': 'todavía',
  'ahi': 'ahí',
  'aqui': 'aquí',
  'asi': 'así',
  'despues': 'después',
  'traves': 'través',
  'atras': 'atrás',
  'jamas': 'jamás',
  'ademas': 'además',
  'detras': 'detrás',
  'quizas': 'quizás',
  'ultimo': 'último',
  'ultima': 'última',
  'unico': 'único',
  'unica': 'única',
  'publico': 'público',
  'publica': 'pública',
  'tragico': 'trágico',
  'tragica': 'trágica',
  'tipico': 'típico',
  'tipica': 'típica',
  'historico': 'histórico',
  'historica': 'histórica',
  'economico': 'económico',
  'economica': 'económica',
  'automatico': 'automático',
  'domestico': 'doméstico',
  'artistico': 'artístico',
  'romantico': 'romántico',
  'dramatico': 'dramático',
  'energetico': 'energético',
  'telefono': 'teléfono',
  'exito': 'éxito',
  'facil': 'fácil',
  'dificil': 'difícil',
  'util': 'útil',
  'debil': 'débil',
  'angel': 'ángel',
  'arbol': 'árbol',
  'carcel': 'cárcel',
  'lapiz': 'lápiz',
  'Lopez': 'López',
  'Gonzalez': 'González',
  'Martinez': 'Martínez',
  'Rodriguez': 'Rodríguez',
  'Hernandez': 'Hernández',
  'Fernandez': 'Fernández',
  'Sanchez': 'Sánchez',
  'Ramirez': 'Ramírez',
  'Jimenez': 'Jiménez',
  'Gutierrez': 'Gutiérrez',
  'Diaz': 'Díaz',
  'Perez': 'Pérez',
  'Gomez': 'Gómez',
  'Ruiz': 'Ruíz',
  'Alvarez': 'Álvarez',
  'Garcia': 'García',
  'Muñoz': 'Muñoz',
  'esta ': 'está ',
  ' esta': ' está',
  'estaba': 'estaba',
  'segun': 'según',
  'ingles': 'inglés',
  'frances': 'francés',
  'portugues': 'portugués',
  'japones': 'japonés',
  'coreano': 'coreano',
  'quien': 'quién',
  'cual': 'cuál',
  'cuales': 'cuáles',
  'donde': 'dónde',
  'cuando': 'cuándo',
  'como ': 'cómo ',
  'porque ': 'porqué ',
  ' el ': ' él ',
  ' mi ': ' mí ',
  ' tu ': ' tú ',
  ' si ': ' sí ',
  ' solo ': ' sólo ',
}

function fixText(text: string | null): string | null {
  if (!text) return text

  let fixed = text

  // Aplicar correcciones
  for (const [wrong, correct] of Object.entries(corrections)) {
    // Case insensitive replacement que preserva el caso original
    const regex = new RegExp(wrong, 'gi')
    fixed = fixed.replace(regex, (match) => {
      // Si el original estaba en mayúsculas, mantener mayúsculas
      if (match === match.toUpperCase()) {
        return correct.toUpperCase()
      }
      // Si empezaba con mayúscula, mantenerla
      if (match[0] === match[0].toUpperCase()) {
        return correct.charAt(0).toUpperCase() + correct.slice(1)
      }
      return correct
    })
  }

  return fixed
}

async function main() {
  console.log('Corrigiendo ortografía en la base de datos...\n')

  // Corregir casos
  const cases = await prisma.case.findMany()
  let casesFixed = 0

  for (const caso of cases) {
    const updates: any = {}
    let needsUpdate = false

    const fieldsToCheck = ['title', 'summary', 'content', 'city', 'country']

    for (const field of fieldsToCheck) {
      const original = (caso as any)[field]
      const fixed = fixText(original)
      if (fixed !== original) {
        updates[field] = fixed
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      await prisma.case.update({
        where: { id: caso.id },
        data: updates
      })
      casesFixed++
      console.log(`📝 Caso corregido: ${caso.title}`)
    }
  }

  // Corregir víctimas
  const victims = await prisma.victim.findMany()
  let victimsFixed = 0

  for (const victim of victims) {
    const updates: any = {}
    let needsUpdate = false

    const fieldsToCheck = [
      'fullName', 'personality', 'hobbies', 'dreams', 'talents',
      'familyBackground', 'education', 'occupation', 'lifeSummary',
      'biography', 'legacy', 'birthPlace', 'lastSeenPlace', 'lastSeenDetails'
    ]

    for (const field of fieldsToCheck) {
      const original = (victim as any)[field]
      const fixed = fixText(original)
      if (fixed !== original) {
        updates[field] = fixed
        needsUpdate = true
      }
    }

    // También corregir JSON fields
    if (victim.familyQuotes) {
      const fixed = fixText(victim.familyQuotes)
      if (fixed !== victim.familyQuotes) {
        updates.familyQuotes = fixed
        needsUpdate = true
      }
    }

    if (victim.friendsQuotes) {
      const fixed = fixText(victim.friendsQuotes)
      if (fixed !== victim.friendsQuotes) {
        updates.friendsQuotes = fixed
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      await prisma.victim.update({
        where: { id: victim.id },
        data: updates
      })
      victimsFixed++
      console.log(`📝 Víctima corregida: ${victim.fullName}`)
    }
  }

  // Corregir impactos
  const impacts = await prisma.caseImpact.findMany()
  let impactsFixed = 0

  for (const impact of impacts) {
    const updates: any = {}
    let needsUpdate = false

    const fieldsToCheck = [
      'legislationName', 'legislationDesc', 'foundationName', 'foundationDesc',
      'communityImpact', 'awarenessEffect', 'proceduralChanges', 'mediaAdaptations'
    ]

    for (const field of fieldsToCheck) {
      const original = (impact as any)[field]
      const fixed = fixText(original)
      if (fixed !== original) {
        updates[field] = fixed
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      await prisma.caseImpact.update({
        where: { id: impact.id },
        data: updates
      })
      impactsFixed++
    }
  }

  // Corregir eventos de timeline
  const events = await prisma.timelineEvent.findMany()
  let eventsFixed = 0

  for (const event of events) {
    const updates: any = {}
    let needsUpdate = false

    const titleFixed = fixText(event.title)
    const descFixed = fixText(event.description)

    if (titleFixed !== event.title) {
      updates.title = titleFixed
      needsUpdate = true
    }
    if (descFixed !== event.description) {
      updates.description = descFixed
      needsUpdate = true
    }

    if (needsUpdate) {
      await prisma.timelineEvent.update({
        where: { id: event.id },
        data: updates
      })
      eventsFixed++
    }
  }

  console.log(`\n✅ Resumen:`)
  console.log(`   - Casos corregidos: ${casesFixed}`)
  console.log(`   - Víctimas corregidas: ${victimsFixed}`)
  console.log(`   - Impactos corregidos: ${impactsFixed}`)
  console.log(`   - Eventos corregidos: ${eventsFixed}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
