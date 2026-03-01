import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating Ted Bundy case with complete information...')

  // First, delete existing Ted Bundy case and related data
  const existingCase = await prisma.case.findFirst({ where: { slug: 'ted-bundy' } })
  if (existingCase) {
    await prisma.source.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.evidence.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.suspect.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.timelineEvent.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.victim.deleteMany({ where: { caseId: existingCase.id } })
    await prisma.case.delete({ where: { id: existingCase.id } })
  }

  // Create updated Ted Bundy case
  await prisma.case.create({
    data: {
      slug: 'ted-bundy',
      title: 'Ted Bundy - El Asesino Carismático',
      summary: 'Asesino serial estadounidense que confesó 30 asesinatos entre 1974 y 1978. Conocido por su carisma y apariencia inofensiva que usaba para atraer a sus víctimas.',
      status: 'SOLVED',
      type: 'SERIAL_KILLER',
      year: 1978,
      country: 'Estados Unidos',
      city: 'Multiple Estados (Washington, Utah, Colorado, Florida)',
      mainImageUrl: '/images/cases/ted-bundy.jpg',
      tags: JSON.stringify(['serial killer', 'carismático', 'ejecución', 'psicópata', 'universidad']),
      featured: true,
      content: `## El Asesino

Theodore Robert Bundy (24 de noviembre de 1946 - 24 de enero de 1989) fue uno de los asesinos seriales más notorios de la historia de Estados Unidos. Confesó 30 asesinatos de mujeres jóvenes, aunque los investigadores creen que el número real podría superar los 100.

## Infancia y Origen del Monstruo

Ted Bundy nació como Theodore Robert Cowell en Burlington, Vermont, en un hogar para madres solteras. Su madre, Eleanor Louise Cowell, era soltera y la identidad de su padre biológico nunca fue confirmada.

**La Gran Mentira**: Para evitar el estigma social, los abuelos de Ted lo criaron haciéndole creer que eran sus padres y que su madre era su "hermana mayor". Ted no descubrió la verdad hasta su adolescencia, lo cual le causó un profundo trauma psicológico.

**Señales Tempranas**: Desde muy pequeño, Ted mostró comportamientos perturbadores:
- A los 3 años, su tía despertó rodeada de cuchillos de cocina con el pequeño Ted sonriendo junto a la cama
- Construía trampas en el vecindario que lastimaban a otros niños
- Torturaba animales, incluyendo colgar y quemar un gato
- Espiaba a mujeres por las ventanas desde adolescente

**Aislamiento Social**: Era descrito como un niño "afeminado" con problemas del habla que no encajaba con sus compañeros. Cuando su madre se casó con Johnnie Bundy, Ted sintió celos intensos y nunca aceptó a sus medio hermanos.

## Modus Operandi

Bundy utilizaba su apariencia atractiva y su carisma para ganarse la confianza de sus víctimas:
- Fingía estar herido (brazo en cabestrillo, muletas) para pedir ayuda
- Se hacía pasar por figura de autoridad (policía, bombero)
- Abordaba a mujeres en lugares públicos como universidades y centros comerciales
- Sus víctimas eran principalmente mujeres jóvenes con cabello largo y oscuro partido al medio

## Las Víctimas Confirmadas

Bundy asesinó mujeres en al menos 7 estados entre 1974 y 1978. La mayoría tenían entre 15 y 25 años.

## Las Fugas

Bundy escapó de la cárcel dos veces:
1. En junio de 1977, saltó de una ventana del juzgado en Colorado
2. En diciembre de 1977, escapó por el techo de su celda

Durante su segunda fuga, viajó a Florida donde cometió sus últimos crímenes, incluyendo el ataque a la casa de la hermandad Chi Omega.

## Captura Final y Ejecución

Fue arrestado en febrero de 1978 en Pensacola, Florida. Actuó como su propio abogado en el juicio, donde fue condenado a muerte.

Ted Bundy fue ejecutado en la silla eléctrica el 24 de enero de 1989 en la Prisión Estatal de Florida. Afuera de la prisión, cientos de personas celebraron su muerte con carteles que decían "Fríe, Bundy, Fríe".

## Análisis Psicológico

Los expertos diagnosticaron a Bundy con trastorno de personalidad antisocial (psicopatía). Mostraba:
- Falta total de empatía o remordimiento
- Manipulación patológica
- Grandiosidad y narcisismo
- Necesidad de control y dominación
- Capacidad de imitar emociones normales

Su confusa identidad infantil, el descubrimiento traumático sobre su nacimiento, y su resentimiento hacia las clases altas contribuyeron a moldear su violencia hacia mujeres universitarias de buena posición social.`,
      viewCount: 289000,
      victims: {
        create: [
          // Washington State - 1974
          {
            fullName: 'Lynda Ann Healy',
            birthDate: new Date('1953-01-30'),
            birthPlace: 'California, EEUU',
            occupation: 'Estudiante universitaria, locutora de radio del clima',
            ageAtDeathOrMissing: 21,
            lastSeenDate: new Date('1974-02-01'),
            lastSeenPlace: 'Seattle, Washington',
            deathDate: new Date('1974-02-01'),
            causeOfDeath: 'Golpe contundente en la cabeza',
            biography: 'Primera víctima confirmada. Estudiante de psicología en la Universidad de Washington.',
            status: 'DECEASED'
          },
          {
            fullName: 'Donna Gail Manson',
            birthDate: new Date('1954-12-25'),
            occupation: 'Estudiante universitaria',
            ageAtDeathOrMissing: 19,
            lastSeenDate: new Date('1974-03-12'),
            lastSeenPlace: 'Evergreen State College, Olympia',
            deathDate: new Date('1974-03-12'),
            causeOfDeath: 'Desconocida - cuerpo nunca encontrado',
            biography: 'Bundy confesó haber quemado su cráneo en la chimenea de su novia.',
            status: 'DECEASED'
          },
          {
            fullName: 'Susan Elaine Rancourt',
            birthDate: new Date('1955-10-31'),
            occupation: 'Estudiante universitaria',
            ageAtDeathOrMissing: 18,
            lastSeenDate: new Date('1974-04-17'),
            lastSeenPlace: 'Central Washington State College',
            deathDate: new Date('1974-04-17'),
            causeOfDeath: 'Golpe contundente',
            status: 'DECEASED'
          },
          {
            fullName: 'Roberta Kathleen Parks',
            birthDate: new Date('1953-10-20'),
            occupation: 'Estudiante universitaria',
            ageAtDeathOrMissing: 20,
            lastSeenDate: new Date('1974-05-06'),
            lastSeenPlace: 'Oregon State University',
            deathDate: new Date('1974-05-06'),
            status: 'DECEASED'
          },
          {
            fullName: 'Brenda Carol Ball',
            birthDate: new Date('1952-06-15'),
            ageAtDeathOrMissing: 22,
            lastSeenDate: new Date('1974-06-01'),
            lastSeenPlace: 'Burien, Washington',
            deathDate: new Date('1974-06-01'),
            status: 'DECEASED'
          },
          {
            fullName: 'Georgann Hawkins',
            birthDate: new Date('1955-12-09'),
            occupation: 'Estudiante universitaria',
            ageAtDeathOrMissing: 18,
            lastSeenDate: new Date('1974-06-11'),
            lastSeenPlace: 'Universidad de Washington',
            deathDate: new Date('1974-06-11'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Desapareció en el callejón detrás de su hermandad universitaria.',
            status: 'DECEASED'
          },
          {
            fullName: 'Janice Anne Ott',
            birthDate: new Date('1951-08-15'),
            occupation: 'Trabajadora legal',
            ageAtDeathOrMissing: 23,
            lastSeenDate: new Date('1974-07-14'),
            lastSeenPlace: 'Lake Sammamish, Washington',
            deathDate: new Date('1974-07-14'),
            biography: 'Secuestrada en pleno día de un parque lleno de gente.',
            status: 'DECEASED'
          },
          {
            fullName: 'Denise Marie Naslund',
            birthDate: new Date('1955-04-27'),
            occupation: 'Secretaria',
            ageAtDeathOrMissing: 19,
            lastSeenDate: new Date('1974-07-14'),
            lastSeenPlace: 'Lake Sammamish, Washington',
            deathDate: new Date('1974-07-14'),
            biography: 'Secuestrada el mismo día que Janice Ott, horas después.',
            status: 'DECEASED'
          },
          // Utah - 1974
          {
            fullName: 'Nancy Wilcox',
            ageAtDeathOrMissing: 16,
            lastSeenDate: new Date('1974-10-02'),
            lastSeenPlace: 'Holladay, Utah',
            deathDate: new Date('1974-10-02'),
            status: 'DECEASED'
          },
          {
            fullName: 'Melissa Anne Smith',
            birthDate: new Date('1957-03-13'),
            ageAtDeathOrMissing: 17,
            lastSeenDate: new Date('1974-10-18'),
            lastSeenPlace: 'Midvale, Utah',
            deathDate: new Date('1974-10-18'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Hija del jefe de policía de Midvale.',
            status: 'DECEASED'
          },
          {
            fullName: 'Laura Ann Aime',
            birthDate: new Date('1957-03-17'),
            ageAtDeathOrMissing: 17,
            lastSeenDate: new Date('1974-10-31'),
            lastSeenPlace: 'Lehi, Utah',
            deathDate: new Date('1974-10-31'),
            causeOfDeath: 'Estrangulamiento',
            status: 'DECEASED'
          },
          {
            fullName: 'Debra Jean Kent',
            birthDate: new Date('1957-07-17'),
            ageAtDeathOrMissing: 17,
            lastSeenDate: new Date('1974-11-08'),
            lastSeenPlace: 'Bountiful, Utah',
            deathDate: new Date('1974-11-08'),
            status: 'DECEASED'
          },
          // Colorado - 1975
          {
            fullName: 'Caryn Eileen Campbell',
            birthDate: new Date('1952-05-20'),
            occupation: 'Enfermera',
            ageAtDeathOrMissing: 23,
            lastSeenDate: new Date('1975-01-12'),
            lastSeenPlace: 'Snowmass, Colorado',
            deathDate: new Date('1975-01-12'),
            causeOfDeath: 'Golpe contundente en la cabeza',
            status: 'DECEASED'
          },
          {
            fullName: 'Julie Cunningham',
            birthDate: new Date('1948-08-24'),
            occupation: 'Empleada de tienda de esqui',
            ageAtDeathOrMissing: 26,
            lastSeenDate: new Date('1975-03-15'),
            lastSeenPlace: 'Vail, Colorado',
            deathDate: new Date('1975-03-15'),
            status: 'DECEASED'
          },
          {
            fullName: 'Denise Lynn Oliverson',
            birthDate: new Date('1950-01-08'),
            ageAtDeathOrMissing: 25,
            lastSeenDate: new Date('1975-04-06'),
            lastSeenPlace: 'Grand Junction, Colorado',
            deathDate: new Date('1975-04-06'),
            status: 'DECEASED'
          },
          // Idaho - 1975
          {
            fullName: 'Lynette Dawn Culver',
            ageAtDeathOrMissing: 12,
            lastSeenDate: new Date('1975-05-06'),
            lastSeenPlace: 'Pocatello, Idaho',
            deathDate: new Date('1975-05-06'),
            causeOfDeath: 'Ahogamiento',
            biography: 'Una de las víctimas mas jóvenes. Bundy confesó haberla ahogado en una banera de hotel.',
            status: 'DECEASED'
          },
          {
            fullName: 'Susan Curtis',
            birthDate: new Date('1960-02-15'),
            ageAtDeathOrMissing: 15,
            lastSeenDate: new Date('1975-06-28'),
            lastSeenPlace: 'Provo, Utah',
            deathDate: new Date('1975-06-28'),
            status: 'DECEASED'
          },
          // Florida - 1978
          {
            fullName: 'Lisa Levy',
            birthDate: new Date('1958-11-09'),
            birthPlace: 'St. Petersburg, Florida',
            occupation: 'Estudiante universitaria',
            ageAtDeathOrMissing: 20,
            lastSeenDate: new Date('1978-01-15'),
            lastSeenPlace: 'Casa Chi Omega, Tallahassee',
            deathDate: new Date('1978-01-15'),
            causeOfDeath: 'Estrangulamiento y golpes',
            biography: 'Víctima del ataque a la hermandad Chi Omega de Florida State University.',
            status: 'DECEASED'
          },
          {
            fullName: 'Margaret Elizabeth Bowman',
            birthDate: new Date('1956-09-11'),
            birthPlace: 'Miami, Florida',
            occupation: 'Estudiante universitaria',
            ageAtDeathOrMissing: 21,
            lastSeenDate: new Date('1978-01-15'),
            lastSeenPlace: 'Casa Chi Omega, Tallahassee',
            deathDate: new Date('1978-01-15'),
            causeOfDeath: 'Estrangulamiento y golpes',
            biography: 'Víctima del ataque a la hermandad Chi Omega.',
            status: 'DECEASED'
          },
          {
            fullName: 'Kimberly Diane Leach',
            birthDate: new Date('1965-07-22'),
            birthPlace: 'Lake City, Florida',
            occupation: 'Estudiante de secundaria',
            ageAtDeathOrMissing: 12,
            lastSeenDate: new Date('1978-02-09'),
            lastSeenPlace: 'Lake City Junior High School',
            deathDate: new Date('1978-02-09'),
            causeOfDeath: 'Estrangulamiento',
            biography: 'Última víctima de Bundy. Secuestrada de su escuela en pleno día.',
            status: 'DECEASED'
          },
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1946-11-24'), title: 'Nacimiento', description: 'Theodore Robert Cowell nace en Burlington, Vermont, en un hogar para madres solteras.', order: 1 },
          { date: new Date('1974-02-01'), title: 'Primera víctima confirmada', description: 'Lynda Ann Healy desaparece de Seattle. Es la primera víctima confirmada.', order: 2 },
          { date: new Date('1974-07-14'), title: 'Doble secuestro en Lake Sammamish', description: 'Janice Ott y Denise Naslund son secuestradas del mismo parque el mismo día.', order: 3 },
          { date: new Date('1975-08-16'), title: 'Primer arresto', description: 'Bundy es arrestado en Utah por posesión de herramientas de robo.', order: 4 },
          { date: new Date('1976-10-22'), title: 'Condena en Utah', description: 'Condenado por secuestro agravado.', order: 5 },
          { date: new Date('1977-06-07'), title: 'Primera fuga', description: 'Escapa saltando de una ventana del juzgado en Aspen, Colorado.', order: 6 },
          { date: new Date('1977-12-30'), title: 'Segunda fuga', description: 'Escapa de la cárcel de Colorado por el techo y viaja a Florida.', order: 7 },
          { date: new Date('1978-01-15'), title: 'Ataque Chi Omega', description: 'Ataca a cuatro mujeres en la hermandad Chi Omega de FSU. Dos mueren.', order: 8 },
          { date: new Date('1978-02-09'), title: 'Última víctima', description: 'Kimberly Leach, de 12 años, es secuestrada y asesinada.', order: 9 },
          { date: new Date('1978-02-15'), title: 'Arresto final', description: 'Es arrestado en Pensacola, Florida.', order: 10 },
          { date: new Date('1979-07-24'), title: 'Condena Chi Omega', description: 'Condenado a muerte por los asesinatos de Chi Omega.', order: 11 },
          { date: new Date('1989-01-24'), title: 'Ejecución', description: 'Ted Bundy es ejecutado en la silla eléctrica en Florida.', order: 12 }
        ]
      },
      suspects: {
        create: [{
          fullName: 'Theodore Robert Bundy',
          aliases: JSON.stringify(['Ted Bundy', 'Chris Hagen', 'Kenneth Misner']),
          role: 'CONFIRMED_PERPETRATOR',
          description: 'Nacido el 24 de noviembre de 1946 en Burlington, Vermont. Asesino serial estadounidense. Confesó 30 asesinatos pero se sospecha de más de 100. Era estudiante de derecho y trabajó en una línea de prevención del suicidio. Creció creyendo que sus abuelos eran sus padres y su madre su hermana. Este trauma de identidad, combinado con tendencias psicopáticas desde la infancia (tortura de animales, aislamiento social), contribuyó a formar su personalidad violenta.',
          method: 'Secuestro, violación, estrangulamiento, golpes con objetos contundentes, necrofilia',
          convictionDetails: 'Condenado por múltiples asesinatos en Florida',
          sentence: 'Pena de muerte - ejecutado el 24 de enero de 1989',
          isConfirmed: true
        }]
      },
      sources: {
        create: [
          { title: 'FBI - Ted Bundy', url: 'https://www.fbi.gov/', publisher: 'FBI', reliabilityTag: 'HIGH' },
          { title: 'Biography - Ted Bundy Childhood', url: 'https://www.biography.com/crime/ted-bundy-childhood', publisher: 'Biography.com', reliabilityTag: 'HIGH' },
          { title: 'Britannica - Ted Bundy Victims', url: 'https://www.britannica.com/topic/How-Many-People-Did-Ted-Bundy-Kill', publisher: 'Britannica', reliabilityTag: 'HIGH' }
        ]
      }
    }
  })

  console.log('Ted Bundy case updated with 20 confirmed victims and complete biography!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
