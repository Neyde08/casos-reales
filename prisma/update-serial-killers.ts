import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateDahmer() {
  console.log('Actualizando Jeffrey Dahmer...')

  const existingCase = await prisma.case.findFirst({ where: { slug: 'jeffrey-dahmer' } })
  if (existingCase) {
    await prisma.source.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.evidence.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.suspect.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.timelineEvent.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.victim.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.case.delete({ where: { id: existingCase.id } })
  }

  await prisma.case.create({
    data: {
      slug: 'jeffrey-dahmer',
      title: 'Las Víctimas de Jeffrey Dahmer',
      summary: '17 hombres y jóvenes perdieron la vida a manos del "Caníbal de Milwaukee" entre 1978 y 1991. Esta es su historia.',
      status: 'SOLVED',
      type: 'SERIAL_KILLER',
      year: 1991,
      country: 'Estados Unidos',
      city: 'Milwaukee, Wisconsin',
      mainImageUrl: '/images/cases/jeffrey-dahmer.jpg',
      tags: JSON.stringify(['serial killer', 'milwaukee', 'víctimas', 'LGBT']),
      featured: true,
      content: `## Las 17 Víctimas

Entre 1978 y 1991, diecisiete hombres y jóvenes perdieron la vida a manos de Jeffrey Dahmer. Muchos eran jóvenes afroamericanos, latinos y asiáticos de comunidades marginadas. Sus familias lucharon durante años para obtener justicia y reconocimiento.

## Quienes Eran las Víctimas

Las víctimas de Dahmer no eran solo números en una lista. Eran hijos, hermanos, padres y amigos. Muchos tenían sueños y aspiraciones truncados:

- **Steven Hicks** soñaba con asistir a un concierto de rock
- **Anthony Sears** era un modelo aspirante con un futuro prometedor
- **Curtis Straughter** era un estudiante que esperaba el autobus para ir a la escuela
- **Konerak Sinthasomphone** era un niño de 14 años cuya familia había huido de Laos buscando seguridad
- **Tony Hughes** era un hombre sordo que se comunicaba con lenguaje de senas y era conocido por su sonrisa amable

## El Fallo del Sistema

El caso de Dahmer expusó fallas graves en el sistema:

1. **Racismo institucional**: La policía ignoró multiples advertencias porque las víctimas eran minorias
2. **El caso de Konerak**: En mayo de 1991, Konerak escapó del apartamento de Dahmer. Los vecinos llamaron al 911, pero la policía le devolvió el niño a Dahmer, quien lo asesinó esa misma noche
3. **Falta de seguimiento**: Dahmer ya tenia antecedentes por abuso sexual de menores

## Sobre el Perpetrador (Contexto)

Jeffrey Dahmer (1960-1994) tuvo una infancia marcada por:
- Padres con matrimonio conflictivo y madre con problemas de salud mental
- Cirugia de hernia a los 6 años que cambió su personalidad
- Aislamiento social extremo y alcoholismo desde la adolescencia
- Fascinacion mórbida con animales muertos desde niño
- Conflicto con su identidad sexual en una época de estigma

Estos factores NO justifican sus crimenes, pero ayudan a entender como el sistema falló en identificar y tratar a alguien claramente perturbado.

## Legado y Memoria

Las familias de las víctimas han luchado por mantener viva la memoria de sus seres queridos, oponiendose a la glorificación del asesino en medios y series de televisión.`,
      viewCount: 245000,
      victims: {
        create: [
          {
            fullName: 'Steven Mark Hicks',
            birthDate: new Date('1959-06-22'),
            birthPlace: 'Coventry Township, Ohio',
            occupation: 'Recien graduado de preparatoria',
            ageAtDeathOrMissing: 18,
            lastSeenDate: new Date('1978-06-18'),
            lastSeenPlace: 'Bath Township, Ohio',
            deathDate: new Date('1978-06-18'),
            causeOfDeath: 'Golpes y estrangulamiento',
            biography: 'Steven era un joven que acababa de graduarse de la preparatoria. El día de su muerte, hacía autostop para ir a un concierto de rock. Le gustaba la música y tenía toda una vida por delante. Fue la primera víctima de Dahmer.',
            status: 'DECEASED'
          },
          {
            fullName: 'Steven Walter Tuomi',
            birthDate: new Date('1962-01-01'),
            birthPlace: 'Ontonagon, Michigan',
            occupation: 'Trabajador de restaurante',
            ageAtDeathOrMissing: 25,
            lastSeenDate: new Date('1987-09-15'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1987-09-15'),
            causeOfDeath: 'Golpes (Dahmer afirmo no recordar)',
            biography: 'Steven había crecido en el norte de Michigan y se había mudado a Milwaukee buscando trabajo. Era conocido como una persona tranquila y amable.',
            status: 'DECEASED'
          },
          {
            fullName: 'James Doxtator',
            birthDate: new Date('1973-03-01'),
            birthPlace: 'Milwaukee, Wisconsin',
            ageAtDeathOrMissing: 14,
            lastSeenDate: new Date('1988-01-16'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1988-01-16'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'James era un adolescente nativo americano de solo 14 años. Su desaparición fue reportada pero recibió poca atención de las autoridades. Su madre luchó durante años para encontrar respuestas.',
            status: 'DECEASED'
          },
          {
            fullName: 'Richard Guerrero',
            birthDate: new Date('1963-12-12'),
            birthPlace: 'Milwaukee, Wisconsin',
            ageAtDeathOrMissing: 24,
            lastSeenDate: new Date('1988-03-24'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1988-03-24'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Richard era un joven mexicano-americano que vivia con su familia en Milwaukee. Era conocido por su sentido del humor y su cercania con sus hermanos.',
            status: 'DECEASED'
          },
          {
            fullName: 'Anthony Lee Sears',
            birthDate: new Date('1965-01-28'),
            birthPlace: 'Milwaukee, Wisconsin',
            occupation: 'Aspirante a modelo, gerente de restaurante',
            ageAtDeathOrMissing: 24,
            lastSeenDate: new Date('1989-03-25'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1989-03-25'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Anthony era un joven ambicioso que soñaba con ser modelo. Trabajaba como gerente de un restaurante mientras perseguia su sueno. Su madre lo describía como un hijo amoroso que siempre llamaba a casa.',
            status: 'DECEASED'
          },
          {
            fullName: 'Raymond Lamont Smith',
            aliases: JSON.stringify(['Ricky Beeks']),
            birthDate: new Date('1957-08-10'),
            birthPlace: 'Milwaukee, Wisconsin',
            occupation: 'Trabajador sexual',
            ageAtDeathOrMissing: 32,
            lastSeenDate: new Date('1990-05-20'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1990-05-20'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Raymond, conocido tambien como Ricky, era padre de una hija. A pesar de las dificultades en su vida, mantenía contacto con su familia.',
            status: 'DECEASED'
          },
          {
            fullName: 'Edward Warren Smith',
            birthDate: new Date('1962-08-02'),
            birthPlace: 'Milwaukee, Wisconsin',
            occupation: 'Trabajador',
            ageAtDeathOrMissing: 27,
            lastSeenDate: new Date('1990-06-14'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1990-06-14'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Edward era un hombre de 27 años que vivia en Milwaukee. Su familia lo recuerda como alguien con un corazón bondadoso.',
            status: 'DECEASED'
          },
          {
            fullName: 'Ernest Marquez Miller',
            birthDate: new Date('1967-09-05'),
            birthPlace: 'Chicago, Illinois',
            occupation: 'Estudiante de danza',
            ageAtDeathOrMissing: 22,
            lastSeenDate: new Date('1990-09-02'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1990-09-02'),
            causeOfDeath: 'Degollamiento',
            biography: 'Ernest era un joven apasionado por la danza que había venido de Chicago. Sonaba con ser bailarin profesional y era conocido por su energia y creatividad.',
            status: 'DECEASED'
          },
          {
            fullName: 'David Courtney Thomas',
            birthDate: new Date('1968-12-21'),
            birthPlace: 'Milwaukee, Wisconsin',
            ageAtDeathOrMissing: 22,
            lastSeenDate: new Date('1990-09-24'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1990-09-24'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'David era padre de una nina. Su familia lo describía como alguien que amaba a su hija y siempre trataba de estar presente para ella.',
            status: 'DECEASED'
          },
          {
            fullName: 'Curtis Durrell Straughter',
            birthDate: new Date('1973-04-06'),
            birthPlace: 'Milwaukee, Wisconsin',
            occupation: 'Estudiante',
            ageAtDeathOrMissing: 17,
            lastSeenDate: new Date('1991-02-18'),
            lastSeenPlace: 'Parada de autobus cerca de Marquette University',
            deathDate: new Date('1991-02-18'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Curtis era un estudiante de 17 años que esperaba el autobus para ir a la escuela cuando desapareció. Era criado por su abuela, quien lo adoraba y nunca dejó de buscarlo.',
            status: 'DECEASED'
          },
          {
            fullName: 'Errol Lindsey',
            birthDate: new Date('1972-03-03'),
            birthPlace: 'Milwaukee, Wisconsin',
            occupation: 'Estudiante',
            ageAtDeathOrMissing: 19,
            lastSeenDate: new Date('1991-04-07'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1991-04-07'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Errol era un joven de 19 años muy cercano a su familia. Su hermana Rita ha sido una de las voces mas fuertes en mantener viva la memoria de las víctimas y oponerse a la glorificación de Dahmer.',
            status: 'DECEASED'
          },
          {
            fullName: 'Tony Anthony Hughes',
            birthDate: new Date('1959-08-26'),
            birthPlace: 'Madison, Wisconsin',
            occupation: 'Aspirante a modelo',
            ageAtDeathOrMissing: 31,
            lastSeenDate: new Date('1991-05-24'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1991-05-24'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Tony era sordo desde los 5 años debido a una reacción a medicamentos. A pesar de esto, era conocido por su personalidad alegre y su hermosa sonrisa. Sonaba con ser modelo y era muy querido en la comunidad sorda de Milwaukee.',
            status: 'DECEASED'
          },
          {
            fullName: 'Konerak Sinthasomphone',
            birthDate: new Date('1976-12-01'),
            birthPlace: 'Laos (refugiado)',
            occupation: 'Estudiante de secundaria',
            ageAtDeathOrMissing: 14,
            lastSeenDate: new Date('1991-05-27'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1991-05-27'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Konerak era un niño de 14 años cuya familia había huido de Laos como refugiados buscando una vida mejor en Estados Unidos. Logro escapar del apartamento de Dahmer, pero la policía lo devolvió a su asesinó ignorando las suplicas de los vecinos. Su caso simboliza el racismo institucional que permitió que Dahmer continúara matando.',
            status: 'DECEASED'
          },
          {
            fullName: 'Matt Cleveland Turner',
            aliases: JSON.stringify(['Donald Montrell']),
            birthDate: new Date('1970-07-30'),
            birthPlace: 'Flint, Michigan',
            ageAtDeathOrMissing: 20,
            lastSeenDate: new Date('1991-06-30'),
            lastSeenPlace: 'Chicago, Illinois',
            deathDate: new Date('1991-06-30'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Matt era un joven de 20 años que vivia en Chicago. Habia tenido una vida dificil pero mantenía la esperanza de un futuro mejor.',
            status: 'DECEASED'
          },
          {
            fullName: 'Jeremiah Benjamin Weinberger',
            birthDate: new Date('1967-10-29'),
            birthPlace: 'Puerto Rico',
            occupation: 'Asistente de cuidado de personas mayores',
            ageAtDeathOrMissing: 23,
            lastSeenDate: new Date('1991-07-05'),
            lastSeenPlace: 'Chicago, Illinois',
            deathDate: new Date('1991-07-05'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Jeremiah era de ascendencia judia y puertorriquena. Trabajaba cuidando personas mayores y era conocido por su compasión y amabilidad. Lo conoció en un bar de Chicago y aceptó viajar a Milwaukee.',
            status: 'DECEASED'
          },
          {
            fullName: 'Oliver Joseph Lacy',
            birthDate: new Date('1967-06-23'),
            birthPlace: 'Milwaukee, Wisconsin',
            occupation: 'Trabajador de fábrica',
            ageAtDeathOrMissing: 24,
            lastSeenDate: new Date('1991-07-12'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1991-07-12'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Oliver era padre de un hijo de 2 años y estaba comprometido para casarse. Trabajaba en una fábrica y era conocido como un padre amoroso y dedicado. Su prometida y su hijo quedaron devastados por su pérdida.',
            status: 'DECEASED'
          },
          {
            fullName: 'Joseph Arthur Bradehoft',
            birthDate: new Date('1966-01-24'),
            birthPlace: 'Minnesota',
            occupation: 'Trabajador, padre de familia',
            ageAtDeathOrMissing: 25,
            lastSeenDate: new Date('1991-07-19'),
            lastSeenPlace: 'Milwaukee, Wisconsin',
            deathDate: new Date('1991-07-19'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Joseph era padre de tres hijos y había viajado a Milwaukee buscando trabajo para mantener a su familia. Fue la ultima víctima de Dahmer, asesinado solo tres dias antes de que el asesino fuera finalmente capturado.',
            status: 'DECEASED'
          },
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1978-06-18'), title: 'Primera víctima: Steven Hicks', description: 'Steven Hicks, de 18 años, es asesinado en Ohio.', order: 1 },
          { date: new Date('1987-09-15'), title: 'Asesinatos reanudan', description: 'Despues de 9 años, Dahmer mata a Steven Tuomi.', order: 2 },
          { date: new Date('1991-05-27'), title: 'Tragedia de Konerak', description: 'Konerak Sinthasomphone escapa pero la policía lo devuelve a Dahmer.', order: 3 },
          { date: new Date('1991-07-19'), title: 'Ultima víctima', description: 'Joseph Bradehoft, padre de 3, es la víctima número 17.', order: 4 },
          { date: new Date('1991-07-22'), title: 'Captura', description: 'Tracy Edwards escapa y alerta a la policía. Dahmer es arrestado.', order: 5 },
          { date: new Date('1992-02-17'), title: 'Condena', description: 'Dahmer es condenado a 15 cadenas perpetuas consecutivas.', order: 6 },
          { date: new Date('1994-11-28'), title: 'Muerte de Dahmer', description: 'Dahmer es asesinado en prisión por otro reclusó.', order: 7 },
        ]
      },
      suspects: {
        create: [{
          fullName: 'Jeffrey Lionel Dahmer',
          aliases: JSON.stringify(['El Caníbal de Milwaukee', 'Milwaukee Monster']),
          role: 'CONFIRMED_PERPETRATOR',
          description: 'Nacido el 21 de mayo de 1960 en Milwaukee. Infancia marcada por padres en conflicto, madre con problemas mentales, cirugía traumática a los 6 años que cambió su personalidad. Desarrollo aislamiento extremo, alcoholismo adolescente y fascinacion mórbida con la muerte. Diagnosticado con trastorno limite y esquizotipico de personalidad, pero declarado legalmente cuerdo.',
          method: 'Drogaba a sus víctimas, las estrangulaba, las desmembraba y en algunos casos practico canibalismo y necrofilia.',
          convictionDetails: '15 cargos de homicidio en Wisconsin, 1 en Ohio',
          sentence: '16 cadenas perpetuas (asesinado en prisión en 1994)',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'FBI - Serial Killers Part 7: Jeffrey Dahmer', url: 'https://www.fbi.gov/news/stories/serial-killers-part-7-jeffrey-dahmer', publisher: 'FBI', reliabilityTag: 'HIGH' },
          { title: 'Britannica - Jeffrey Dahmer', url: 'https://www.britannica.com/biography/Jeffrey-Dahmer', publisher: 'Britannica', reliabilityTag: 'HIGH' },
        ]
      }
    }
  })
  console.log('Jeffrey Dahmer actualizado con 17 víctimas!')
}

async function updateGacy() {
  console.log('Actualizando John Wayne Gacy...')

  const existingCase = await prisma.case.findFirst({ where: { slug: 'john-wayne-gacy' } })
  if (existingCase) {
    await prisma.source.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.evidence.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.suspect.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.timelineEvent.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.victim.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.case.delete({ where: { id: existingCase.id } })
  }

  await prisma.case.create({
    data: {
      slug: 'john-wayne-gacy',
      title: 'Las Víctimas del Payaso Asesino',
      summary: '33 jóvenes fueron asesinados por John Wayne Gacy entre 1972 y 1978. Muchos aun no han sido identificados.',
      status: 'SOLVED',
      type: 'SERIAL_KILLER',
      year: 1978,
      country: 'Estados Unidos',
      city: 'Chicago, Illinois',
      mainImageUrl: '/images/cases/placeholder-serial.svg',
      tags: JSON.stringify(['serial killer', 'chicago', 'víctimas sin identificar', 'jóvenes']),
      featured: true,
      content: `## Las 33 Víctimas

Entre 1972 y 1978, al menos 33 jóvenes fueron asesinados por John Wayne Gacy en el área de Chicago. La mayoría eran adolescentes y jóvenes adultos. Hasta el día de hoy, 5 víctimas permanecen sin identificar.

## Las Víctimas Sin Nombre

El caso de Gacy es trágico no solo por el número de víctimas, sino porque muchas eran jóvenes fugitivos o marginados cuya desaparición no fue reportada.

En 2021, gracias a tecnología de ADN, se logró identificar a Francis Wayne Alexander, quien había permanecido como "Víctima Desconocida" durante más de 40 años. Los esfuerzos por identificar a las víctimas restantes continúan.

## Quienes Eran

Las víctimas de Gacy eran principalmente:
- Adolescentes que trabajaban para su empresa de construcción
- Jóvenes que buscaban empleo
- Jóvenes de la comunidad local

Muchos venían de familias trabajadoras y tenían sueños de un futuro mejor.

## Sobre el Perpetrador (Contexto)

John Wayne Gacy (1942-1994) presentó una fachada de ciudadano modelo:
- Infancia con padre alcohólico y abusivo que lo llamaba "estúpido" y "maricón"
- Sufrió abuso sexual a los 9 años por un conocido de la familia
- Ocultó su homosexualidad toda su vida en una época de extremo estigma
- Exteriormente era un empresario exitoso y figura comunitaria que se disfrazaba de payaso para fiestas infantiles

Su doble vida le permitió matar durante 6 años sin ser detectado.

## Justicia para las Víctimas

Los restos de 29 víctimas fueron encontrados enterrados en el sótano de su casa. Gacy fue ejecutado en 1994, pero para las familias el dolor continúa, especialmente para aquellas cuyas víctimas aun no tienen nombre.`,
      viewCount: 198000,
      victims: {
        create: [
          {
            fullName: 'Timothy Jack McCoy',
            birthDate: new Date('1956-11-10'),
            birthPlace: 'Nebraska',
            ageAtDeathOrMissing: 16,
            lastSeenDate: new Date('1972-01-03'),
            deathDate: new Date('1972-01-03'),
            causeOfDeath: 'Apuñalamiento',
            biography: 'Timothy fue la primera víctima conocida de Gacy. Era un adolescente que viajaba en autostop cuando Gacy lo recogio. Tenia solo 16 años.',
            status: 'DECEASED'
          },
          {
            fullName: 'John Butkovich',
            birthDate: new Date('1956-08-31'),
            birthPlace: 'Chicago, Illinois',
            occupation: 'Trabajador de construccion',
            ageAtDeathOrMissing: 18,
            lastSeenDate: new Date('1975-07-31'),
            deathDate: new Date('1975-07-31'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'John trabajaba para la empresa de construccion de Gacy. Desaparecio después de ir a reclamar un cheque de pago atrasado. Su padre sospechó de Gacy desde el principio pero la policía no investigó.',
            status: 'DECEASED'
          },
          {
            fullName: 'Randall Wayne Reffett',
            birthDate: new Date('1961-05-10'),
            ageAtDeathOrMissing: 15,
            lastSeenDate: new Date('1976-05-14'),
            deathDate: new Date('1976-05-14'),
            causeOfDeath: 'Asfixia',
            biography: 'Randall tenia solo 15 años cuando desapareció. Como muchas víctimas de Gacy, era un adolescente vulnerable.',
            status: 'DECEASED'
          },
          {
            fullName: 'Samuel Stapleton',
            birthDate: new Date('1962-04-26'),
            ageAtDeathOrMissing: 14,
            lastSeenDate: new Date('1976-05-14'),
            deathDate: new Date('1976-05-14'),
            causeOfDeath: 'Asfixia',
            biography: 'Samuel desapareció el mismo dia que Randall Reffett. Tenia 14 años y toda una vida por delante.',
            status: 'DECEASED'
          },
          {
            fullName: 'Michael Bonnin',
            birthDate: new Date('1959-09-03'),
            ageAtDeathOrMissing: 17,
            lastSeenDate: new Date('1976-06-03'),
            deathDate: new Date('1976-06-03'),
            causeOfDeath: 'Asfixia',
            biography: 'Michael era un adolescente de 17 años. Como otras víctimas, fue atraido con promesas de trabajo o dinero.',
            status: 'DECEASED'
          },
          {
            fullName: 'William Carroll',
            birthDate: new Date('1960-09-24'),
            ageAtDeathOrMissing: 16,
            lastSeenDate: new Date('1976-06-13'),
            deathDate: new Date('1976-06-13'),
            causeOfDeath: 'Asfixia',
            biography: 'William tenia 16 años. Su familia nunca dejó de buscarlo.',
            status: 'DECEASED'
          },
          {
            fullName: 'Gregory Godzik',
            birthDate: new Date('1959-12-21'),
            birthPlace: 'Chicago, Illinois',
            occupation: 'Empleado de construccion',
            ageAtDeathOrMissing: 17,
            lastSeenDate: new Date('1976-12-12'),
            deathDate: new Date('1976-12-12'),
            causeOfDeath: 'Asfixia',
            biography: 'Gregory trabajaba para Gacy y desapareció poco antes de Navidad. Irónicamente, Gacy usó a otros empleados para cavar las tumbas en su sótano.',
            status: 'DECEASED'
          },
          {
            fullName: 'John Wayne Szyc',
            birthDate: new Date('1958-05-03'),
            ageAtDeathOrMissing: 19,
            lastSeenDate: new Date('1977-01-20'),
            deathDate: new Date('1977-01-20'),
            causeOfDeath: 'Asfixia',
            biography: 'John tenia 19 años. Gacy vendió su auto después de matarlo, lo que eventualmente ayudó a vincularlo con los crimenes.',
            status: 'DECEASED'
          },
          {
            fullName: 'Robert Piest',
            birthDate: new Date('1963-03-11'),
            birthPlace: 'Des Plaines, Illinois',
            occupation: 'Estudiante de preparatoria, trabajador de farmacia',
            ageAtDeathOrMissing: 15,
            lastSeenDate: new Date('1978-12-11'),
            lastSeenPlace: 'Farmacia Nisson en Des Plaines',
            deathDate: new Date('1978-12-11'),
            causeOfDeath: 'Asfixia',
            biography: 'Robert fue la ultima víctima de Gacy y su desaparición llevó al descubrimiento de todos los crimenes. Era un estudiante ejemplar que trabajaba medio tiempo en una farmacia. La noche que desapareció, había ido a hablar con Gacy sobre un trabajo de construccion. Su madre Elizabeth luchó incansablemente para encontrarlo, lo que finalmente llevó a la captura de Gacy.',
            status: 'DECEASED'
          },
          {
            fullName: 'Francis Wayne Alexander',
            birthDate: new Date('1956-02-08'),
            ageAtDeathOrMissing: 21,
            lastSeenDate: new Date('1976-03-15'),
            deathDate: new Date('1976-03-15'),
            causeOfDeath: 'Asfixia',
            biography: 'Francis fue identificado recien en 2021 gracias a tecnologia de ADN, 45 años después de su muerte. Su madre había muerto sin saber que le había pasado a su hijo. La identificacion trajo cierre a sus hermanos sobrevivientes.',
            status: 'DECEASED'
          },
          {
            fullName: 'Victima Sin Identificar #1',
            ageAtDeathOrMissing: 18,
            deathDate: new Date('1976-01-01'),
            causeOfDeath: 'Asfixia',
            biography: 'Uno de los jóvenes que permanece sin identificar. Las autoridades continúan usando tecnologia de ADN para darle un nombre.',
            status: 'DECEASED'
          },
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1972-01-03'), title: 'Primera víctima conocida', description: 'Timothy McCoy, de 16 años, es asesinado.', order: 1 },
          { date: new Date('1975-07-31'), title: 'John Butkovich desaparece', description: 'Su padre sospecha de Gacy pero la policía ignora sus advertencias.', order: 2 },
          { date: new Date('1978-12-11'), title: 'Robert Piest desaparece', description: 'Su madre insiste en una investigación que lleva al arresto de Gacy.', order: 3 },
          { date: new Date('1978-12-21'), title: 'Arresto de Gacy', description: 'La policía encuentra restos humanos bajo su casa.', order: 4 },
          { date: new Date('1980-03-12'), title: 'Condena', description: 'Gacy es condenado a muerte por 33 asesinatos.', order: 5 },
          { date: new Date('1994-05-10'), title: 'Ejecucion', description: 'Gacy es ejecutado por inyeccion letal.', order: 6 },
          { date: new Date('2021-10-25'), title: 'Francis Wayne Alexander identificado', description: 'Gracias a ADN, otra víctima recibe su nombre 45 años después.', order: 7 },
        ]
      },
      suspects: {
        create: [{
          fullName: 'John Wayne Gacy',
          aliases: JSON.stringify(['Pogo el Payaso', 'Killer Clown']),
          role: 'CONFIRMED_PERPETRATOR',
          description: 'Nacido el 17 de marzo de 1942 en Chicago. Infancia marcada por padre alcohólico y abusivo que constantemente lo humillaba. Sufrio abuso sexual a los 9 años. Oculto su homosexualidad y proyectó una imagen de ciudadano ejemplar y empresario exitoso. Se disfrazaba de payaso para eventos comunitarios mientras secretamente asesinaba jóvenes.',
          method: 'Atraia víctimas con ofertas de trabajo, las drogaba o inmovilizaba con esposas "de truco", las torturaba y estrangulaba con un torniquete improvisado.',
          convictionDetails: 'Condenado por 33 asesinatos',
          sentence: 'Pena de muerte - ejecutado el 10 de mayo de 1994',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'Chicago Tribune - Gacy Victims', url: 'https://www.chicagotribune.com/', publisher: 'Chicago Tribune', reliabilityTag: 'HIGH' },
          { title: 'DNA Doe Project', url: 'https://dnadoeproject.org/', publisher: 'DNA Doe Project', reliabilityTag: 'HIGH' },
        ]
      }
    }
  })
  console.log('John Wayne Gacy actualizado!')
}

async function main() {
  await updateDahmer()
  await updateGacy()
  console.log('Todos los asesinós seriales actualizados con enfoque en las víctimas!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
