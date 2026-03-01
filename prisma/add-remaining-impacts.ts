import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Añadiendo datos de impacto a casos restantes...\n')

  // ==========================================
  // CECILIA CUBAS (Paraguay)
  // ==========================================
  const ceciliaCubas = await prisma.case.findUnique({ where: { slug: 'cecilia-cubas' } })
  if (ceciliaCubas) {
    await prisma.caseImpact.create({
      data: {
        caseId: ceciliaCubas.id,
        legislationName: 'Reformas de Seguridad Nacional',
        legislationYear: 2005,
        legislationDesc: 'El caso impulsó reformas en las políticas de seguridad nacional de Paraguay y mayor atención a grupos guerrilleros.',
        communityImpact: 'El secuestro y asesinato de Cecilia generó un profundo impacto en la sociedad paraguaya, exponiendo la presencia de grupos armados y la vulnerabilidad de la seguridad ciudadana.',
        awarenessEffect: 'Creó conciencia sobre la existencia del EPP (Ejército del Pueblo Paraguayo) y la necesidad de combatir la guerrilla.',
        proceduralChanges: 'Fortalecimiento de unidades antiterroristas y mejoras en protocolos de negociación de secuestros.'
      }
    })
    console.log('✅ Cecilia Cubas')
  }

  // ==========================================
  // JUNKO FURUTA (Japón)
  // ==========================================
  const junkoFuruta = await prisma.case.findUnique({ where: { slug: 'junko-furuta' } })
  if (junkoFuruta) {
    await prisma.caseImpact.create({
      data: {
        caseId: junkoFuruta.id,
        legislationName: 'Debate sobre Ley de Menores',
        legislationDesc: 'El caso generó un intenso debate sobre la Ley de Menores japonesa y las sentencias para crímenes cometidos por jóvenes.',
        communityImpact: 'El caso expuso fallas graves en el sistema de justicia juvenil japonés. La indignación pública por las sentencias leves llevó a llamados de reforma.',
        awarenessEffect: 'Se convirtió en símbolo de la necesidad de reformar las leyes de protección a víctimas y el tratamiento de delincuentes juveniles.',
        proceduralChanges: 'Aunque las reformas fueron lentas, el caso contribuyó a discusiones sobre aumentar la edad de responsabilidad penal y endurecer sentencias.',
        mediaAdaptations: JSON.stringify([
          { type: 'Manga', title: '17-sai', year: 2004, description: 'Manga basado en el caso.' },
          { type: 'Película', title: 'Concrete', year: 2004, description: 'Película japonesa basada en el caso.' }
        ])
      }
    })
    console.log('✅ Junko Furuta')
  }

  // ==========================================
  // ASESINATOS DE HWASEONG (Corea del Sur)
  // ==========================================
  const hwaseong = await prisma.case.findUnique({ where: { slug: 'asesino-hwaseong' } })
  if (hwaseong) {
    await prisma.caseImpact.create({
      data: {
        caseId: hwaseong.id,
        legislationName: 'Eliminación de prescripción para asesinatos',
        legislationYear: 2015,
        legislationDesc: 'El caso fue clave para eliminar el estatuto de limitaciones para delitos de asesinato en Corea del Sur.',
        communityImpact: 'El caso más famoso de Corea del Sur, generó debates sobre la efectividad policial y la necesidad de modernizar técnicas de investigación.',
        awarenessEffect: 'Impulsó la adopción de técnicas modernas de ADN y bases de datos genéticas en Corea del Sur.',
        proceduralChanges: 'Modernización de técnicas forenses, creación de bases de datos de ADN, reforma en procedimientos de investigación de homicidios.',
        mediaAdaptations: JSON.stringify([
          { type: 'Película', title: 'Memories of Murder (살인의 추억)', year: 2003, description: 'Obra maestra de Bong Joon-ho, considerada una de las mejores películas coreanas.' },
          { type: 'Serie', title: 'Signal', year: 2016, description: 'Serie de TV inspirada en el caso.' },
          { type: 'Documental', title: 'The Raincoat Killer', year: 2021, description: 'Documental de Netflix sobre el caso.' }
        ])
      }
    })
    console.log('✅ Asesinatos de Hwaseong')
  }

  // ==========================================
  // NIÑO DEL BUZÓN (España)
  // ==========================================
  const ninoBuzon = await prisma.case.findUnique({ where: { slug: 'nino-buzon-almeria' } })
  if (ninoBuzon) {
    await prisma.caseImpact.create({
      data: {
        caseId: ninoBuzon.id,
        communityImpact: 'El caso conmocionó a Almería y a toda España. La imposibilidad de identificar al niño añadió un elemento de misterio y tristeza.',
        awarenessEffect: 'Generó conciencia sobre menores no acompañados y posibles redes de tráfico de personas en la zona del Mediterráneo.',
        proceduralChanges: 'Impulsó mejoras en la coordinación internacional para identificación de menores desaparecidos.'
      }
    })
    console.log('✅ Niño del Buzón')
  }

  // ==========================================
  // AMY MIHALJEVIC (USA)
  // ==========================================
  const amy = await prisma.case.findUnique({ where: { slug: 'amy-mihaljevic' } })
  if (amy) {
    await prisma.caseImpact.create({
      data: {
        caseId: amy.id,
        foundationName: 'Amy Mihaljevic Memorial Fund',
        foundationDesc: 'Fondo creado en memoria de Amy para apoyar programas de seguridad infantil.',
        communityImpact: 'El caso transformó a Bay Village, Ohio, y generó uno de los esfuerzos comunitarios más grandes para resolver un crimen.',
        awarenessEffect: 'Se convirtió en símbolo de la importancia de enseñar a los niños sobre la seguridad con extraños.',
        proceduralChanges: 'El caso impulsó programas de seguridad infantil en escuelas de Ohio.',
        mediaAdaptations: JSON.stringify([
          { type: 'Libro', title: 'Amy: My Search for Her Killer', year: 2006, description: 'Libro del periodista James Renner investigando el caso.' },
          { type: 'Podcast', title: 'Amy Should Be Forty', year: 2016, description: 'Podcast dedicado a resolver el caso.' }
        ])
      }
    })
    console.log('✅ Amy Mihaljevic')
  }

  // ==========================================
  // CHANDRA LEVY (USA)
  // ==========================================
  const chandra = await prisma.case.findUnique({ where: { slug: 'chandra-levy' } })
  if (chandra) {
    await prisma.caseImpact.create({
      data: {
        caseId: chandra.id,
        communityImpact: 'El caso tuvo enormes implicaciones políticas, involucrando a un congresista en el escándalo. Dominó los titulares hasta el 11 de septiembre de 2001.',
        awarenessEffect: 'Expuso las vulnerabilidades de seguridad en Washington D.C. y generó debates sobre la seguridad en parques públicos.',
        proceduralChanges: 'Mejoras en la seguridad del Rock Creek Park y protocolos de búsqueda de personas desaparecidas en D.C.',
        mediaAdaptations: JSON.stringify([
          { type: 'Libro', title: 'Finding Chandra', year: 2010, description: 'Libro sobre la investigación del caso.' },
          { type: 'Documental', title: 'Chandra Levy: An American Murder Mystery', year: 2017, description: 'Serie documental de Investigation Discovery.' }
        ])
      }
    })
    console.log('✅ Chandra Levy')
  }

  // ==========================================
  // EMANUELA ORLANDI (Vaticano/Italia)
  // ==========================================
  const emanuela = await prisma.case.findUnique({ where: { slug: 'emanuela-orlandi' } })
  if (emanuela) {
    await prisma.caseImpact.create({
      data: {
        caseId: emanuela.id,
        communityImpact: 'El caso ha generado décadas de especulación sobre la implicación del Vaticano, la mafia y servicios secretos. Es uno de los misterios más grandes de Italia.',
        awarenessEffect: 'Ha mantenido la atención sobre la transparencia del Vaticano y casos de personas desaparecidas relacionados con la Iglesia.',
        proceduralChanges: 'En 2023, el Vaticano abrió una investigación oficial, décadas después de la desaparición.',
        mediaAdaptations: JSON.stringify([
          { type: 'Documental', title: 'Vatican Girl', year: 2022, description: 'Serie documental de Netflix que investiga el caso.' },
          { type: 'Libro', title: 'Vaticano Girl', year: 2023, description: 'Múltiples libros han explorado las teorías del caso.' }
        ])
      }
    })
    console.log('✅ Emanuela Orlandi')
  }

  // ==========================================
  // YÉREMI VARGAS (España)
  // ==========================================
  const yeremi = await prisma.case.findUnique({ where: { slug: 'yeremi-vargas' } })
  if (yeremi) {
    await prisma.caseImpact.create({
      data: {
        caseId: yeremi.id,
        communityImpact: 'El caso conmocionó a Canarias y a toda España. La familia ha mantenido viva la búsqueda durante años.',
        awarenessEffect: 'Generó debates sobre la seguridad infantil en urbanizaciones y la necesidad de sistemas de alerta temprana.',
        proceduralChanges: 'Contribuyó a mejorar los protocolos de búsqueda de menores desaparecidos en España.',
        foundationDesc: 'La familia ha trabajado incansablemente para mantener el caso en la atención pública.'
      }
    })
    console.log('✅ Yéremi Vargas')
  }

  // ==========================================
  // TAMMY LYNN LEPPERT (USA)
  // ==========================================
  const tammy = await prisma.case.findUnique({ where: { slug: 'tammy-lynn-leppert' } })
  if (tammy) {
    await prisma.caseImpact.create({
      data: {
        caseId: tammy.id,
        communityImpact: 'El caso de la joven actriz y modelo desaparecida generó especulación sobre los peligros de la industria del entretenimiento.',
        awarenessEffect: 'Creó conciencia sobre la vulnerabilidad de jóvenes en la industria del espectáculo.',
        mediaAdaptations: JSON.stringify([
          { type: 'Documental', title: 'Unsolved Mysteries', year: 1989, description: 'Episodio dedicado a su desaparición.' }
        ])
      }
    })
    console.log('✅ Tammy Lynn Leppert')
  }

  // ==========================================
  // ORIEL BRIANT (Argentina)
  // ==========================================
  const oriel = await prisma.case.findUnique({ where: { slug: 'oriel-briant' } })
  if (oriel) {
    await prisma.caseImpact.create({
      data: {
        caseId: oriel.id,
        communityImpact: 'El caso conmocionó a la comunidad argentina y generó debates sobre la seguridad de mujeres jóvenes.',
        awarenessEffect: 'Contribuyó a la concientización sobre femicidios en Argentina.',
        proceduralChanges: 'Formó parte del movimiento que llevó a reformas en la tipificación de femicidios en Argentina.'
      }
    })
    console.log('✅ Oriel Briant')
  }

  // ==========================================
  // SOLANGE GRABENHEIMER (Argentina)
  // ==========================================
  const solange = await prisma.case.findUnique({ where: { slug: 'solange-grabenheimer' } })
  if (solange) {
    await prisma.caseImpact.create({
      data: {
        caseId: solange.id,
        communityImpact: 'El caso generó indignación por la brutalidad del crimen y la juventud de la víctima.',
        awarenessEffect: 'Contribuyó a los debates sobre seguridad y violencia contra mujeres en Argentina.',
        proceduralChanges: 'El caso fue parte del impulso para endurecer penas en crímenes contra mujeres.'
      }
    })
    console.log('✅ Solange Grabenheimer')
  }

  console.log('\n¡Todos los datos de impacto han sido añadidos!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
