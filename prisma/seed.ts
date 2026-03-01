import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.source.deleteMany()
  await prisma.evidence.deleteMany()
  await prisma.suspect.deleteMany()
  await prisma.timelineEvent.deleteMany()
  await prisma.victim.deleteMany()
  await prisma.case.deleteMany()

  console.log('Seeding database with real cases...')

  // Case 1: Crimen de Alcàsser (España, 1992)
  await prisma.case.create({
    data: {
      slug: 'crimen-alcasser',
      title: 'El Crimen de Alcàsser',
      summary: 'Tres adolescentes fueron secuestradas, violadas y asesinadas en Alcàsser, Valencia. Uno de los crímenes más mediáticos de España.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 1992,
      country: 'España',
      city: 'Alcàsser, Valencia',
      mainImageUrl: '/images/cases/alcasser.jpg',
      tags: JSON.stringify(['homicidio', 'secuestro', 'españa', 'valencia']),
      featured: true,
      content: `## El Caso

El 13 de noviembre de 1992, tres adolescentes de Alcàsser (Valencia) - Miriam García, Toñi Gómez y Desirée Hernández - desaparecieron cuando hacían autostop para ir a una discoteca en Picassent.

## El Descubrimiento

75 días después, el 27 de enero de 1993, dos apicultores encontraron los cuerpos en una fosa en el paraje de La Romana, en Tous. Las autopsias revelaron que habían sido violadas y torturadas antes de ser asesinadas.

## Los Culpables

Antonio Anglés y Miguel Ricart fueron identificados como los autores. Ricart fue detenido y condenado a 170 años de prisión. Antonio Anglés huyó y sigue en busca y captura, siendo uno de los fugitivos más buscados del mundo.

## Impacto Social

El caso provocó un enorme impacto en la sociedad española y dio lugar a reformas en el Código Penal, incluyendo la introducción de la prisión permanente revisable.`,
      viewCount: 125000,
      victims: {
        create: [
          {
            fullName: 'Miriam García Iborra',
            birthDate: new Date('1978-03-14'),
            birthPlace: 'Alcàsser, Valencia',
            ageAtDeathOrMissing: 14,
            lastSeenDate: new Date('1992-11-13'),
            lastSeenPlace: 'Alcàsser, Valencia',
            deathDate: new Date('1992-11-13'),
            causeOfDeath: 'Homicidio',
            status: 'DECEASED'
          },
          {
            fullName: 'Antonia "Toñi" Gómez Rodríguez',
            birthDate: new Date('1977-08-22'),
            birthPlace: 'Alcàsser, Valencia',
            ageAtDeathOrMissing: 15,
            lastSeenDate: new Date('1992-11-13'),
            lastSeenPlace: 'Alcàsser, Valencia',
            deathDate: new Date('1992-11-13'),
            causeOfDeath: 'Homicidio',
            status: 'DECEASED'
          },
          {
            fullName: 'Desirée Hernández Folch',
            birthDate: new Date('1978-01-05'),
            birthPlace: 'Alcàsser, Valencia',
            ageAtDeathOrMissing: 14,
            lastSeenDate: new Date('1992-11-13'),
            lastSeenPlace: 'Alcàsser, Valencia',
            deathDate: new Date('1992-11-13'),
            causeOfDeath: 'Homicidio',
            status: 'DECEASED'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1992-11-13'), title: 'Desaparición', description: 'Las tres jóvenes desaparecen mientras hacían autostop.', order: 1 },
          { date: new Date('1993-01-27'), title: 'Hallazgo de los cuerpos', description: 'Los cuerpos son encontrados en La Romana, Tous.', order: 2 },
          { date: new Date('1993-01-28'), title: 'Detención de Miguel Ricart', description: 'Ricart es detenido tras ser identificado.', order: 3 },
          { date: new Date('1993-01-29'), title: 'Fuga de Antonio Anglés', description: 'Anglés huye y desaparece sin dejar rastro.', order: 4 },
          { date: new Date('1997-09-05'), title: 'Condena a Ricart', description: 'Miguel Ricart es condenado a 170 años de prisión.', order: 5 }
        ]
      },
      suspects: {
        create: [
          {
            fullName: 'Miguel Ricart',
            role: 'CONFIRMED_PERPETRATOR',
            description: 'Cómplice de Antonio Anglés en los crímenes.',
            convictionDetails: 'Condenado por secuestro, violación y asesinato',
            sentence: '170 años de prisión (salió en libertad en 2013)',
            isConfirmed: true
          },
          {
            fullName: 'Antonio Anglés',
            role: 'CONFIRMED_PERPETRATOR',
            description: 'Principal autor de los crímenes. Fugitivo desde 1993.',
            evidenceAgainst: 'ADN, testimonios, confesión de Ricart',
            isConfirmed: true
          }
        ]
      },
      sources: {
        create: [
          { title: 'El País - Crimen de Alcàsser', url: 'https://elpais.com/tag/caso_alcasser/', publisher: 'El País', reliabilityTag: 'HIGH' },
          { title: 'RTVE - Documentales', url: 'https://www.rtve.es/', publisher: 'RTVE', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 2: Madeleine McCann
  await prisma.case.create({
    data: {
      slug: 'madeleine-mccann',
      title: 'La Desaparición de Madeleine McCann',
      summary: 'Una niña británica de 3 años desapareció de un resort en Portugal. Es uno de los casos de personas desaparecidas más mediatizados del mundo.',
      status: 'UNSOLVED',
      type: 'DISAPPEARANCE',
      year: 2007,
      country: 'Portugal',
      city: 'Praia da Luz, Algarve',
      mainImageUrl: '/images/cases/madeleine.jpg',
      tags: JSON.stringify(['desaparición', 'portugal', 'niña', 'internacional']),
      featured: true,
      content: `## El Caso

El 3 de mayo de 2007, Madeleine Beth McCann, de casi 4 años, desapareció de su habitación en el resort Ocean Club en Praia da Luz, Portugal, mientras sus padres cenaban en un restaurante cercano.

## La Investigación

El caso se convirtió en una de las investigaciones más grandes y mediáticas de la historia. Se han explorado múltiples líneas de investigación, incluyendo secuestro, tráfico de personas y accidente encubierto.

## Christian Brueckner

En 2020, la policía alemana identificó a Christian Brueckner como principal sospechoso. Se trata de un pederasta convicto que vivía en la zona en 2007. La investigación continúa.

## Estado Actual

Madeleine McCann sigue oficialmente desaparecida. El caso permanece abierto y se han gastado millones de euros en la investigación.`,
      viewCount: 250000,
      victims: {
        create: [
          {
            fullName: 'Madeleine Beth McCann',
            birthDate: new Date('2003-05-12'),
            birthPlace: 'Leicester, Reino Unido',
            ageAtDeathOrMissing: 3,
            lastSeenDate: new Date('2007-05-03'),
            lastSeenPlace: 'Praia da Luz, Portugal',
            biography: 'Hija de Kate y Gerry McCann, médicos británicos.',
            status: 'MISSING'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('2007-05-03'), title: 'Desaparición', description: 'Madeleine desaparece de su habitación entre las 21:00 y 22:00.', order: 1 },
          { date: new Date('2007-05-04'), title: 'Búsqueda masiva', description: 'Se inicia una búsqueda masiva en la zona.', order: 2 },
          { date: new Date('2007-09-07'), title: 'Padres nombrados arguidos', description: 'Kate y Gerry McCann son declarados sospechosos formales.', order: 3 },
          { date: new Date('2008-07-21'), title: 'Caso archivado', description: 'La fiscalía portuguesa archiva el caso.', order: 4 },
          { date: new Date('2020-06-03'), title: 'Nuevo sospechoso', description: 'Christian Brueckner identificado como sospechoso principal.', order: 5 }
        ]
      },
      suspects: {
        create: [
          {
            fullName: 'Christian Brueckner',
            role: 'SUSPECT',
            description: 'Pederasta alemán convicto que vivía en la zona en 2007.',
            evidenceAgainst: 'Ubicación, historial criminal, registros telefónicos',
            isConfirmed: false
          }
        ]
      },
      sources: {
        create: [
          { title: 'BBC News - Madeleine McCann', url: 'https://www.bbc.com/news/topics/cg5rv8evpyrt', publisher: 'BBC', reliabilityTag: 'HIGH' },
          { title: 'Find Madeleine', url: 'https://www.findmadeleine.com/', publisher: 'Familia McCann', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 3: La Dalia Negra (Black Dahlia)
  await prisma.case.create({
    data: {
      slug: 'dalia-negra',
      title: 'La Dalia Negra (Black Dahlia)',
      summary: 'Elizabeth Short fue brutalmente asesinada y su cuerpo mutilado fue encontrado en Los Ángeles. Es uno de los casos sin resolver más famosos de EEUU.',
      status: 'UNSOLVED',
      type: 'HOMICIDE',
      year: 1947,
      country: 'Estados Unidos',
      city: 'Los Ángeles, California',
      mainImageUrl: '/images/cases/dalia-negra.jpg',
      tags: JSON.stringify(['homicidio', 'sin resolver', 'hollywood', 'histórico']),
      featured: true,
      content: `## El Caso

El 15 de enero de 1947, el cuerpo mutilado de Elizabeth Short fue encontrado en un terreno baldío en Leimert Park, Los Ángeles. El cuerpo estaba cortado por la mitad a la altura de la cintura y completamente drenado de sangre.

## La Víctima

Elizabeth Short, de 22 años, era una aspirante a actriz de Massachusetts que había llegado a Hollywood buscando fama. El apodo "Dalia Negra" surgió de los medios después de su muerte.

## La Investigación

El caso generó una de las investigaciones más grandes en la historia de LAPD. Se interrogaron a más de 150 sospechosos y se recibieron falsas confesiones, pero nunca se identificó al asesino.

## Legado

El caso ha inspirado numerosos libros, películas y teorías. Permanece oficialmente sin resolver después de más de 75 años.`,
      viewCount: 89000,
      victims: {
        create: [
          {
            fullName: 'Elizabeth Short',
            aliases: JSON.stringify(['La Dalia Negra', 'Black Dahlia']),
            birthDate: new Date('1924-07-29'),
            birthPlace: 'Boston, Massachusetts',
            occupation: 'Aspirante a actriz',
            ageAtDeathOrMissing: 22,
            deathDate: new Date('1947-01-15'),
            causeOfDeath: 'Homicidio - cuerpo mutilado y drenado de sangre',
            biography: 'Joven que llegó a Hollywood buscando ser actriz.',
            status: 'DECEASED'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1947-01-09'), title: 'Última vez vista', description: 'Elizabeth es vista por última vez en el Hotel Biltmore.', order: 1 },
          { date: new Date('1947-01-15'), title: 'Cuerpo encontrado', description: 'Su cuerpo mutilado es hallado en Leimert Park.', order: 2 },
          { date: new Date('1947-01-24'), title: 'Paquete del asesino', description: 'El asesino envía pertenencias de Short a los medios.', order: 3 }
        ]
      },
      sources: {
        create: [
          { title: 'FBI Records - Black Dahlia', url: 'https://vault.fbi.gov/Black%20Dahlia', publisher: 'FBI', reliabilityTag: 'HIGH' },
          { title: 'LAPD Historical Archives', url: 'https://www.lapdonline.org/', publisher: 'LAPD', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 4: JonBenét Ramsey
  await prisma.case.create({
    data: {
      slug: 'jonbenet-ramsey',
      title: 'El Caso JonBenét Ramsey',
      summary: 'Una niña de 6 años, reina de belleza infantil, fue encontrada asesinada en el sótano de su casa en Colorado.',
      status: 'UNSOLVED',
      type: 'HOMICIDE',
      year: 1996,
      country: 'Estados Unidos',
      city: 'Boulder, Colorado',
      mainImageUrl: '/images/cases/jonbenet.jpg',
      tags: JSON.stringify(['homicidio', 'niña', 'colorado', 'sin resolver']),
      featured: true,
      content: `## El Caso

El 26 de diciembre de 1996, JonBenét Ramsey, de 6 años, fue encontrada muerta en el sótano de su casa en Boulder, Colorado. Esa mañana, su madre había encontrado una nota de rescate de tres páginas.

## La Investigación

La policía cometió errores críticos en la escena del crimen. La familia estuvo bajo sospecha durante años, pero un jurado en 1999 recomendó acusar a los padres. Sin embargo, el fiscal se negó a presentar cargos.

## ADN

En 2008, pruebas de ADN exoneraron oficialmente a la familia Ramsey. El ADN masculino encontrado en la ropa de JonBenét no coincide con nadie de la familia.

## Estado Actual

El caso sigue abierto. En 2022, la policía de Boulder anunció que continuaría investigando usando nuevas tecnologías de ADN.`,
      viewCount: 156000,
      victims: {
        create: [
          {
            fullName: 'JonBenét Patricia Ramsey',
            birthDate: new Date('1990-08-06'),
            birthPlace: 'Atlanta, Georgia',
            occupation: 'Reina de belleza infantil',
            ageAtDeathOrMissing: 6,
            deathDate: new Date('1996-12-25'),
            causeOfDeath: 'Asfixia y traumatismo craneal',
            biography: 'Participante en concursos de belleza infantil.',
            status: 'DECEASED'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1996-12-25'), title: 'Navidad', description: 'La familia celebra Navidad normalmente.', order: 1 },
          { date: new Date('1996-12-26'), title: 'Nota de rescate', description: 'Patsy Ramsey encuentra nota pidiendo $118,000.', order: 2 },
          { date: new Date('1996-12-26'), title: 'Cuerpo encontrado', description: 'John Ramsey encuentra el cuerpo en el sótano.', order: 3 },
          { date: new Date('2008-07-09'), title: 'Familia exonerada', description: 'Pruebas de ADN exoneran a la familia.', order: 4 }
        ]
      },
      sources: {
        create: [
          { title: 'Boulder Police Department', url: 'https://bouldercolorado.gov/police', publisher: 'Ciudad de Boulder', reliabilityTag: 'HIGH' },
          { title: 'CNN - JonBenét Ramsey', url: 'https://www.cnn.com/2013/08/29/us/jonbenet-ramsey-murder-fast-facts/index.html', publisher: 'CNN', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 5: Paulette Gebara Farah
  await prisma.case.create({
    data: {
      slug: 'caso-paulette',
      title: 'El Caso Paulette Gebara Farah',
      summary: 'Una niña mexicana de 4 años desapareció de su cama y fue encontrada muerta 9 días después en su propia habitación.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 2010,
      country: 'México',
      city: 'Huixquilucan, Estado de México',
      mainImageUrl: '/images/cases/paulette.jpg',
      tags: JSON.stringify(['homicidio', 'méxico', 'niña', 'mediático']),
      featured: true,
      content: `## El Caso

El 22 de marzo de 2010, Paulette Gebara Farah, de 4 años, fue reportada como desaparecida de su habitación en un exclusivo fraccionamiento de Huixquilucan.

## El Hallazgo

Después de 9 días de búsqueda mediática, el cuerpo de Paulette fue encontrado envuelto en sábanas al pie de su propia cama, en la misma habitación que había sido revisada múltiples veces.

## La Investigación

Las autoridades inicialmente declararon muerte accidental por asfixia, pero las circunstancias generaron enorme controversia. La madre, Lizette Farah, enfrentó cargos pero estos fueron desestimados.

## Controversia

El caso generó una crisis en la Procuraduría del Estado de México y múltiples teorías sobre encubrimiento.`,
      viewCount: 98000,
      victims: {
        create: [
          {
            fullName: 'Paulette Gebara Farah',
            birthDate: new Date('2005-11-20'),
            birthPlace: 'Ciudad de México',
            ageAtDeathOrMissing: 4,
            lastSeenDate: new Date('2010-03-21'),
            lastSeenPlace: 'Su habitación en Huixquilucan',
            deathDate: new Date('2010-03-21'),
            causeOfDeath: 'Asfixia (versión oficial)',
            biography: 'Niña de clase alta con discapacidad motriz leve.',
            status: 'DECEASED'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('2010-03-22'), title: 'Desaparición reportada', description: 'Los padres reportan la desaparición de Paulette.', order: 1 },
          { date: new Date('2010-03-23'), title: 'Entrevistas televisivas', description: 'Los padres aparecen en múltiples programas de TV.', order: 2 },
          { date: new Date('2010-03-31'), title: 'Cuerpo encontrado', description: 'El cuerpo es hallado en su propia cama.', order: 3 },
          { date: new Date('2010-04-08'), title: 'Dictamen oficial', description: 'Procuraduría declara muerte accidental.', order: 4 }
        ]
      },
      sources: {
        create: [
          { title: 'Proceso - Caso Paulette', url: 'https://www.proceso.com.mx/', publisher: 'Proceso', reliabilityTag: 'HIGH' },
          { title: 'El Universal', url: 'https://www.eluniversal.com.mx/', publisher: 'El Universal', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  console.log('First 5 cases created. Creating more...')

  // Case 6: María Marta García Belsunce
  await prisma.case.create({
    data: {
      slug: 'maria-marta-garcia-belsunce',
      title: 'El Caso María Marta García Belsunce',
      summary: 'Una socióloga argentina fue encontrada muerta en su casa. Inicialmente se creyó un accidente, pero se descubrió que fue asesinada con 5 disparos.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 2002,
      country: 'Argentina',
      city: 'Pilar, Buenos Aires',
      mainImageUrl: '/images/cases/maria-marta.jpg',
      tags: JSON.stringify(['homicidio', 'argentina', 'country', 'encubrimiento']),
      featured: true,
      content: `## El Caso

El 27 de octubre de 2002, María Marta García Belsunce fue encontrada muerta en la bañera de su casa en el country Carmel de Pilar. Inicialmente se reportó como un accidente doméstico.

## El Descubrimiento

Durante la preparación del cuerpo para el velatorio, se descubrieron cinco orificios de bala en su cabeza. La familia había ocultado las balas con masilla.

## El Juicio

Carlos Carrascosa, esposo de María Marta, fue condenado por encubrimiento y luego por homicidio. Pasó años en prisión antes de ser absuelto en 2020.

## Nicolás Pachelo

En 2022, Nicolás Pachelo, vecino del country, fue condenado a prisión perpetua como autor del homicidio.`,
      viewCount: 87000,
      victims: {
        create: [
          {
            fullName: 'María Marta García Belsunce',
            birthDate: new Date('1958-10-05'),
            birthPlace: 'Buenos Aires, Argentina',
            occupation: 'Socióloga',
            ageAtDeathOrMissing: 44,
            deathDate: new Date('2002-10-27'),
            causeOfDeath: 'Cinco disparos en la cabeza',
            biography: 'Socióloga dedicada a obras de caridad.',
            status: 'DECEASED'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('2002-10-27'), title: 'Muerte', description: 'María Marta es encontrada muerta en su bañera.', order: 1 },
          { date: new Date('2002-10-28'), title: 'Descubrimiento de balas', description: 'Se descubren los orificios de bala.', order: 2 },
          { date: new Date('2007-06-28'), title: 'Condena a Carrascosa', description: 'Carlos Carrascosa es condenado por encubrimiento.', order: 3 },
          { date: new Date('2022-08-03'), title: 'Condena a Pachelo', description: 'Nicolás Pachelo es condenado a perpetua.', order: 4 }
        ]
      },
      suspects: {
        create: [
          {
            fullName: 'Nicolás Pachelo',
            role: 'CONFIRMED_PERPETRATOR',
            description: 'Vecino del country con historial delictivo.',
            convictionDetails: 'Condenado por homicidio calificado',
            sentence: 'Prisión perpetua',
            isConfirmed: true
          }
        ]
      },
      sources: {
        create: [
          { title: 'Infobae - Caso García Belsunce', url: 'https://www.infobae.com/', publisher: 'Infobae', reliabilityTag: 'HIGH' },
          { title: 'La Nación', url: 'https://www.lanacion.com.ar/', publisher: 'La Nación', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 7: Zodiac Killer
  await prisma.case.create({
    data: {
      slug: 'zodiac-killer',
      title: 'El Asesino del Zodiaco (Zodiac Killer)',
      summary: 'Un asesino serial que aterrorizó el norte de California en los años 60 y 70, enviando cartas cifradas a los periódicos.',
      status: 'UNSOLVED',
      type: 'SERIAL_KILLER',
      year: 1968,
      country: 'Estados Unidos',
      city: 'San Francisco, California',
      mainImageUrl: '/images/cases/zodiac.jpg',
      tags: JSON.stringify(['serial killer', 'sin resolver', 'california', 'cifrado']),
      featured: true,
      content: `## El Caso

El Asesino del Zodiaco operó en el norte de California entre 1968 y 1969, confirmando cinco víctimas mortales aunque él mismo afirmó haber matado a 37 personas.

## Las Cartas

El asesino enviaba cartas a los periódicos locales burlándose de la policía e incluyendo criptogramas. Uno de ellos fue descifrado recién en 2020.

## Los Crímenes

Los asesinatos confirmados incluyen parejas atacadas en sus autos y un taxista. El asesino usaba diferentes armas y métodos.

## Estado Actual

A pesar de décadas de investigación y miles de sospechosos, la identidad del Zodiac nunca fue confirmada. El caso sigue oficialmente abierto.`,
      viewCount: 145000,
      victims: {
        create: [
          { fullName: 'David Faraday', birthDate: new Date('1951-10-25'), ageAtDeathOrMissing: 17, deathDate: new Date('1968-12-20'), causeOfDeath: 'Disparo', status: 'DECEASED' },
          { fullName: 'Betty Lou Jensen', birthDate: new Date('1952-04-21'), ageAtDeathOrMissing: 16, deathDate: new Date('1968-12-20'), causeOfDeath: 'Disparos', status: 'DECEASED' }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1968-12-20'), title: 'Primer ataque', description: 'David Faraday y Betty Lou Jensen son asesinados.', order: 1 },
          { date: new Date('1969-07-04'), title: 'Segundo ataque', description: 'Darlene Ferrin y Michael Mageau son atacados.', order: 2 },
          { date: new Date('1969-08-01'), title: 'Primera carta', description: 'Zodiac envía su primera carta a los periódicos.', order: 3 },
          { date: new Date('1969-10-11'), title: 'Asesinato de Paul Stine', description: 'El taxista Paul Stine es asesinado.', order: 4 }
        ]
      },
      sources: {
        create: [
          { title: 'FBI - Zodiac Killer', url: 'https://www.fbi.gov/wanted/seeking-info/zodiac-killer', publisher: 'FBI', reliabilityTag: 'HIGH' },
          { title: 'San Francisco Chronicle', url: 'https://www.sfchronicle.com/', publisher: 'SF Chronicle', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 8: Diana Quer
  await prisma.case.create({
    data: {
      slug: 'caso-diana-quer',
      title: 'El Caso Diana Quer',
      summary: 'Una joven madrileña desapareció en Galicia durante las fiestas locales. Su cuerpo fue encontrado 496 días después.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 2016,
      country: 'España',
      city: 'A Pobra do Caramiñal, Galicia',
      mainImageUrl: '/images/cases/diana-quer.jpg',
      tags: JSON.stringify(['homicidio', 'galicia', 'españa', 'secuestro']),
      featured: true,
      content: `## El Caso

El 22 de agosto de 2016, Diana Quer López, de 18 años, desapareció cuando regresaba a casa tras las fiestas de A Pobra do Caramiñal, Galicia, donde veraneaba.

## La Búsqueda

Durante 496 días se realizó una intensa búsqueda. El caso tuvo enorme repercusión mediática y se convirtió en símbolo de la lucha contra la violencia de género.

## El Hallazgo

El 31 de diciembre de 2017, el cuerpo de Diana fue encontrado en un pozo en una nave abandonada en Rianxo.

## El Culpable

José Enrique Abuín, "El Chicle", fue condenado a prisión permanente revisable por el secuestro, agresión sexual y asesinato de Diana.`,
      viewCount: 112000,
      victims: {
        create: [
          {
            fullName: 'Diana Quer López',
            birthDate: new Date('1998-01-24'),
            birthPlace: 'Madrid, España',
            ageAtDeathOrMissing: 18,
            lastSeenDate: new Date('2016-08-22'),
            lastSeenPlace: 'A Pobra do Caramiñal, Galicia',
            deathDate: new Date('2016-08-22'),
            causeOfDeath: 'Estrangulamiento',
            status: 'DECEASED'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('2016-08-22'), title: 'Desaparición', description: 'Diana desaparece tras las fiestas locales.', order: 1 },
          { date: new Date('2016-08-23'), title: 'Denuncia', description: 'La familia denuncia su desaparición.', order: 2 },
          { date: new Date('2017-12-29'), title: 'Detención', description: 'José Enrique Abuín es detenido.', order: 3 },
          { date: new Date('2017-12-31'), title: 'Hallazgo del cuerpo', description: 'El cuerpo es encontrado en Rianxo.', order: 4 },
          { date: new Date('2019-11-22'), title: 'Condena', description: 'Abuín es condenado a prisión permanente revisable.', order: 5 }
        ]
      },
      suspects: {
        create: [
          {
            fullName: 'José Enrique Abuín Gey',
            aliases: JSON.stringify(['El Chicle']),
            role: 'CONFIRMED_PERPETRATOR',
            description: 'Vecino de la zona con antecedentes.',
            convictionDetails: 'Secuestro, agresión sexual y asesinato',
            sentence: 'Prisión permanente revisable',
            isConfirmed: true
          }
        ]
      },
      sources: {
        create: [
          { title: 'El Mundo - Caso Diana Quer', url: 'https://www.elmundo.es/', publisher: 'El Mundo', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 9: Marta del Castillo
  await prisma.case.create({
    data: {
      slug: 'marta-del-castillo',
      title: 'El Caso Marta del Castillo',
      summary: 'Una adolescente sevillana fue asesinada por su exnovio. Su cuerpo nunca ha sido encontrado a pesar de múltiples búsquedas.',
      status: 'SOLVED',
      type: 'HOMICIDE',
      year: 2009,
      country: 'España',
      city: 'Sevilla, Andalucía',
      mainImageUrl: '/images/cases/marta-castillo.jpg',
      tags: JSON.stringify(['homicidio', 'sevilla', 'españa', 'cuerpo no encontrado']),
      featured: true,
      content: `## El Caso

El 24 de enero de 2009, Marta del Castillo Casanueva, de 17 años, desapareció en Sevilla. Fue asesinada por su exnovio Miguel Carcaño.

## La Confesión

Miguel Carcaño confesó el crimen pero ha dado múltiples versiones contradictorias sobre qué hizo con el cuerpo. Se han realizado más de 20 búsquedas sin éxito.

## El Juicio

Carcaño fue condenado a 21 años y 3 meses de prisión por asesinato. Otros implicados recibieron condenas menores.

## El Cuerpo

A pesar de los años transcurridos, el cuerpo de Marta nunca ha sido encontrado. Su familia continúa exigiendo que se revele la ubicación.`,
      viewCount: 94000,
      victims: {
        create: [
          {
            fullName: 'Marta del Castillo Casanueva',
            birthDate: new Date('1991-03-25'),
            birthPlace: 'Sevilla, España',
            ageAtDeathOrMissing: 17,
            lastSeenDate: new Date('2009-01-24'),
            lastSeenPlace: 'Piso de Miguel Carcaño, Sevilla',
            deathDate: new Date('2009-01-24'),
            causeOfDeath: 'Homicidio (cuerpo no recuperado)',
            status: 'DECEASED'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('2009-01-24'), title: 'Desaparición/Asesinato', description: 'Marta desaparece tras visitar a su exnovio.', order: 1 },
          { date: new Date('2009-02-17'), title: 'Detenciones', description: 'Miguel Carcaño y otros son detenidos.', order: 2 },
          { date: new Date('2009-02-18'), title: 'Confesión', description: 'Carcaño confiesa el asesinato.', order: 3 },
          { date: new Date('2011-11-14'), title: 'Condena', description: 'Carcaño es condenado a más de 21 años.', order: 4 }
        ]
      },
      suspects: {
        create: [
          {
            fullName: 'Miguel Carcaño',
            role: 'CONFIRMED_PERPETRATOR',
            description: 'Exnovio de Marta.',
            convictionDetails: 'Asesinato',
            sentence: '21 años y 3 meses de prisión',
            isConfirmed: true
          }
        ]
      },
      sources: {
        create: [
          { title: 'ABC Sevilla', url: 'https://sevilla.abc.es/', publisher: 'ABC', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  // Case 10: Elisa Lam
  await prisma.case.create({
    data: {
      slug: 'caso-elisa-lam',
      title: 'El Misterio de Elisa Lam',
      summary: 'Una estudiante canadiense fue encontrada muerta en el tanque de agua del Hotel Cecil en Los Ángeles. El video del ascensor generó miles de teorías.',
      status: 'SOLVED',
      type: 'OTHER',
      year: 2013,
      country: 'Estados Unidos',
      city: 'Los Ángeles, California',
      mainImageUrl: '/images/cases/elisa-lam.jpg',
      tags: JSON.stringify(['muerte misteriosa', 'hotel cecil', 'video viral']),
      featured: true,
      content: `## El Caso

El 19 de febrero de 2013, el cuerpo de Elisa Lam fue encontrado en uno de los tanques de agua del Hotel Cecil en Los Ángeles, 19 días después de su desaparición.

## El Video

Un video de vigilancia mostró a Elisa comportándose de manera extraña en el ascensor del hotel, lo que generó miles de teorías conspirativas.

## La Investigación

La autopsia determinó que la muerte fue accidental por ahogamiento, con el trastorno bipolar de Elisa como factor contribuyente.

## El Hotel Cecil

El hotel tiene un largo historial de muertes y fue residencia de asesinos seriales como Richard Ramirez.`,
      viewCount: 178000,
      victims: {
        create: [
          {
            fullName: 'Elisa Lam',
            birthDate: new Date('1991-04-30'),
            birthPlace: 'Vancouver, Canadá',
            occupation: 'Estudiante universitaria',
            ageAtDeathOrMissing: 21,
            lastSeenDate: new Date('2013-01-31'),
            lastSeenPlace: 'Hotel Cecil, Los Ángeles',
            deathDate: new Date('2013-02-01'),
            causeOfDeath: 'Ahogamiento accidental',
            biography: 'Estudiante de UBC que viajaba sola por California.',
            status: 'DECEASED'
          }
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('2013-01-26'), title: 'Check-in', description: 'Elisa se registra en el Hotel Cecil.', order: 1 },
          { date: new Date('2013-01-31'), title: 'Última vez vista', description: 'Video del ascensor es la última imagen.', order: 2 },
          { date: new Date('2013-02-19'), title: 'Cuerpo encontrado', description: 'Su cuerpo es hallado en el tanque de agua.', order: 3 },
          { date: new Date('2013-06-20'), title: 'Resultado autopsia', description: 'Se determina muerte accidental.', order: 4 }
        ]
      },
      sources: {
        create: [
          { title: 'Los Angeles Times', url: 'https://www.latimes.com/', publisher: 'LA Times', reliabilityTag: 'HIGH' },
          { title: 'Netflix - Escena del Crimen', url: 'https://www.netflix.com/', publisher: 'Netflix', reliabilityTag: 'MEDIUM' }
        ]
      }
    }
  })

  console.log('First 10 cases created successfully!')
  console.log('Run "npm run db:seed:part2" to add more cases')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
