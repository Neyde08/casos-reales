import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Adding more real cases (11-20)...')

  // Case 11: Natalee Holloway
  await prisma.case.create({
    data: {
      slug: 'natalee-holloway',
      title: 'La Desaparición de Natalee Holloway',
      summary: 'Una estudiante estadounidense desapareció en Aruba durante su viaje de graduación. El principal sospechoso confesó 18 años después.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 2005,
      country: 'Aruba',
      city: 'Oranjestad',
      mainImageUrl: '/images/cases/natalee.jpg',
      tags: JSON.stringify(['desaparición', 'aruba', 'graduación', 'confesión']),
      featured: true,
      content: `## El Caso

El 30 de mayo de 2005, Natalee Holloway, de 18 años, desapareció durante su viaje de graduación a Aruba. Fue vista por última vez saliendo de un bar con Joran van der Sloot.

## La Investigación

A pesar de años de búsqueda e investigación internacional, el cuerpo nunca fue encontrado. Van der Sloot fue arrestado múltiples veces pero siempre liberado por falta de pruebas.

## La Confesión

En octubre de 2023, Joran van der Sloot confesó haber matado a Natalee y haber tirado su cuerpo al mar. Fue extraditado de Perú (donde cumple condena por otro asesinato) para enfrentar cargos en EEUU.`,
      viewCount: 134000,
      victims: {
        create: [{
          fullName: 'Natalee Ann Holloway',
          birthDate: new Date('1986-10-21'),
          birthPlace: 'Mountain Brook, Alabama',
          occupation: 'Estudiante de preparatoria',
          ageAtDeathOrMissing: 18,
          lastSeenDate: new Date('2005-05-30'),
          lastSeenPlace: 'Carlos n Charlies bar, Aruba',
          causeOfDeath: 'Homicidio (confesión de Van der Sloot)',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('2005-05-30'), title: 'Desaparición', description: 'Natalee desaparece tras salir de un bar con Van der Sloot.', order: 1 },
          { date: new Date('2005-06-09'), title: 'Arresto de sospechosos', description: 'Van der Sloot y los hermanos Kalpoe son arrestados.', order: 2 },
          { date: new Date('2012-01-12'), title: 'Declarada legalmente muerta', description: 'Un juez de Alabama la declara legalmente muerta.', order: 3 },
          { date: new Date('2023-10-18'), title: 'Confesión', description: 'Van der Sloot confiesa el asesinato.', order: 4 }
        ]
      },
      suspects: {
        create: [{
          fullName: 'Joran van der Sloot',
          role: 'CONFIRMED_PERPETRATOR',
          description: 'Holandés residente en Aruba, también condenado por asesinar a Stephany Flores en Perú.',
          convictionDetails: 'Confesó el asesinato en 2023',
          sentence: '20 años adicionales (EEUU)',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'ABC News - Natalee Holloway', url: 'https://abcnews.go.com/', publisher: 'ABC News', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 12: Gabriel Cruz
  await prisma.case.create({
    data: {
      slug: 'caso-gabriel-cruz',
      title: 'El Caso del Pequeño Gabriel',
      summary: 'Un niño de 8 años desapareció en Almería. Su madrastra fue condenada por su asesinato.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 2018,
      country: 'España',
      city: 'Níjar, Almería',
      mainImageUrl: '/images/cases/gabriel.jpg',
      tags: JSON.stringify(['homicidio', 'almería', 'niño', 'madrastra']),
      featured: true,
      content: `## El Caso

El 27 de febrero de 2018, Gabriel Cruz, de 8 años, desapareció cuando iba de casa de su abuela a jugar con unos primos en Las Hortichuelas, Níjar (Almería).

## La Búsqueda

Se desplegó una búsqueda masiva con el lema "Buscamos a Gabriel". El caso generó enorme movilización social.

## El Hallazgo

El 11 de marzo de 2018, la Guardia Civil interceptó el coche de Ana Julia Quezada, pareja del padre de Gabriel, y encontró el cuerpo del niño en el maletero.

## El Juicio

Ana Julia Quezada fue condenada a prisión permanente revisable por asesinato con alevosía.`,
      viewCount: 98000,
      victims: {
        create: [{
          fullName: 'Gabriel Cruz Ramírez',
          birthDate: new Date('2009-07-13'),
          birthPlace: 'Almería, España',
          ageAtDeathOrMissing: 8,
          lastSeenDate: new Date('2018-02-27'),
          lastSeenPlace: 'Las Hortichuelas, Níjar',
          deathDate: new Date('2018-02-27'),
          causeOfDeath: 'Asfixia',
          biography: 'Conocido como "el pescaíto" por su amor al mar.',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('2018-02-27'), title: 'Desaparición', description: 'Gabriel desaparece camino a casa de unos primos.', order: 1 },
          { date: new Date('2018-03-11'), title: 'Hallazgo', description: 'El cuerpo es encontrado en el maletero de Ana Julia.', order: 2 },
          { date: new Date('2019-09-13'), title: 'Condena', description: 'Ana Julia Quezada es condenada a prisión permanente revisable.', order: 3 }
        ]
      },
      suspects: {
        create: [{
          fullName: 'Ana Julia Quezada',
          role: 'CONFIRMED_PERPETRATOR',
          description: 'Pareja del padre de Gabriel.',
          convictionDetails: 'Asesinato con alevosía',
          sentence: 'Prisión permanente revisable',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'El País - Caso Gabriel', url: 'https://elpais.com/', publisher: 'El País', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 13: Jack el Destripador
  await prisma.case.create({
    data: {
      slug: 'jack-el-destripador',
      title: 'Jack el Destripador',
      summary: 'El asesino serial más famoso de la historia. Mató al menos a 5 mujeres en el Londres victoriano en 1888.',
      status: 'UNSOLVED',
      type: 'SERIAL_KILLER',
      year: 1888,
      country: 'Reino Unido',
      city: 'Londres, Whitechapel',
      mainImageUrl: '/images/cases/jack-ripper.jpg',
      tags: JSON.stringify(['serial killer', 'victoriano', 'londres', 'histórico']),
      featured: true,
      content: `## El Caso

Entre agosto y noviembre de 1888, al menos cinco mujeres fueron brutalmente asesinadas en el distrito de Whitechapel, en el East End de Londres. Las víctimas fueron mutiladas de manera que sugería conocimientos anatómicos.

## Las Víctimas Canónicas

Mary Ann Nichols, Annie Chapman, Elizabeth Stride, Catherine Eddowes y Mary Jane Kelly son conocidas como las "cinco canónicas".

## Las Cartas

El asesino supuestamente envió cartas a la policía burlándose de ellos, aunque la autenticidad de muchas es cuestionada.

## Sospechosos

A lo largo de los años, se han propuesto decenas de sospechosos, incluyendo miembros de la realeza, pero nunca se identificó al asesino.`,
      viewCount: 210000,
      victims: {
        create: [
          { fullName: 'Mary Ann Nichols', birthDate: new Date('1845-08-26'), ageAtDeathOrMissing: 43, deathDate: new Date('1888-08-31'), causeOfDeath: 'Degollamiento y mutilación', status: 'DECEASED' },
          { fullName: 'Annie Chapman', birthDate: new Date('1841-09-01'), ageAtDeathOrMissing: 47, deathDate: new Date('1888-09-08'), causeOfDeath: 'Degollamiento y mutilación', status: 'DECEASED' },
          { fullName: 'Elizabeth Stride', birthDate: new Date('1843-11-27'), ageAtDeathOrMissing: 44, deathDate: new Date('1888-09-30'), causeOfDeath: 'Degollamiento', status: 'DECEASED' },
          { fullName: 'Catherine Eddowes', birthDate: new Date('1842-04-14'), ageAtDeathOrMissing: 46, deathDate: new Date('1888-09-30'), causeOfDeath: 'Degollamiento y mutilación', status: 'DECEASED' },
          { fullName: 'Mary Jane Kelly', birthDate: new Date('1863-01-01'), ageAtDeathOrMissing: 25, deathDate: new Date('1888-11-09'), causeOfDeath: 'Degollamiento y mutilación extrema', status: 'DECEASED' }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1888-08-31'), title: 'Primera víctima canónica', description: 'Mary Ann Nichols es encontrada asesinada.', order: 1 },
          { date: new Date('1888-09-08'), title: 'Annie Chapman', description: 'Segunda víctima canónica.', order: 2 },
          { date: new Date('1888-09-30'), title: 'Doble evento', description: 'Elizabeth Stride y Catherine Eddowes asesinadas la misma noche.', order: 3 },
          { date: new Date('1888-11-09'), title: 'Mary Jane Kelly', description: 'Última y más brutal de las víctimas canónicas.', order: 4 }
        ]
      },
      sources: {
        create: [
          { title: 'Scotland Yard Archives', url: 'https://www.met.police.uk/', publisher: 'Metropolitan Police', reliabilityTag: 'HIGH' },
          { title: 'Casebook: Jack the Ripper', url: 'https://www.casebook.org/', publisher: 'Casebook.org', reliabilityTag: 'MEDIUM' }
        ]
      }
    }
  })

  // Case 14: Asunta Basterra
  await prisma.case.create({
    data: {
      slug: 'caso-asunta-basterra',
      title: 'El Caso Asunta Basterra',
      summary: 'Una niña de 12 años adoptada en China fue asesinada por sus propios padres en Santiago de Compostela.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 2013,
      country: 'España',
      city: 'Santiago de Compostela, Galicia',
      mainImageUrl: '/images/cases/asunta.jpg',
      tags: JSON.stringify(['homicidio', 'galicia', 'parricidio', 'adopción']),
      featured: true,
      content: `## El Caso

El 21 de septiembre de 2013, Asunta Yong Fang Basterra Porto, de 12 años, fue encontrada muerta en una pista forestal cerca de Santiago de Compostela.

## Los Padres

Rosario Porto y Alfonso Basterra, padres adoptivos de Asunta, fueron detenidos como principales sospechosos. Ambos eran profesionales respetados.

## La Investigación

Se descubrió que Asunta había sido sedada con Orfidal durante meses antes de su muerte. Murió por asfixia.

## El Juicio

Ambos padres fueron condenados a 18 años de prisión. Rosario Porto se suicidó en prisión en 2020.`,
      viewCount: 76000,
      victims: {
        create: [{
          fullName: 'Asunta Yong Fang Basterra Porto',
          birthDate: new Date('2001-02-12'),
          birthPlace: 'China',
          ageAtDeathOrMissing: 12,
          lastSeenDate: new Date('2013-09-21'),
          lastSeenPlace: 'Santiago de Compostela',
          deathDate: new Date('2013-09-21'),
          causeOfDeath: 'Asfixia',
          biography: 'Niña adoptada de China, excelente estudiante.',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('2013-09-21'), title: 'Desaparición', description: 'Los padres reportan la desaparición de Asunta.', order: 1 },
          { date: new Date('2013-09-22'), title: 'Cuerpo encontrado', description: 'El cuerpo es hallado en una pista forestal.', order: 2 },
          { date: new Date('2013-09-23'), title: 'Detención de los padres', description: 'Rosario Porto y Alfonso Basterra son detenidos.', order: 3 },
          { date: new Date('2015-10-30'), title: 'Condena', description: 'Ambos padres son condenados a 18 años.', order: 4 },
          { date: new Date('2020-09-18'), title: 'Suicidio de Rosario', description: 'Rosario Porto se suicida en prisión.', order: 5 }
        ]
      },
      suspects: {
        create: [
          { fullName: 'Rosario Porto', role: 'CONFIRMED_PERPETRATOR', description: 'Madre adoptiva, abogada.', sentence: '18 años (fallecida en 2020)', isConfirmed: true },
          { fullName: 'Alfonso Basterra', role: 'CONFIRMED_PERPETRATOR', description: 'Padre adoptivo, periodista.', sentence: '18 años', isConfirmed: true }
        ]
      },
      sources: {
        create: [
          { title: 'La Voz de Galicia - Caso Asunta', url: 'https://www.lavozdegalicia.es/', publisher: 'La Voz de Galicia', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 15: Laci Peterson
  await prisma.case.create({
    data: {
      slug: 'laci-peterson',
      title: 'El Caso Laci Peterson',
      summary: 'Una mujer embarazada de 8 meses desapareció en Nochebuena. Su esposo fue condenado por su asesinato.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 2002,
      country: 'Estados Unidos',
      city: 'Modesto, California',
      mainImageUrl: '/images/cases/laci-peterson.jpg',
      tags: JSON.stringify(['homicidio', 'california', 'embarazada', 'esposo']),
      featured: false,
      content: `## El Caso

El 24 de diciembre de 2002, Laci Peterson, de 27 años y embarazada de 8 meses, desapareció de su casa en Modesto, California.

## El Esposo Sospechoso

Scott Peterson, esposo de Laci, afirmó haber ido a pescar ese día. La investigación reveló que tenía una amante y había contratado un seguro de vida para Laci.

## El Hallazgo

En abril de 2003, los cuerpos de Laci y su hijo nonato fueron encontrados en la Bahía de San Francisco, cerca de donde Scott dijo haber pescado.

## La Condena

Scott Peterson fue condenado a muerte en 2005, aunque su sentencia fue posteriormente reducida a cadena perpetua.`,
      viewCount: 89000,
      victims: {
        create: [{
          fullName: 'Laci Denise Peterson',
          birthDate: new Date('1975-05-04'),
          birthPlace: 'Modesto, California',
          occupation: 'Maestra sustituta',
          ageAtDeathOrMissing: 27,
          lastSeenDate: new Date('2002-12-24'),
          lastSeenPlace: 'Su casa en Modesto',
          deathDate: new Date('2002-12-24'),
          causeOfDeath: 'Homicidio (causa exacta indeterminada)',
          biography: 'Embarazada de 8 meses de su primer hijo.',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('2002-12-24'), title: 'Desaparición', description: 'Laci desaparece de su casa en Nochebuena.', order: 1 },
          { date: new Date('2003-04-13'), title: 'Cuerpos encontrados', description: 'Los restos de Laci y Conner son encontrados.', order: 2 },
          { date: new Date('2003-04-18'), title: 'Arresto de Scott', description: 'Scott Peterson es arrestado.', order: 3 },
          { date: new Date('2004-11-12'), title: 'Veredicto', description: 'Scott es declarado culpable.', order: 4 }
        ]
      },
      suspects: {
        create: [{
          fullName: 'Scott Peterson',
          role: 'CONFIRMED_PERPETRATOR',
          description: 'Esposo de Laci, tenía una amante.',
          convictionDetails: 'Asesinato en primer grado de Laci y segundo grado de Conner',
          sentence: 'Cadena perpetua sin libertad condicional',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'CNN - Laci Peterson', url: 'https://www.cnn.com/', publisher: 'CNN', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 16: Jeffrey Dahmer
  await prisma.case.create({
    data: {
      slug: 'jeffrey-dahmer',
      title: 'Jeffrey Dahmer - El Caníbal de Milwaukee',
      summary: 'Uno de los asesinos seriales más notorios de EEUU. Mató, desmembró y canibalizó a 17 víctimas.',
      status: 'SOLVED',
      type: 'SERIAL_KILLER',
      year: 1991,
      country: 'Estados Unidos',
      city: 'Milwaukee, Wisconsin',
      mainImageUrl: '/images/cases/dahmer.jpg',
      tags: JSON.stringify(['serial killer', 'canibalismo', 'milwaukee', 'necrofilia']),
      featured: true,
      content: `## El Asesino

Jeffrey Dahmer asesinó a 17 hombres y jóvenes entre 1978 y 1991. Sus crímenes incluyeron necrofilia, canibalismo y preservación de partes del cuerpo.

## El Descubrimiento

El 22 de julio de 1991, una de sus víctimas escapó y alertó a la policía. En su apartamento encontraron restos de 11 víctimas.

## Los Errores Policiales

En mayo de 1991, la policía devolvió a una víctima de 14 años a Dahmer después de que este escapara. El joven fue asesinado esa misma noche.

## El Final

Dahmer fue condenado a 15 cadenas perpetuas. Fue asesinado por otro recluso en 1994.`,
      viewCount: 245000,
      victims: {
        create: [
          { fullName: 'Steven Hicks', ageAtDeathOrMissing: 18, deathDate: new Date('1978-06-18'), causeOfDeath: 'Golpes y estrangulamiento', status: 'DECEASED' },
          { fullName: 'Steven Tuomi', ageAtDeathOrMissing: 25, deathDate: new Date('1987-11-20'), causeOfDeath: 'Desconocida', status: 'DECEASED' }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1978-06-18'), title: 'Primera víctima', description: 'Steven Hicks es la primera víctima de Dahmer.', order: 1 },
          { date: new Date('1991-07-22'), title: 'Captura', description: 'Tracy Edwards escapa y alerta a la policía.', order: 2 },
          { date: new Date('1992-02-15'), title: 'Condena', description: 'Dahmer es condenado a 15 cadenas perpetuas.', order: 3 },
          { date: new Date('1994-11-28'), title: 'Muerte', description: 'Dahmer es asesinado en prisión.', order: 4 }
        ]
      },
      suspects: {
        create: [{
          fullName: 'Jeffrey Lionel Dahmer',
          role: 'CONFIRMED_PERPETRATOR',
          description: 'El Caníbal de Milwaukee.',
          method: 'Drogas, estrangulamiento, desmembramiento',
          convictionDetails: '15 cargos de homicidio en Wisconsin',
          sentence: '15 cadenas perpetuas (asesinado en prisión)',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'FBI Archives', url: 'https://www.fbi.gov/', publisher: 'FBI', reliabilityTag: 'HIGH' },
          { title: 'Netflix - Dahmer', url: 'https://www.netflix.com/', publisher: 'Netflix', reliabilityTag: 'MEDIUM' }
        ]
      }
    }
  })

  // Case 17: Ted Bundy
  await prisma.case.create({
    data: {
      slug: 'ted-bundy',
      title: 'Las Víctimas de Ted Bundy',
      summary: 'Asesino serial que confesó 30 asesinatos pero se sospecha de muchos más. Fue ejecutado en 1989.',
      status: 'SOLVED',
      type: 'SERIAL_KILLER',
      year: 1978,
      country: 'Estados Unidos',
      city: 'Multiple Estados',
      mainImageUrl: '/images/cases/ted-bundy.jpg',
      tags: JSON.stringify(['serial killer', 'carismático', 'ejecución', 'multiple estados']),
      featured: true,
      content: `## El Asesino

Ted Bundy era un hombre carismático e inteligente que usaba su apariencia inofensiva para atraer a sus víctimas. Confesó 30 asesinatos pero se sospecha de muchos más.

## Modus Operandi

Bundy fingía estar herido o ser una figura de autoridad para ganarse la confianza de mujeres jóvenes, generalmente universitarias.

## Las Fugas

Bundy escapó de la cárcel dos veces. Durante su segunda fuga, asesinó a más víctimas en Florida.

## Ejecución

Fue ejecutado en la silla eléctrica el 24 de enero de 1989 en Florida.`,
      viewCount: 289000,
      victims: {
        create: [
          { fullName: 'Lynda Ann Healy', birthDate: new Date('1953-01-30'), ageAtDeathOrMissing: 21, deathDate: new Date('1974-02-01'), status: 'DECEASED' },
          { fullName: 'Lisa Levy', birthDate: new Date('1958-11-09'), ageAtDeathOrMissing: 20, deathDate: new Date('1978-01-15'), causeOfDeath: 'Estrangulamiento', status: 'DECEASED' }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1974-02-01'), title: 'Primera víctima confirmada', description: 'Lynda Ann Healy desaparece de Seattle.', order: 1 },
          { date: new Date('1975-08-16'), title: 'Primer arresto', description: 'Bundy es arrestado en Utah.', order: 2 },
          { date: new Date('1977-12-30'), title: 'Segunda fuga', description: 'Escapa de la cárcel de Colorado.', order: 3 },
          { date: new Date('1978-01-15'), title: 'Ataques Chi Omega', description: 'Ataca a varias mujeres en Florida.', order: 4 },
          { date: new Date('1989-01-24'), title: 'Ejecución', description: 'Bundy es ejecutado en Florida.', order: 5 }
        ]
      },
      suspects: {
        create: [{
          fullName: 'Theodore Robert Bundy',
          role: 'CONFIRMED_PERPETRATOR',
          description: 'Asesino serial carismático.',
          method: 'Secuestro, violación, estrangulamiento, golpes',
          convictionDetails: 'Condenado por múltiples asesinatos',
          sentence: 'Pena de muerte - ejecutado',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'FBI - Ted Bundy', url: 'https://www.fbi.gov/', publisher: 'FBI', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 18: John Wayne Gacy
  await prisma.case.create({
    data: {
      slug: 'john-wayne-gacy',
      title: 'John Wayne Gacy - El Payaso Asesino',
      summary: 'Asesino serial que mató a 33 jóvenes y enterró a la mayoría bajo su casa. Se disfrazaba de payaso.',
      status: 'SOLVED',
      type: 'SERIAL_KILLER',
      year: 1978,
      country: 'Estados Unidos',
      city: 'Chicago, Illinois',
      mainImageUrl: '/images/cases/gacy.jpg',
      tags: JSON.stringify(['serial killer', 'payaso', 'chicago', 'enterrados']),
      featured: true,
      content: `## El Asesino

John Wayne Gacy asesinó a al menos 33 jóvenes entre 1972 y 1978. Era conocido en su comunidad como "Pogo el Payaso" por sus actuaciones benéficas.

## Los Crímenes

Gacy atraía a sus víctimas con promesas de trabajo o dinero. Las asesinaba en su casa y enterraba los cuerpos en el sótano.

## El Descubrimiento

La desaparición de Robert Piest llevó a la policía a la casa de Gacy, donde encontraron los restos de 29 víctimas.

## Ejecución

Gacy fue ejecutado por inyección letal el 10 de mayo de 1994.`,
      viewCount: 198000,
      victims: {
        create: [
          { fullName: 'Robert Piest', birthDate: new Date('1963-03-11'), ageAtDeathOrMissing: 15, deathDate: new Date('1978-12-11'), causeOfDeath: 'Asfixia', status: 'DECEASED' },
          { fullName: 'Timothy OʼRourke', ageAtDeathOrMissing: 20, deathDate: new Date('1976-06-01'), causeOfDeath: 'Asfixia', status: 'DECEASED' }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1972-01-03'), title: 'Primera víctima', description: 'Timothy McCoy es la primera víctima conocida.', order: 1 },
          { date: new Date('1978-12-11'), title: 'Robert Piest', description: 'La desaparición de Piest inicia la investigación.', order: 2 },
          { date: new Date('1978-12-21'), title: 'Arresto', description: 'Gacy es arrestado.', order: 3 },
          { date: new Date('1994-05-10'), title: 'Ejecución', description: 'Gacy es ejecutado por inyección letal.', order: 4 }
        ]
      },
      suspects: {
        create: [{
          fullName: 'John Wayne Gacy',
          aliases: JSON.stringify(['Pogo el Payaso', 'Killer Clown']),
          role: 'CONFIRMED_PERPETRATOR',
          description: 'El Payaso Asesino de Chicago.',
          method: 'Estrangulamiento, asfixia',
          convictionDetails: '33 cargos de homicidio',
          sentence: 'Pena de muerte - ejecutado',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'Chicago Tribune', url: 'https://www.chicagotribune.com/', publisher: 'Chicago Tribune', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 19: Yéremi Vargas
  await prisma.case.create({
    data: {
      slug: 'yeremi-vargas',
      title: 'La Desaparición de Yéremi Vargas',
      summary: 'Un niño de 7 años desapareció mientras jugaba cerca de su casa en Gran Canaria. El caso sigue sin resolverse.',
      status: 'UNSOLVED',
      type: 'DISAPPEARANCE',
      year: 2007,
      country: 'España',
      city: 'Vecindario, Gran Canaria',
      mainImageUrl: '/images/cases/yeremi.jpg',
      tags: JSON.stringify(['desaparición', 'canarias', 'niño', 'sin resolver']),
      featured: true,
      content: `## El Caso

El 10 de marzo de 2007, Yéremi Vargas, de 7 años, desapareció mientras jugaba con sus primos en un descampado cerca de su casa en Vecindario, Gran Canaria.

## La Investigación

A pesar de una búsqueda masiva y años de investigación, Yéremi nunca fue encontrado.

## El Sospechoso

Antonio Ojeda, "El Rubio", es el principal sospechoso. Fue condenado por agredir sexualmente a otro niño en la zona, pero nunca ha sido juzgado por la desaparición de Yéremi.

## Estado Actual

El caso fue reabierto en 2021 y sigue bajo investigación.`,
      viewCount: 67000,
      victims: {
        create: [{
          fullName: 'Yéremi Vargas',
          birthDate: new Date('1999-07-18'),
          birthPlace: 'Gran Canaria, España',
          ageAtDeathOrMissing: 7,
          lastSeenDate: new Date('2007-03-10'),
          lastSeenPlace: 'Vecindario, Gran Canaria',
          biography: 'Niño alegre que desapareció jugando cerca de su casa.',
          status: 'MISSING'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('2007-03-10'), title: 'Desaparición', description: 'Yéremi desaparece mientras juega en un descampado.', order: 1 },
          { date: new Date('2017-03-10'), title: 'Caso archivado', description: 'El juez archiva el caso tras 10 años.', order: 2 },
          { date: new Date('2021-09-08'), title: 'Caso reabierto', description: 'El caso es reabierto por nuevas diligencias.', order: 3 }
        ]
      },
      suspects: {
        create: [{
          fullName: 'Antonio Ojeda Bordón',
          aliases: JSON.stringify(['El Rubio']),
          role: 'SUSPECT',
          description: 'Condenado por agresión sexual a otro menor en la zona.',
          evidenceAgainst: 'Proximidad, antecedentes, declaraciones',
          isConfirmed: false
        }]
      },
      sources: {
        create: [
          { title: 'Canarias7', url: 'https://www.canarias7.es/', publisher: 'Canarias7', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 20: Emanuela Orlandi
  await prisma.case.create({
    data: {
      slug: 'emanuela-orlandi',
      title: 'La Desaparición de Emanuela Orlandi',
      summary: 'Una ciudadana vaticana de 15 años desapareció en Roma en 1983. El caso involucra teorías sobre el Vaticano, la mafia y servicios secretos.',
      status: 'UNSOLVED',
      type: 'DISAPPEARANCE',
      year: 1983,
      country: 'Italia',
      city: 'Roma / Ciudad del Vaticano',
      mainImageUrl: '/images/cases/emanuela.jpg',
      tags: JSON.stringify(['desaparición', 'vaticano', 'roma', 'conspiración']),
      featured: true,
      content: `## El Caso

El 22 de junio de 1983, Emanuela Orlandi, de 15 años e hija de un empleado del Vaticano, desapareció en Roma después de su clase de música.

## Las Teorías

Las teorías sobre su desaparición incluyen: secuestro para presionar la liberación de Ali Agca (quien atentó contra el Papa), tráfico sexual, y conexiones con la mafia romana.

## El Vaticano

En 2023, el Vaticano abrió por primera vez una investigación oficial sobre el caso.

## Estado Actual

Más de 40 años después, Emanuela sigue desaparecida y el caso continúa siendo investigado.`,
      viewCount: 78000,
      victims: {
        create: [{
          fullName: 'Emanuela Orlandi',
          birthDate: new Date('1968-01-14'),
          birthPlace: 'Ciudad del Vaticano',
          occupation: 'Estudiante',
          ageAtDeathOrMissing: 15,
          lastSeenDate: new Date('1983-06-22'),
          lastSeenPlace: 'Roma, Italia',
          biography: 'Ciudadana vaticana, hija de un empleado del Palacio Apostólico.',
          status: 'MISSING'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('1983-06-22'), title: 'Desaparición', description: 'Emanuela no regresa de su clase de música.', order: 1 },
          { date: new Date('1983-07-05'), title: 'Primera llamada', description: 'La familia recibe llamadas de presuntos secuestradores.', order: 2 },
          { date: new Date('2023-01-09'), title: 'Vaticano abre investigación', description: 'Primera investigación oficial del Vaticano.', order: 3 }
        ]
      },
      sources: {
        create: [
          { title: 'Netflix - Vatican Girl', url: 'https://www.netflix.com/', publisher: 'Netflix', reliabilityTag: 'MEDIUM' },
          { title: 'La Repubblica', url: 'https://www.repubblica.it/', publisher: 'La Repubblica', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  console.log('Cases 11-20 created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
