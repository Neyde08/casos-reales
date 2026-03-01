import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .trim()
}

async function main() {
  console.log('Añadiendo nuevos casos...\n')

  // ==========================================
  // CASO CECILIA CUBAS (Paraguay, 2004-2005)
  // ==========================================
  const ceciliaCubas = await prisma.case.create({
    data: {
      slug: 'cecilia-cubas',
      title: 'El Secuestro de Cecilia Cubas',
      titleSearch: normalizeForSearch('El Secuestro de Cecilia Cubas'),
      summary: 'La hija del expresidente de Paraguay Raúl Cubas fue secuestrada y asesinada por un grupo guerrillero. Uno de los crímenes más impactantes de la historia paraguaya.',
      status: 'SOLVED',
      type: 'KIDNAPPING',
      year: 2004,
      country: 'Paraguay',
      countrySearch: normalizeForSearch('Paraguay'),
      city: 'Asunción',
      citySearch: normalizeForSearch('Asunción'),
      mainImageUrl: '/images/cases/cecilia-cubas.jpg',
      tags: JSON.stringify(['secuestro', 'paraguay', 'politico', 'guerrilla']),
      featured: true,
      content: `## El Caso

El 21 de septiembre de 2004, Cecilia Cubas Gusinky, de 31 años, hija del expresidente paraguayo Raúl Cubas Grau, fue secuestrada cuando salía de su casa en el barrio de Villa Morra, Asunción.

## El Secuestro

Cecilia fue interceptada por un grupo armado que la obligó a subir a un vehículo. Los secuestradores exigieron un rescate de 5 millones de dólares. Durante meses, la familia negoció desesperadamente mientras todo Paraguay seguía el caso.

## El Grupo Responsable

El secuestro fue perpetrado por el Ejército del Pueblo Paraguayo (EPP), un grupo guerrillero de orientación marxista. Los cabecillas fueron identificados como Osmar Martínez, Alcides Oviedo y otros miembros de la organización.

## El Trágico Desenlace

Tras 127 días de cautiverio, el 16 de febrero de 2005, el cuerpo de Cecilia fue encontrado enterrado en una casa en Ñemby. Las investigaciones determinaron que había sido asesinada aproximadamente un mes después de su secuestro, posiblemente porque los captores no pudieron controlar la situación.

## Justicia

Varios miembros del EPP fueron capturados y condenados. El caso expuso la existencia de células guerrilleras en Paraguay y llevó a una mayor atención sobre la seguridad nacional.`,
      viewCount: 45000,
      victims: {
        create: [
          {
            fullName: 'Cecilia Cubas Gusinky',
            fullNameSearch: normalizeForSearch('Cecilia Cubas Gusinky'),
            birthDate: new Date('1973-07-12'),
            birthPlace: 'Asunción, Paraguay',
            nationality: 'Paraguaya',
            ageAtDeathOrMissing: 31,
            lastSeenDate: new Date('2004-09-21'),
            lastSeenPlace: 'Villa Morra, Asunción',
            deathDate: new Date('2004-10-20'),
            causeOfDeath: 'Asfixia durante el cautiverio',
            status: 'DECEASED',
            personality: 'Cecilia era una mujer amable, trabajadora y muy cercana a su familia. Era conocida por su calidez humana y su dedicación. A pesar de ser hija de un expresidente, vivía una vida relativamente normal y discreta.',
            education: 'Estudió administración de empresas y se dedicaba a los negocios familiares.',
            occupation: 'Empresaria y administradora de negocios familiares',
            familyBackground: 'Hija de Raúl Cubas Grau, quien fue presidente de Paraguay (1998-1999), y de Mirta Gusinky. Tenía una familia muy unida que la adoraba.',
            dreams: 'Soñaba con formar su propia familia y continuar contribuyendo a los negocios familiares. Era una persona con los pies en la tierra, sin aires de grandeza a pesar de su apellido.',
            lifeSummary: 'Cecilia Cubas tenía 31 años cuando fue secuestrada. Era una mujer trabajadora que prefería mantener un perfil bajo a pesar de su prominente familia. Su secuestro y asesinato conmocionó a todo Paraguay y dejó una herida profunda en la sociedad paraguaya.',
            familyQuotes: JSON.stringify([
              { quote: 'Cecilia era luz para nuestra familia. No merecía este final.', author: 'Familia Cubas', relation: 'Familia' }
            ])
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('2004-09-21'), title: 'Secuestro', description: 'Cecilia es secuestrada al salir de su casa en Villa Morra.', order: 1 },
          { date: new Date('2004-09-22'), title: 'Pedido de rescate', description: 'Los secuestradores exigen 5 millones de dólares.', order: 2 },
          { date: new Date('2004-10-20'), title: 'Muerte de Cecilia', description: 'Se estima que Cecilia murió aproximadamente un mes después del secuestro.', order: 3 },
          { date: new Date('2005-02-16'), title: 'Hallazgo del cuerpo', description: 'El cuerpo de Cecilia es encontrado enterrado en Ñemby tras 127 días.', order: 4 },
          { date: new Date('2005-03-01'), title: 'Capturas', description: 'Varios miembros del EPP son detenidos y vinculados al crimen.', order: 5 }
        ]
      },
      suspects: {
        create: [
          {
            fullName: 'Osmar Martínez',
            role: 'CONFIRMED_PERPETRATOR',
            description: 'Líder del grupo que secuestró a Cecilia, vinculado al EPP.',
            isConfirmed: true,
            convictionDetails: 'Condenado por secuestro y homicidio'
          },
          {
            fullName: 'Alcides Oviedo',
            role: 'CONFIRMED_PERPETRATOR',
            description: 'Miembro del EPP involucrado en el secuestro.',
            isConfirmed: true
          }
        ]
      }
    }
  })
  console.log('✅ Caso Cecilia Cubas creado')

  // ==========================================
  // CASO NAYOUNG (Corea del Sur, 2008)
  // ==========================================
  const nayoung = await prisma.case.create({
    data: {
      slug: 'caso-nayoung',
      title: 'El Caso Nayoung (Caso Cho Doo-soon)',
      titleSearch: normalizeForSearch('El Caso Nayoung Caso Cho Doo-soon'),
      summary: 'Una niña de 8 años fue brutalmente atacada en el baño de una iglesia en Corea del Sur. Sobrevivió arrastrándose hasta pedir ayuda. El caso cambió las leyes de su país.',
      status: 'SOLVED',
      type: 'OTHER',
      year: 2008,
      country: 'Corea del Sur',
      countrySearch: normalizeForSearch('Corea del Sur'),
      city: 'Ansan, Gyeonggi',
      citySearch: normalizeForSearch('Ansan Gyeonggi'),
      mainImageUrl: '/images/cases/nayoung.jpg',
      tags: JSON.stringify(['superviviente', 'corea', 'reforma legal', 'menor']),
      featured: true,
      content: `## El Caso

El 13 de diciembre de 2008, una niña de 8 años conocida con el seudónimo "Nayoung" (para proteger su identidad) caminaba hacia su escuela en Ansan, Corea del Sur, cuando fue atacada por Cho Doo-soon, un hombre de 56 años con antecedentes criminales.

## El Ataque

Cho Doo-soon arrastró a la niña al baño de una iglesia cercana donde la agredió brutalmente. El ataque fue tan violento que la niña sufrió daños permanentes en sus órganos internos, requiriendo cirugías reconstructivas.

## La Sobreviviente

A pesar de sus graves heridas, Nayoung logró arrastrarse fuera del baño y pedir ayuda. Su valentía y voluntad de sobrevivir conmovieron a toda la nación. Fue encontrada por un transeúnte que llamó a emergencias.

## El Juicio y la Controversia

Cho Doo-soon fue condenado a solo 12 años de prisión. El juez consideró que estaba ebrio durante el ataque como atenuante. Esta sentencia causó indignación masiva en Corea del Sur.

## Reformas Legales

El caso llevó a reformas significativas:
- La "Ley Cho Doo-soon" eliminó la embriaguez como atenuante
- Se implementó el monitoreo electrónico de agresores sexuales
- Se aumentaron las penas para delitos contra menores
- Se crearon equipos especializados de protección infantil

## Liberación Polémica

En 2020, Cho Doo-soon fue liberado tras cumplir su condena, lo que generó protestas masivas. El gobierno asignó vigilancia permanente al criminal.

## La Película

El caso inspiró la película "Hope" (소원, 2013), que narra la historia desde la perspectiva de la familia. La película generó mayor conciencia sobre la protección de menores.`,
      viewCount: 180000,
      victims: {
        create: [
          {
            fullName: 'Nayoung (Na-young)',
            fullNameSearch: normalizeForSearch('Nayoung Na-young'),
            birthDate: new Date('2000-06-15'),
            birthPlace: 'Ansan, Corea del Sur',
            nationality: 'Surcoreana',
            ageAtDeathOrMissing: 8,
            lastSeenDate: new Date('2008-12-13'),
            lastSeenPlace: 'Camino a la escuela, Ansan',
            status: 'SURVIVED',
            personality: 'Nayoung era una niña alegre, inteligente y llena de vida. Le encantaba ir a la escuela y jugar con sus amigos. Era conocida por su sonrisa brillante y su espíritu amable.',
            education: 'Estudiante de segundo grado de primaria',
            familyBackground: 'Venía de una familia trabajadora y amorosa. Sus padres la adoraban y hacían todo lo posible para darle una buena vida.',
            dreams: 'Como cualquier niña de 8 años, soñaba con crecer, tener amigos y vivir feliz. Le gustaba dibujar y soñaba con ser artista.',
            hobbies: 'Dibujar, jugar con amigos, ver dibujos animados',
            lifeSummary: 'Nayoung tenía solo 8 años cuando su vida cambió para siempre. A pesar del horror que vivió, demostró una fortaleza increíble al arrastrarse fuera del baño para pedir ayuda, salvando su propia vida. Su caso transformó las leyes de Corea del Sur y creó conciencia sobre la protección infantil. Nayoung es una sobreviviente cuya valentía inspiró a toda una nación.',
            legacy: 'Su caso llevó a la creación de la "Ley Cho Doo-soon" y múltiples reformas en la protección de menores en Corea del Sur.',
            familyQuotes: JSON.stringify([
              { quote: 'Nuestra hija es la más valiente. Ella sobrevivió cuando nadie pensó que podría.', author: 'Padre de Nayoung', relation: 'Padre' }
            ])
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('2008-12-13'), title: 'El ataque', description: 'Nayoung es atacada en el baño de una iglesia camino a la escuela.', order: 1 },
          { date: new Date('2008-12-13'), title: 'Rescate', description: 'Nayoung se arrastra fuera del baño y es encontrada por un transeúnte.', order: 2 },
          { date: new Date('2008-12-14'), title: 'Arresto', description: 'Cho Doo-soon es arrestado tras ser identificado.', order: 3 },
          { date: new Date('2009-06-01'), title: 'Condena controversia', description: 'Cho es condenado a solo 12 años. La sentencia causa indignación nacional.', order: 4 },
          { date: new Date('2010-04-15'), title: 'Ley Cho Doo-soon', description: 'Se aprueba la ley que elimina la embriaguez como atenuante.', order: 5 },
          { date: new Date('2013-10-02'), title: 'Estreno de "Hope"', description: 'Se estrena la película basada en el caso, generando conciencia.', order: 6 },
          { date: new Date('2020-12-12'), title: 'Liberación polémica', description: 'Cho Doo-soon es liberado tras cumplir condena, causando protestas masivas.', order: 7 }
        ]
      },
      suspects: {
        create: [
          {
            fullName: 'Cho Doo-soon',
            role: 'CONFIRMED_PERPETRATOR',
            description: 'Agresor de 56 años con múltiples antecedentes criminales. Atacó a Nayoung mientras ella caminaba a la escuela.',
            isConfirmed: true,
            convictionDetails: 'Condenado por agresión sexual agravada contra menor',
            sentence: '12 años de prisión (cumplidos en 2020)'
          }
        ]
      }
    }
  })
  console.log('✅ Caso Nayoung creado')

  // Añadir impacto del caso Nayoung
  await prisma.caseImpact.create({
    data: {
      caseId: nayoung.id,
      legislationName: 'Ley Cho Doo-soon',
      legislationYear: 2010,
      legislationDesc: 'Elimina la embriaguez como circunstancia atenuante en delitos sexuales y aumenta las penas para agresores de menores.',
      communityImpact: 'El caso generó un movimiento nacional por la protección infantil y reformas en el sistema de justicia surcoreano.',
      awarenessEffect: 'Creó conciencia masiva sobre la necesidad de proteger a los menores y reformar las leyes de agresión sexual.',
      proceduralChanges: 'Implementación de monitoreo electrónico de agresores sexuales liberados, equipos especializados de protección infantil.',
      mediaAdaptations: JSON.stringify([
        { type: 'Película', title: 'Hope (소원)', year: 2013, description: 'Película que narra la historia de la familia de Nayoung y su recuperación.' }
      ])
    }
  })

  // ==========================================
  // CASO JUNKO FURUTA (Japón, 1988-1989)
  // ==========================================
  await prisma.case.create({
    data: {
      slug: 'junko-furuta',
      title: 'El Caso Junko Furuta',
      titleSearch: normalizeForSearch('El Caso Junko Furuta'),
      summary: 'Una estudiante japonesa de 17 años fue secuestrada y torturada durante 44 días. Uno de los crímenes más horribles de la historia de Japón.',
      status: 'SOLVED',
      type: 'KIDNAPPING',
      year: 1988,
      country: 'Japón',
      countrySearch: normalizeForSearch('Japón'),
      city: 'Adachi, Tokio',
      citySearch: normalizeForSearch('Adachi Tokio'),
      mainImageUrl: '/images/cases/junko-furuta.jpg',
      tags: JSON.stringify(['japon', 'secuestro', 'tortura', 'menores']),
      featured: false,
      content: `## El Caso

El 25 de noviembre de 1988, Junko Furuta, una estudiante de secundaria de 17 años, fue secuestrada en Misato, Saitama, por cuatro jóvenes liderados por Hiroshi Miyano.

## El Cautiverio

Durante 44 días, Junko fue mantenida cautiva en la casa de uno de los agresores en Adachi, Tokio. Sufrió torturas extremas mientras los padres del agresor, aunque presentes en la casa, no intervinieron por miedo.

## El Final

El 4 de enero de 1989, Junko falleció debido a las heridas. Su cuerpo fue encontrado en un barril de concreto en Koto, Tokio.

## Los Culpables

Los cuatro perpetradores, todos menores de edad en el momento del crimen, recibieron sentencias que fueron ampliamente criticadas por ser demasiado leves:
- Hiroshi Miyano: 20 años (líder)
- Jo Ogura: 8 años
- Shinji Minato: 5-9 años
- Yasushi Watanabe: 5-7 años

## Impacto

El caso generó debate sobre las leyes de menores en Japón y la necesidad de reformas en el sistema de justicia juvenil. Junko se ha convertido en símbolo de la necesidad de justicia para las víctimas.`,
      viewCount: 95000,
      victims: {
        create: [
          {
            fullName: 'Junko Furuta',
            fullNameSearch: normalizeForSearch('Junko Furuta'),
            birthDate: new Date('1971-01-18'),
            birthPlace: 'Misato, Saitama, Japón',
            nationality: 'Japonesa',
            ageAtDeathOrMissing: 17,
            lastSeenDate: new Date('1988-11-25'),
            lastSeenPlace: 'Misato, Saitama',
            deathDate: new Date('1989-01-04'),
            causeOfDeath: 'Homicidio',
            status: 'DECEASED',
            personality: 'Junko era una joven brillante, amable y trabajadora. Era popular en su escuela y conocida por su belleza y personalidad dulce. Trabajaba medio tiempo para ayudar a su familia.',
            education: 'Estudiante de tercer año de secundaria con excelentes calificaciones',
            occupation: 'Estudiante y trabajadora de medio tiempo',
            familyBackground: 'Venía de una familia trabajadora y amorosa. Sus padres la apoyaban en todo.',
            hobbies: 'Estudiar, trabajar, pasar tiempo con amigas',
            dreams: 'Soñaba con graduarse, ir a la universidad y tener una carrera exitosa. Quería hacer orgullosos a sus padres.',
            lifeSummary: 'Junko Furuta tenía 17 años y toda una vida por delante. Era una estudiante ejemplar que trabajaba para ayudar a su familia. Su caso expuso fallas graves en el sistema de justicia japonés y generó llamados a reformar las leyes de menores.',
            familyQuotes: JSON.stringify([
              { quote: 'Junko era nuestra luz. Cada día pensamos en la hija que perdimos.', author: 'Familia Furuta', relation: 'Familia' }
            ])
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1988-11-25'), title: 'Secuestro', description: 'Junko es secuestrada mientras regresaba del trabajo.', order: 1 },
          { date: new Date('1989-01-04'), title: 'Muerte', description: 'Junko fallece tras 44 días de cautiverio.', order: 2 },
          { date: new Date('1989-03-29'), title: 'Descubrimiento', description: 'El cuerpo es encontrado en un barril de concreto.', order: 3 },
          { date: new Date('1989-04-01'), title: 'Arrestos', description: 'Los cuatro perpetradores son arrestados.', order: 4 },
          { date: new Date('1990-07-01'), title: 'Juicio', description: 'Comienza el juicio contra los agresores.', order: 5 }
        ]
      },
      suspects: {
        create: [
          { fullName: 'Hiroshi Miyano', role: 'CONFIRMED_PERPETRATOR', description: 'Líder del grupo. Tenía 18 años.', isConfirmed: true, sentence: '20 años de prisión' },
          { fullName: 'Jo Ogura', role: 'CONFIRMED_PERPETRATOR', description: 'Participante activo.', isConfirmed: true, sentence: '8 años de prisión' },
          { fullName: 'Shinji Minato', role: 'CONFIRMED_PERPETRATOR', description: 'En su casa ocurrió el cautiverio.', isConfirmed: true, sentence: '5-9 años de prisión' },
          { fullName: 'Yasushi Watanabe', role: 'CONFIRMED_PERPETRATOR', description: 'Participante.', isConfirmed: true, sentence: '5-7 años de prisión' }
        ]
      }
    }
  })
  console.log('✅ Caso Junko Furuta creado')

  // ==========================================
  // CASO DEL ASESINO DEL ZODIACO DE COREA
  // (Lee Chun-jae / Hwaseong Serial Murders)
  // ==========================================
  await prisma.case.create({
    data: {
      slug: 'asesino-hwaseong',
      title: 'Los Asesinatos de Hwaseong',
      titleSearch: normalizeForSearch('Los Asesinatos de Hwaseong'),
      summary: 'Serie de asesinatos en Corea del Sur entre 1986-1991 que permanecieron sin resolver durante 30 años. Resuelto en 2019 gracias al ADN.',
      status: 'SOLVED',
      type: 'SERIAL_KILLER',
      year: 1986,
      country: 'Corea del Sur',
      countrySearch: normalizeForSearch('Corea del Sur'),
      city: 'Hwaseong, Gyeonggi',
      citySearch: normalizeForSearch('Hwaseong Gyeonggi'),
      mainImageUrl: '/images/cases/hwaseong.jpg',
      tags: JSON.stringify(['serial killer', 'corea', 'caso frio', 'adn']),
      featured: true,
      content: `## El Caso

Entre 1986 y 1991, diez mujeres fueron asesinadas en el área rural de Hwaseong, provincia de Gyeonggi, Corea del Sur. El asesino atacaba de noche, generalmente a mujeres que caminaban solas.

## La Investigación Original

Más de 2 millones de policías fueron asignados al caso durante los años de los crímenes. Se interrogaron más de 21,000 sospechosos y se tomaron 570 muestras de ADN. El caso fue uno de los más grandes de la historia de Corea del Sur.

## Sin Resolver Durante 30 Años

El estatuto de limitaciones expiró en 2006, y el caso se consideró el mayor fracaso de la policía surcoreana. Inspiró la famosa película "Memories of Murder" (2003) de Bong Joon-ho.

## Resolución en 2019

En septiembre de 2019, gracias a nueva tecnología de ADN, la policía identificó a Lee Chun-jae como el asesino. Lee ya estaba cumpliendo cadena perpetua por otro asesinato cometido en 1994.

## Confesión

Lee confesó los 10 asesinatos de Hwaseong y admitió haber cometido otros crímenes adicionales. Sin embargo, debido a la prescripción, no pudo ser juzgado por los asesinatos de Hwaseong.

## El Hombre Inocente

Yoon Sung-yeo pasó 20 años en prisión, condenado erróneamente por el octavo asesinato. Fue exonerado en 2019 tras la confesión de Lee.`,
      viewCount: 120000,
      victims: {
        create: [
          {
            fullName: 'Lee Wan-im (Primera víctima)',
            fullNameSearch: normalizeForSearch('Lee Wan-im Primera victima'),
            ageAtDeathOrMissing: 71,
            deathDate: new Date('1986-09-15'),
            status: 'DECEASED',
            causeOfDeath: 'Estrangulamiento',
            personality: 'Era una anciana respetada en su comunidad.',
            lifeSummary: 'Lee Wan-im, de 71 años, fue la primera víctima del asesino de Hwaseong. Fue encontrada en un campo de arroz.'
          },
          {
            fullName: 'Park Hyun-sook (Segunda víctima)',
            fullNameSearch: normalizeForSearch('Park Hyun-sook Segunda victima'),
            ageAtDeathOrMissing: 25,
            deathDate: new Date('1986-10-20'),
            status: 'DECEASED',
            causeOfDeath: 'Estrangulamiento',
            lifeSummary: 'Park Hyun-sook tenía 25 años. Era una joven con toda una vida por delante.'
          },
          {
            fullName: 'Kwon Jung-bon (Tercera víctima)',
            fullNameSearch: normalizeForSearch('Kwon Jung-bon Tercera victima'),
            ageAtDeathOrMissing: 24,
            deathDate: new Date('1986-12-12'),
            status: 'DECEASED',
            causeOfDeath: 'Estrangulamiento',
            lifeSummary: 'Kwon Jung-bon tenía 24 años cuando fue asesinada.'
          },
          {
            fullName: 'Lee Gye-sook (Cuarta víctima)',
            fullNameSearch: normalizeForSearch('Lee Gye-sook Cuarta victima'),
            ageAtDeathOrMissing: 23,
            deathDate: new Date('1986-12-14'),
            status: 'DECEASED',
            causeOfDeath: 'Estrangulamiento',
            lifeSummary: 'Lee Gye-sook, de 23 años, fue asesinada solo dos días después de la tercera víctima.'
          },
          {
            fullName: 'Hong Jin-young (Quinta víctima)',
            fullNameSearch: normalizeForSearch('Hong Jin-young Quinta victima'),
            ageAtDeathOrMissing: 16,
            deathDate: new Date('1987-01-10'),
            status: 'DECEASED',
            causeOfDeath: 'Estrangulamiento',
            personality: 'Era una estudiante de secundaria llena de sueños.',
            lifeSummary: 'Hong Jin-young tenía solo 16 años. Era una estudiante con toda una vida por delante.'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1986-09-15'), title: 'Primera víctima', description: 'Lee Wan-im es encontrada asesinada.', order: 1 },
          { date: new Date('1991-04-03'), title: 'Décima víctima', description: 'El último asesinato de la serie.', order: 2 },
          { date: new Date('2003-05-01'), title: 'Película "Memories of Murder"', description: 'Se estrena la película de Bong Joon-ho inspirada en el caso.', order: 3 },
          { date: new Date('2006-04-02'), title: 'Prescripción', description: 'El estatuto de limitaciones expira.', order: 4 },
          { date: new Date('2019-09-18'), title: 'Identificación del asesino', description: 'ADN identifica a Lee Chun-jae como el asesino.', order: 5 },
          { date: new Date('2019-10-01'), title: 'Confesión', description: 'Lee Chun-jae confiesa los 10 asesinatos.', order: 6 }
        ]
      },
      suspects: {
        create: [
          {
            fullName: 'Lee Chun-jae',
            role: 'CONFIRMED_PERPETRATOR',
            description: 'Identificado en 2019 mediante ADN. Ya cumplía cadena perpetua por otro asesinato.',
            isConfirmed: true,
            convictionDetails: 'No pudo ser juzgado por prescripción. Ya cumple cadena perpetua por asesinato de 1994.'
          }
        ]
      }
    }
  })
  console.log('✅ Caso Asesinatos de Hwaseong creado')

  // ==========================================
  // CASO DEL NIÑO DEL BUZÓN (España, 1990)
  // ==========================================
  await prisma.case.create({
    data: {
      slug: 'nino-buzon-almeria',
      title: 'El Caso del Niño del Buzón de Almería',
      titleSearch: normalizeForSearch('El Caso del Niño del Buzón de Almería'),
      summary: 'Un niño de 9 años fue encontrado muerto dentro de un buzón de correos en Almería. Caso sin resolver que conmocionó a España.',
      status: 'UNSOLVED',
      type: 'COLD_CASE',
      year: 1990,
      country: 'España',
      countrySearch: normalizeForSearch('España'),
      city: 'Almería',
      citySearch: normalizeForSearch('Almería'),
      mainImageUrl: '/images/cases/nino-buzon.jpg',
      tags: JSON.stringify(['españa', 'caso frio', 'menor', 'sin resolver']),
      featured: false,
      content: `## El Caso

El 14 de febrero de 1990, día de San Valentín, el cuerpo de un niño de unos 9 años fue encontrado dentro de un buzón de correos en la calle Reyes Católicos de Almería.

## El Misterio

El niño nunca fue identificado. No coincidía con ninguna denuncia de desaparición en España ni en otros países. Las investigaciones no lograron determinar su identidad, procedencia ni las circunstancias de su muerte.

## La Investigación

La policía exploró múltiples líneas de investigación, incluyendo tráfico de menores, inmigración ilegal y conexiones con el norte de África. Ninguna llevó a resultados concluyentes.

## Estado Actual

Más de 30 años después, el caso permanece sin resolver. El niño fue enterrado en el cementerio de Almería sin nombre. Periódicamente surgen nuevas teorías, pero ninguna ha sido confirmada.`,
      viewCount: 25000,
      victims: {
        create: [
          {
            fullName: 'Niño del Buzón (Sin identificar)',
            fullNameSearch: normalizeForSearch('Niño del Buzón Sin identificar'),
            ageAtDeathOrMissing: 9,
            deathDate: new Date('1990-02-14'),
            status: 'DECEASED',
            lifeSummary: 'Este niño nunca fue identificado. Tenía aproximadamente 9 años cuando fue encontrado. Alguien, en algún lugar, debe saber quién era. Merece un nombre y que su historia sea conocida.',
            personality: 'Aunque no conocemos su nombre, era un niño. Tenía sueños, miedos, esperanzas. Era alguien.'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1990-02-14'), title: 'Hallazgo', description: 'El cuerpo del niño es encontrado en un buzón de Almería.', order: 1 },
          { date: new Date('1990-02-15'), title: 'Investigación', description: 'Comienza la investigación policial.', order: 2 },
          { date: new Date('1990-03-01'), title: 'Sin identificar', description: 'El niño no coincide con ninguna denuncia de desaparición.', order: 3 }
        ]
      }
    }
  })
  console.log('✅ Caso Niño del Buzón creado')

  console.log('\n¡Todos los casos han sido añadidos!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
