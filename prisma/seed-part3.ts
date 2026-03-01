import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Adding final real cases (21-30)...')

  // Case 21: Amy Mihaljevic
  await prisma.case.create({
    data: {
      slug: 'amy-mihaljevic',
      title: 'El Asesinato de Amy Mihaljevic',
      summary: 'Una niña de 10 años fue atraída por un extraño y encontrada muerta meses después. El caso más largo activo del FBI.',
      status: 'UNSOLVED',
      type: 'KIDNAPPING',
      year: 1989,
      country: 'Estados Unidos',
      city: 'Bay Village, Ohio',
      mainImageUrl: '/images/cases/amy.jpg',
      tags: JSON.stringify(['secuestro', 'ohio', 'niña', 'fbi']),
      featured: false,
      content: `## El Caso

El 27 de octubre de 1989, Amy Mihaljevic, de 10 años, fue engañada por un extraño que la llamó diciendo que quería ayudarla a comprar un regalo para su madre. Fue secuestrada de un centro comercial en Bay Village, Ohio.

## El Hallazgo

El 8 de febrero de 1990, su cuerpo fue encontrado en el condado de Ashland, a 50 millas de donde fue secuestrada.

## La Investigación

Se han realizado cerca de 20,000 entrevistas sin identificar al asesino. En 2025, se encontró nuevo ADN que podría resolver el caso.

## Estado Actual

Es el caso activo más largo en la historia del FBI.`,
      viewCount: 45000,
      victims: {
        create: [{
          fullName: 'Amy Renee Mihaljevic',
          birthDate: new Date('1979-12-11'),
          birthPlace: 'Bay Village, Ohio',
          ageAtDeathOrMissing: 10,
          lastSeenDate: new Date('1989-10-27'),
          lastSeenPlace: 'Bay Village Square Mall',
          deathDate: new Date('1989-10-27'),
          causeOfDeath: 'Golpe en la cabeza y apuñalamiento',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('1989-10-27'), title: 'Secuestro', description: 'Amy es secuestrada del centro comercial.', order: 1 },
          { date: new Date('1990-02-08'), title: 'Cuerpo encontrado', description: 'Su cuerpo es hallado en el condado de Ashland.', order: 2 }
        ]
      },
      sources: {
        create: [
          { title: 'FBI - Amy Mihaljevic', url: 'https://www.fbi.gov/wanted/seeking-info/amy-renee-mihaljevic', publisher: 'FBI', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 22: Anabel Segura
  await prisma.case.create({
    data: {
      slug: 'anabel-segura',
      title: 'El Secuestro de Anabel Segura',
      summary: 'Una estudiante fue secuestrada mientras corría. El secuestro más largo de España: 900 días.',
      status: 'SOLVED',
      type: 'KIDNAPPING',
      year: 1993,
      country: 'España',
      city: 'La Moraleja, Madrid',
      mainImageUrl: '/images/cases/anabel.jpg',
      tags: JSON.stringify(['secuestro', 'madrid', 'lazo amarillo', '900 días']),
      featured: false,
      content: `## El Caso

El 12 de abril de 1993, Anabel Segura, de 22 años, fue secuestrada mientras corría en La Moraleja, Madrid.

## La Extorsión

Aunque fue asesinada el mismo día del secuestro, los criminales contactaron a la familia durante meses exigiendo rescate.

## El Lazo Amarillo

El caso generó una movilización masiva con el símbolo del lazo amarillo.

## Resolución

900 días después, gracias a que se difundió una grabación por TV, se identificó a los culpables y se encontró el cuerpo.`,
      viewCount: 56000,
      victims: {
        create: [{
          fullName: 'Anabel Segura García',
          birthDate: new Date('1971-03-15'),
          birthPlace: 'Madrid, España',
          occupation: 'Estudiante universitaria',
          ageAtDeathOrMissing: 22,
          lastSeenDate: new Date('1993-04-12'),
          lastSeenPlace: 'La Moraleja, Madrid',
          deathDate: new Date('1993-04-12'),
          causeOfDeath: 'Estrangulamiento',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('1993-04-12'), title: 'Secuestro y asesinato', description: 'Anabel es secuestrada y asesinada el mismo día.', order: 1 },
          { date: new Date('1995-09-28'), title: 'Detención', description: 'Los secuestradores son identificados y detenidos.', order: 2 },
          { date: new Date('1995-09-30'), title: 'Cuerpo encontrado', description: 'El cuerpo es hallado 900 días después.', order: 3 }
        ]
      },
      suspects: {
        create: [
          { fullName: 'Emilio Muñoz Guadix', role: 'CONFIRMED_PERPETRATOR', sentence: '43 años', isConfirmed: true },
          { fullName: 'Cándido Ortiz Añón', role: 'CONFIRMED_PERPETRATOR', sentence: '43 años (falleció en prisión)', isConfirmed: true }
        ]
      },
      sources: {
        create: [
          { title: 'Netflix - 900 días sin Anabel', url: 'https://www.netflix.com/', publisher: 'Netflix', reliabilityTag: 'MEDIUM' }
        ]
      }
    }
  })

  // Case 23: Maura Murray
  await prisma.case.create({
    data: {
      slug: 'maura-murray',
      title: 'La Desaparición de Maura Murray',
      summary: 'Una estudiante de enfermería desapareció tras un accidente de auto en New Hampshire. Nunca fue encontrada.',
      status: 'UNSOLVED',
      type: 'DISAPPEARANCE',
      year: 2004,
      country: 'Estados Unidos',
      city: 'Haverhill, New Hampshire',
      mainImageUrl: '/images/cases/maura.jpg',
      tags: JSON.stringify(['desaparición', 'new hampshire', 'estudiante', 'accidente']),
      featured: false,
      content: `## El Caso

El 9 de febrero de 2004, Maura Murray, de 21 años, tuvo un accidente de auto en una zona rural de New Hampshire. Cuando llegó la policía minutos después, ella había desaparecido.

## Las Circunstancias

Maura había sacado dinero, empacado su auto y dejado la universidad sin explicación. Las teorías incluyen fuga voluntaria, suicidio y secuestro.

## La Investigación

A pesar de búsquedas extensas y teorías diversas, nunca se encontró rastro de Maura.`,
      viewCount: 89000,
      victims: {
        create: [{
          fullName: 'Maura Murray',
          birthDate: new Date('1982-05-04'),
          birthPlace: 'Hanson, Massachusetts',
          occupation: 'Estudiante de enfermería',
          ageAtDeathOrMissing: 21,
          lastSeenDate: new Date('2004-02-09'),
          lastSeenPlace: 'Route 112, Haverhill, NH',
          status: 'MISSING'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('2004-02-09'), title: 'Accidente', description: 'Maura tiene un accidente y desaparece.', order: 1 },
          { date: new Date('2004-02-10'), title: 'Búsqueda iniciada', description: 'La policía inicia la búsqueda.', order: 2 }
        ]
      },
      sources: {
        create: [
          { title: 'Oxygen - The Disappearance of Maura Murray', url: 'https://www.oxygen.com/', publisher: 'Oxygen', reliabilityTag: 'MEDIUM' }
        ]
      }
    }
  })

  // Case 24: Delphi Murders
  await prisma.case.create({
    data: {
      slug: 'delphi-murders',
      title: 'Los Asesinatos de Delphi',
      summary: 'Dos adolescentes fueron asesinadas en un sendero en Indiana. Grabaron a su asesino antes de morir.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 2017,
      country: 'Estados Unidos',
      city: 'Delphi, Indiana',
      mainImageUrl: '/images/cases/delphi.jpg',
      tags: JSON.stringify(['homicidio', 'indiana', 'adolescentes', 'video']),
      featured: false,
      content: `## El Caso

El 13 de febrero de 2017, Abigail Williams (13) y Liberty German (14) fueron asesinadas mientras caminaban por un sendero en Delphi, Indiana.

## La Evidencia

Liberty grabó video y audio del sospechoso en su teléfono antes de morir, incluyendo su voz diciendo "bajen la colina".

## Arresto

En octubre de 2022, Richard Allen fue arrestado y en 2024 fue condenado por los asesinatos.`,
      viewCount: 134000,
      victims: {
        create: [
          { fullName: 'Abigail Joyce Williams', birthDate: new Date('2003-06-23'), ageAtDeathOrMissing: 13, deathDate: new Date('2017-02-13'), status: 'DECEASED' },
          { fullName: 'Liberty Rose German', birthDate: new Date('2002-12-27'), ageAtDeathOrMissing: 14, deathDate: new Date('2017-02-13'), status: 'DECEASED' }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('2017-02-13'), title: 'Desaparición', description: 'Las chicas son vistas por última vez en el sendero.', order: 1 },
          { date: new Date('2017-02-14'), title: 'Cuerpos encontrados', description: 'Los cuerpos son hallados cerca del sendero.', order: 2 },
          { date: new Date('2022-10-28'), title: 'Arresto', description: 'Richard Allen es arrestado.', order: 3 },
          { date: new Date('2024-11-11'), title: 'Veredicto', description: 'Allen es declarado culpable.', order: 4 }
        ]
      },
      suspects: {
        create: [{
          fullName: 'Richard Allen',
          role: 'CONFIRMED_PERPETRATOR',
          description: 'Residente local de Delphi.',
          convictionDetails: 'Dos cargos de homicidio',
          sentence: 'Cadena perpetua',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'Indiana State Police', url: 'https://www.in.gov/isp/', publisher: 'ISP', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 25: Meredith Kercher
  await prisma.case.create({
    data: {
      slug: 'meredith-kercher',
      title: 'El Asesinato de Meredith Kercher',
      summary: 'Una estudiante británica fue asesinada en Italia. Su compañera Amanda Knox fue condenada y luego absuelta.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 2007,
      country: 'Italia',
      city: 'Perugia',
      mainImageUrl: '/images/cases/meredith.jpg',
      tags: JSON.stringify(['homicidio', 'italia', 'estudiante', 'amanda knox']),
      featured: false,
      content: `## El Caso

El 1 de noviembre de 2007, Meredith Kercher, de 21 años, fue encontrada asesinada en su apartamento en Perugia, Italia.

## El Juicio

Amanda Knox y Raffaele Sollecito fueron inicialmente condenados pero finalmente absueltos tras años de batallas legales. Rudy Guede fue condenado.

## Controversia

El caso generó enorme controversia sobre el sistema judicial italiano y el tratamiento mediático.`,
      viewCount: 112000,
      victims: {
        create: [{
          fullName: 'Meredith Susanna Cara Kercher',
          birthDate: new Date('1985-12-28'),
          birthPlace: 'Londres, Reino Unido',
          occupation: 'Estudiante de intercambio',
          ageAtDeathOrMissing: 21,
          deathDate: new Date('2007-11-01'),
          causeOfDeath: 'Apuñalamiento y estrangulamiento',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('2007-11-01'), title: 'Asesinato', description: 'Meredith es encontrada muerta.', order: 1 },
          { date: new Date('2007-11-06'), title: 'Arrestos', description: 'Knox, Sollecito y Guede son arrestados.', order: 2 },
          { date: new Date('2015-03-27'), title: 'Absolución definitiva', description: 'Knox y Sollecito son absueltos definitivamente.', order: 3 }
        ]
      },
      suspects: {
        create: [{
          fullName: 'Rudy Guede',
          role: 'CONFIRMED_PERPETRATOR',
          description: 'Inmigrante de Costa de Marfil.',
          convictionDetails: 'Homicidio en complicidad',
          sentence: '16 años (liberado en 2021)',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'BBC News - Meredith Kercher', url: 'https://www.bbc.com/', publisher: 'BBC', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 26: Chandra Levy
  await prisma.case.create({
    data: {
      slug: 'chandra-levy',
      title: 'El Asesinato de Chandra Levy',
      summary: 'Una pasante de Washington desapareció durante una aventura con un congresista. Su caso dominó los medios hasta el 11-S.',
      status: 'UNSOLVED',
      type: 'HOMICIDE',
      year: 2001,
      country: 'Estados Unidos',
      city: 'Washington D.C.',
      mainImageUrl: '/images/cases/chandra.jpg',
      tags: JSON.stringify(['homicidio', 'washington', 'congresista', 'escándalo']),
      featured: false,
      content: `## El Caso

El 1 de mayo de 2001, Chandra Levy, de 24 años, desapareció de Washington D.C. Tenía una relación con el congresista Gary Condit.

## El Escándalo

El caso dominó los medios estadounidenses durante el verano de 2001, hasta que los ataques del 11-S cambiaron el foco de atención.

## El Sospechoso

Ingmar Guandique fue condenado pero luego se retiraron los cargos por testimonio falso. El caso sigue sin resolver.`,
      viewCount: 67000,
      victims: {
        create: [{
          fullName: 'Chandra Ann Levy',
          birthDate: new Date('1977-04-14'),
          birthPlace: 'Modesto, California',
          occupation: 'Pasante federal',
          ageAtDeathOrMissing: 24,
          lastSeenDate: new Date('2001-05-01'),
          lastSeenPlace: 'Washington D.C.',
          deathDate: new Date('2001-05-01'),
          causeOfDeath: 'Homicidio (causa exacta indeterminada)',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('2001-05-01'), title: 'Desaparición', description: 'Chandra desaparece de su apartamento.', order: 1 },
          { date: new Date('2002-05-22'), title: 'Cuerpo encontrado', description: 'Sus restos son hallados en Rock Creek Park.', order: 2 },
          { date: new Date('2016-07-28'), title: 'Cargos retirados', description: 'Se retiran cargos contra Guandique.', order: 3 }
        ]
      },
      sources: {
        create: [
          { title: 'Washington Post', url: 'https://www.washingtonpost.com/', publisher: 'Washington Post', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 27: Oriel Briant
  await prisma.case.create({
    data: {
      slug: 'oriel-briant',
      title: 'El Crimen de Oriel Briant',
      summary: 'Una profesora argentina fue encontrada asesinada brutalmente. El caso prescribió sin resolverse.',
      status: 'UNSOLVED',
      type: 'HOMICIDE',
      year: 1984,
      country: 'Argentina',
      city: 'City Bell, Buenos Aires',
      mainImageUrl: '/images/cases/oriel.jpg',
      tags: JSON.stringify(['homicidio', 'argentina', 'sin resolver', 'prescrito']),
      featured: false,
      content: `## El Caso

El 13 de julio de 1984, Oriel Briant, una profesora de inglés de 37 años, fue encontrada muerta con una bala en la cara y unas 20 puñaladas.

## La Investigación

Su exmarido fue el principal sospechoso pero errores en la investigación impidieron su condena.

## Prescripción

La causa prescribió sin resolverse. Ningún responsable fue identificado judicialmente.`,
      viewCount: 34000,
      victims: {
        create: [{
          fullName: 'Aurelia "Oriel" Briant',
          birthDate: new Date('1947-05-20'),
          birthPlace: 'La Plata, Argentina',
          occupation: 'Profesora de inglés',
          ageAtDeathOrMissing: 37,
          deathDate: new Date('1984-07-11'),
          causeOfDeath: 'Disparo y múltiples puñaladas',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('1984-07-11'), title: 'Desaparición', description: 'Oriel sale de su casa en camisón.', order: 1 },
          { date: new Date('1984-07-13'), title: 'Cuerpo encontrado', description: 'Su cuerpo es hallado en la Ruta 2.', order: 2 },
          { date: new Date('1997-01-01'), title: 'Exoneración', description: 'Federico Pippo es exonerado.', order: 3 }
        ]
      },
      sources: {
        create: [
          { title: 'La Nación - Caso Oriel Briant', url: 'https://www.lanacion.com.ar/', publisher: 'La Nación', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 28: Solange Grabenheimer
  await prisma.case.create({
    data: {
      slug: 'solange-grabenheimer',
      title: 'El Crimen de Solange Grabenheimer',
      summary: 'Una joven argentina fue encontrada apuñalada en su departamento. Su mejor amiga fue acusada y absuelta.',
      status: 'UNSOLVED',
      type: 'HOMICIDE',
      year: 2007,
      country: 'Argentina',
      city: 'Vicente López, Buenos Aires',
      mainImageUrl: '/images/cases/solange.jpg',
      tags: JSON.stringify(['homicidio', 'argentina', 'prescrito', 'sin resolver']),
      featured: false,
      content: `## El Caso

El 10 de enero de 2007, Solange Grabenheimer fue encontrada muerta en su domicilio con cuatro puñaladas en el cuello.

## El Juicio

Su mejor amiga Lucila Frend fue la única acusada pero fue absuelta por falta de pruebas.

## Prescripción

El caso prescribió en 2022 sin encontrar al responsable.`,
      viewCount: 28000,
      victims: {
        create: [{
          fullName: 'Solange Grabenheimer',
          birthDate: new Date('1982-08-15'),
          birthPlace: 'Buenos Aires, Argentina',
          ageAtDeathOrMissing: 24,
          deathDate: new Date('2007-01-10'),
          causeOfDeath: 'Cuatro puñaladas en el cuello',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('2007-01-10'), title: 'Asesinato', description: 'Solange es encontrada muerta.', order: 1 },
          { date: new Date('2011-07-12'), title: 'Absolución', description: 'Lucila Frend es absuelta.', order: 2 },
          { date: new Date('2022-01-10'), title: 'Prescripción', description: 'El caso prescribe.', order: 3 }
        ]
      },
      sources: {
        create: [
          { title: 'Infobae', url: 'https://www.infobae.com/', publisher: 'Infobae', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 29: Tammy Lynn Leppert
  await prisma.case.create({
    data: {
      slug: 'tammy-lynn-leppert',
      title: 'La Desaparición de Tammy Lynn Leppert',
      summary: 'Una modelo y actriz de "Scarface" desapareció en Florida a los 18 años. Su comportamiento había cambiado antes de desaparecer.',
      status: 'UNSOLVED',
      type: 'DISAPPEARANCE',
      year: 1983,
      country: 'Estados Unidos',
      city: 'Cocoa Beach, Florida',
      mainImageUrl: '/images/cases/tammy.jpg',
      tags: JSON.stringify(['desaparición', 'florida', 'actriz', 'scarface']),
      featured: false,
      content: `## El Caso

El 6 de julio de 1983, Tammy Lynn Leppert, de 18 años, desapareció en Cocoa Beach, Florida. Había aparecido en películas como "Scarface".

## Comportamiento Extraño

Antes de su desaparición, Tammy mostraba comportamiento paranoico y afirmaba que alguien quería matarla.

## Sospechosos

Asesinos seriales activos en la zona han sido investigados sin resultados concluyentes.`,
      viewCount: 45000,
      victims: {
        create: [{
          fullName: 'Tammy Lynn Leppert',
          birthDate: new Date('1965-02-05'),
          birthPlace: 'Rockledge, Florida',
          occupation: 'Modelo y actriz',
          ageAtDeathOrMissing: 18,
          lastSeenDate: new Date('1983-07-06'),
          lastSeenPlace: 'Cocoa Beach, Florida',
          biography: 'Ganó casi 300 concursos de belleza. Apareció en Scarface.',
          status: 'MISSING'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('1983-07-06'), title: 'Desaparición', description: 'Tammy es dejada cerca del Glass Bank Building.', order: 1 },
          { date: new Date('1992-09-01'), title: 'Unsolved Mysteries', description: 'El caso aparece en el programa de TV.', order: 2 }
        ]
      },
      sources: {
        create: [
          { title: 'Unsolved Mysteries', url: 'https://unsolved.com/', publisher: 'Unsolved Mysteries', reliabilityTag: 'MEDIUM' }
        ]
      }
    }
  })

  // Case 30: Caylee Anthony
  await prisma.case.create({
    data: {
      slug: 'caylee-anthony',
      title: 'El Caso Caylee Anthony',
      summary: 'Una niña de 2 años desapareció y su madre no lo reportó durante un mes. Casey Anthony fue absuelta en un juicio controversial.',
      status: 'UNSOLVED',
      type: 'HOMICIDE',
      year: 2008,
      country: 'Estados Unidos',
      city: 'Orlando, Florida',
      mainImageUrl: '/images/cases/caylee.jpg',
      tags: JSON.stringify(['homicidio', 'florida', 'niña', 'juicio controversial']),
      featured: false,
      content: `## El Caso

Caylee Anthony, de 2 años, desapareció en junio de 2008. Su madre Casey no reportó la desaparición durante 31 días.

## El Juicio

Casey Anthony fue acusada de asesinato pero fue absuelta en 2011 en un veredicto que generó indignación pública.

## Controversia

El caso se convirtió en uno de los más mediáticos de Estados Unidos y generó debate sobre el sistema de justicia.`,
      viewCount: 156000,
      victims: {
        create: [{
          fullName: 'Caylee Marie Anthony',
          birthDate: new Date('2005-08-09'),
          birthPlace: 'Orlando, Florida',
          ageAtDeathOrMissing: 2,
          lastSeenDate: new Date('2008-06-16'),
          lastSeenPlace: 'Orlando, Florida',
          deathDate: new Date('2008-06-16'),
          causeOfDeath: 'Homicidio por método indeterminado',
          status: 'DECEASED'
        }]
      },
      timelineEvents: {
        create: [
          { date: new Date('2008-06-16'), title: 'Última vez vista', description: 'Caylee es vista por última vez.', order: 1 },
          { date: new Date('2008-07-15'), title: 'Reporte', description: 'La abuela reporta la desaparición.', order: 2 },
          { date: new Date('2008-12-11'), title: 'Restos encontrados', description: 'Los restos de Caylee son hallados.', order: 3 },
          { date: new Date('2011-07-05'), title: 'Absolución', description: 'Casey Anthony es absuelta de asesinato.', order: 4 }
        ]
      },
      sources: {
        create: [
          { title: 'CNN - Caylee Anthony', url: 'https://www.cnn.com/', publisher: 'CNN', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  console.log('All 30 real cases created successfully!')
  console.log('Database seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
