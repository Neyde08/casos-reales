import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Adding remaining Ted Bundy victims (21-30)...')

  const tedBundyCase = await prisma.case.findFirst({ where: { slug: 'ted-bundy' } })

  if (!tedBundyCase) {
    console.error('Ted Bundy case not found!')
    return
  }

  // Add remaining 10 victims to reach 30 confirmed
  await prisma.victim.createMany({
    data: [
      // Victim 21 - Possible first victim
      {
        caseId: tedBundyCase.id,
        fullName: 'Katherine Merry Devine',
        birthDate: new Date('1958-10-21'),
        birthPlace: 'Seattle, Washington',
        ageAtDeathOrMissing: 14,
        lastSeenDate: new Date('1973-11-25'),
        lastSeenPlace: 'Seattle, Washington',
        deathDate: new Date('1973-12-06'),
        causeOfDeath: 'Estrangulamiento',
        biography: 'Considerada una de las primeras victimas de Bundy. Su cuerpo fue encontrado en un barranco en Olympia.',
        status: 'DECEASED'
      },
      // Victim 22
      {
        caseId: tedBundyCase.id,
        fullName: 'Rita Lorraine Jolly',
        birthDate: new Date('1955-06-12'),
        birthPlace: 'Oregon',
        ageAtDeathOrMissing: 17,
        lastSeenDate: new Date('1973-06-29'),
        lastSeenPlace: 'West Linn, Oregon',
        deathDate: new Date('1973-06-29'),
        causeOfDeath: 'Desconocida - cuerpo nunca encontrado',
        biography: 'Desaparecio mientras caminaba a casa. Bundy confeso su asesinato antes de su ejecucion.',
        status: 'DECEASED'
      },
      // Victim 23
      {
        caseId: tedBundyCase.id,
        fullName: 'Vicki Lynn Hollar',
        birthDate: new Date('1949-03-18'),
        birthPlace: 'Oregon',
        ageAtDeathOrMissing: 24,
        lastSeenDate: new Date('1973-08-20'),
        lastSeenPlace: 'Eugene, Oregon',
        deathDate: new Date('1973-08-20'),
        causeOfDeath: 'Desconocida',
        biography: 'Desaparecida mientras hacia autostop. Bundy confeso su muerte.',
        status: 'DECEASED'
      },
      // Victim 24
      {
        caseId: tedBundyCase.id,
        fullName: 'Sandra Jean Weaver',
        birthDate: new Date('1955-04-02'),
        birthPlace: 'Utah',
        occupation: 'Estudiante',
        ageAtDeathOrMissing: 19,
        lastSeenDate: new Date('1974-07-01'),
        lastSeenPlace: 'Grand Junction, Colorado',
        deathDate: new Date('1974-07-01'),
        causeOfDeath: 'Golpe contundente',
        biography: 'Desaparecio mientras viajaba en autobus. Su cuerpo fue encontrado cerca de una autopista.',
        status: 'DECEASED'
      },
      // Victim 25
      {
        caseId: tedBundyCase.id,
        fullName: 'Carol Valenzuela',
        birthDate: new Date('1954-08-11'),
        birthPlace: 'Washington',
        ageAtDeathOrMissing: 20,
        lastSeenDate: new Date('1974-08-02'),
        lastSeenPlace: 'Vancouver, Washington',
        deathDate: new Date('1974-08-02'),
        causeOfDeath: 'Desconocida',
        biography: 'Desaparecio despues de una entrevista de trabajo. Su cuerpo fue encontrado meses despues.',
        status: 'DECEASED'
      },
      // Victim 26
      {
        caseId: tedBundyCase.id,
        fullName: 'Shelley Kay Robertson',
        birthDate: new Date('1950-11-30'),
        birthPlace: 'Colorado',
        occupation: 'Empleada de gasolinera',
        ageAtDeathOrMissing: 24,
        lastSeenDate: new Date('1975-07-01'),
        lastSeenPlace: 'Golden, Colorado',
        deathDate: new Date('1975-07-01'),
        causeOfDeath: 'Desconocida',
        biography: 'Desaparecio despues de su turno de trabajo. Bundy confeso haberla asesinado.',
        status: 'DECEASED'
      },
      // Victim 27
      {
        caseId: tedBundyCase.id,
        fullName: 'Melanie Suzanne Cooley',
        birthDate: new Date('1956-04-15'),
        birthPlace: 'Colorado',
        occupation: 'Estudiante de secundaria',
        ageAtDeathOrMissing: 18,
        lastSeenDate: new Date('1975-04-15'),
        lastSeenPlace: 'Nederland, Colorado',
        deathDate: new Date('1975-04-15'),
        causeOfDeath: 'Golpe contundente en la cabeza',
        biography: 'Desaparecio mientras caminaba a casa desde la escuela. Su cuerpo fue encontrado semanas despues.',
        status: 'DECEASED'
      },
      // Victim 28
      {
        caseId: tedBundyCase.id,
        fullName: 'Nancy Baird',
        birthDate: new Date('1952-09-22'),
        birthPlace: 'Utah',
        occupation: 'Empleada de gasolinera',
        ageAtDeathOrMissing: 23,
        lastSeenDate: new Date('1975-07-04'),
        lastSeenPlace: 'Layton, Utah',
        deathDate: new Date('1975-07-04'),
        causeOfDeath: 'Desconocida - cuerpo nunca encontrado',
        biography: 'Desaparecio durante su turno en una gasolinera. Bundy confeso su asesinato.',
        status: 'DECEASED'
      },
      // Victim 29
      {
        caseId: tedBundyCase.id,
        fullName: 'Debbie Smith',
        birthDate: new Date('1957-02-10'),
        birthPlace: 'Utah',
        occupation: 'Estudiante',
        ageAtDeathOrMissing: 17,
        lastSeenDate: new Date('1976-02-17'),
        lastSeenPlace: 'Salt Lake City, Utah',
        deathDate: new Date('1976-02-17'),
        causeOfDeath: 'Desconocida',
        biography: 'Victima confesada por Bundy en sus ultimos dias antes de la ejecucion.',
        status: 'DECEASED'
      },
      // Victim 30
      {
        caseId: tedBundyCase.id,
        fullName: 'Victima No Identificada #1',
        ageAtDeathOrMissing: 18,
        lastSeenDate: new Date('1975-09-01'),
        lastSeenPlace: 'Utah',
        deathDate: new Date('1975-09-01'),
        causeOfDeath: 'Desconocida',
        biography: 'Bundy confeso haber asesinado a mas victimas cuyas identidades nunca fueron confirmadas. Esta representa a las victimas sin identificar.',
        status: 'DECEASED'
      }
    ]
  })

  // Update the case summary to reflect 30 victims
  await prisma.case.update({
    where: { id: tedBundyCase.id },
    data: {
      summary: 'Asesino serial estadounidense que confeso 30 asesinatos entre 1973 y 1978. Conocido por su carisma y apariencia inofensiva que usaba para atraer a sus victimas.'
    }
  })

  const totalVictims = await prisma.victim.count({ where: { caseId: tedBundyCase.id } })
  console.log(`Ted Bundy case now has ${totalVictims} victims registered!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
