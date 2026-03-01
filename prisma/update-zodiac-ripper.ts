import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateZodiac() {
  console.log('Actualizando Zodiac Killer...')

  const existingCase = await prisma.case.findFirst({ where: { slug: 'zodiac-killer' } })
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
      slug: 'zodiac-killer',
      title: 'Las Víctimas del Asesino del Zodiaco',
      summary: 'Al menos 5 personas fueron asesinadas y 2 sobrevivieron a los ataques del misterioso asesino que nunca fue identificado.',
      status: 'UNSOLVED',
      type: 'SERIAL_KILLER',
      year: 1969,
      country: 'Estados Unidos',
      city: 'Area de la Bahia de San Francisco, California',
      mainImageUrl: '/images/cases/placeholder-mystery.svg',
      tags: JSON.stringify(['serial killer', 'sin resolver', 'california', 'criptogramas']),
      featured: true,
      content: `## Las Víctimas del Zodiaco

Entre diciembre de 1968 y octubre de 1969, un asesino desconocido aterrorizo el norte de California. Al menos 5 personas perdieron la vida y 2 sobrevivieron milagrosamente.

## Quienes Eran las Víctimas

### Betty Lou Jensen y David Faraday - La Primera Cita Trágica
Betty Lou y David eran estudiantes de preparatoria en su primera cita. Betty Lou era una estudiante de honor de 16 años, conocida por su dulzura y dedicación a sus estudios. David, de 17 años, era un atleta y luchador de su escuela. Esa noche de diciembre de 1968, fueron a un lugar tranquilo para conversar. Nunca volvieron a casa.

### Darlene Ferrin - La Madre Joven
Darlene tenía solo 22 años, era madre de una niña pequeña y trabajaba como mesera. Su hermana Pam la recuerda como alguien "muy orientada a la familia que amaba profundamente a los suyos". Fue asesinada la noche del 4 de julio de 1969.

### Cecelia Shepard - La Estudiante Universitaria
Cecelia era una estudiante universitaria de 22 años con toda la vida por delante. Fue atacada junto a su novio Bryan Hartnell mientras disfrutaban de un día en el lago Berryessa. Aunque logró dar una descripción detallada de su atacante a la policía, murió dos días después por sus heridas.

### Paul Stine - El Taxista Estudiante de Doctorado
Paul tenía 29 años y era conductor de taxi, pero eso era solo su trabajo temporal. En realidad era candidato a doctorado y estaba a solo meses de completar su posgrado. Su hermano Joe lo había ayudado económicamente con su educación. Paul fue asesinado mientras hacía su trabajo la noche del 11 de octubre de 1969.

## Los Sobrevivientes

**Michael Mageau** (19 años en 1969) sobrevivió al ataque donde Darlene Ferrin murió. Recibió múltiples disparos pero logró recuperarse físicamente, aunque cargó con el trauma toda su vida.

**Bryan Hartnell** (20 años en 1969) sobrevivió a 8 puñaladas en la espalda. Se convirtió en abogado y ha hablado públicamente sobre su experiencia, manteniendo viva la memoria de Cecelia.

## El Asesino Desconocido

A diferencia de otros casos, el Asesino del Zodiaco nunca fue identificado. Envió cartas cifradas a los periódicos burlándose de la policía. Afirmó haber matado a 37 personas, aunque solo 5 muertes están confirmadas.

El caso permanece abierto. En 2020, un grupo de criptógrafos finalmente descifró uno de sus mensajes después de 51 años.`,
      viewCount: 145000,
      victims: {
        create: [
          {
            fullName: 'Betty Lou Jensen',
            birthDate: new Date('1952-04-21'),
            birthPlace: 'Vallejo, California',
            occupation: 'Estudiante de preparatoria',
            ageAtDeathOrMissing: 16,
            lastSeenDate: new Date('1968-12-20'),
            lastSeenPlace: 'Lake Herman Road, Benicia',
            deathDate: new Date('1968-12-20'),
            causeOfDeath: 'Cinco disparos en la espalda',
            biography: 'Betty Lou era una estudiante de honor de 16 años. Esa noche estaba en su primera cita con David Faraday. Era conocida por su dulzura, su dedicación a los estudios y su cercania con su familia. Tenia toda una vida por delante.',
            status: 'DECEASED'
          },
          {
            fullName: 'David Arthur Faraday',
            birthDate: new Date('1951-10-25'),
            birthPlace: 'Vallejo, California',
            occupation: 'Estudiante de preparatoria, atleta',
            ageAtDeathOrMissing: 17,
            lastSeenDate: new Date('1968-12-20'),
            lastSeenPlace: 'Lake Herman Road, Benicia',
            deathDate: new Date('1968-12-20'),
            causeOfDeath: 'Disparo en la cabeza',
            biography: 'David era un atleta de 17 años, miembro del equipo de lucha de su escuela. Esa noche había llevado a Betty Lou a su primera cita. Fue encontrado junto a su auto, habiendo recibido un disparo a quemarropa.',
            status: 'DECEASED'
          },
          {
            fullName: 'Darlene Elizabeth Ferrin',
            birthDate: new Date('1947-03-17'),
            birthPlace: 'California',
            occupation: 'Mesera, madre',
            ageAtDeathOrMissing: 22,
            lastSeenDate: new Date('1969-07-04'),
            lastSeenPlace: 'Blue Rock Springs Park, Vallejo',
            deathDate: new Date('1969-07-04'),
            causeOfDeath: 'Multiples disparos',
            biography: 'Darlene era madre de una niña pequeña y trabajaba como mesera para mantener a su familia. Su hermana Pam la describia como "muy orientada a la familia que amaba profundamente a los suyos". Fue asesinada la noche del 4 de julio mientras estaba con su amigo Michael Mageau.',
            status: 'DECEASED'
          },
          {
            fullName: 'Michael Renault Mageau',
            birthDate: new Date('1950-01-01'),
            occupation: 'Trabajador',
            ageAtDeathOrMissing: 19,
            lastSeenDate: new Date('1969-07-04'),
            lastSeenPlace: 'Blue Rock Springs Park, Vallejo',
            causeOfDeath: 'Sobrevivio - multiples disparos',
            biography: 'Michael estaba con Darlene Ferrin cuando fueron atacados. Recibio multiples disparos pero sobrevivió milagrosamente. Cargo con el trauma fisico y psicológico del ataque durante el resto de su vida. Su testimonio fue crucial para la investigacion.',
            status: 'SURVIVED'
          },
          {
            fullName: 'Cecelia Ann Shepard',
            birthDate: new Date('1947-01-01'),
            birthPlace: 'California',
            occupation: 'Estudiante universitaria',
            ageAtDeathOrMissing: 22,
            lastSeenDate: new Date('1969-09-27'),
            lastSeenPlace: 'Lake Berryessa, Napa County',
            deathDate: new Date('1969-09-29'),
            causeOfDeath: 'Múltiples puñaladas',
            biography: 'Cecelia era una estudiante universitaria de 22 años que disfrutaba de un día en el lago con su novio Bryan. A pesar de haber sido apuñalada múltiples veces, permaneció consciente el tiempo suficiente para dar una descripción detallada del atacante a la policía. Murió dos días después sin recuperar la consciencia.',
            status: 'DECEASED'
          },
          {
            fullName: 'Bryan Calvin Hartnell',
            birthDate: new Date('1949-07-01'),
            occupation: 'Estudiante universitario',
            ageAtDeathOrMissing: 20,
            lastSeenDate: new Date('1969-09-27'),
            lastSeenPlace: 'Lake Berryessa, Napa County',
            causeOfDeath: 'Sobrevivió - 8 puñaladas en la espalda',
            biography: 'Bryan sobrevivió a 8 puñaladas en la espalda. Más tarde se convirtió en abogado y ha hablado públicamente sobre su experiencia. Ha dedicado parte de su vida a mantener viva la memoria de Cecelia y a buscar justicia.',
            status: 'SURVIVED'
          },
          {
            fullName: 'Paul Lee Stine',
            birthDate: new Date('1940-12-18'),
            birthPlace: 'California',
            occupation: 'Taxista, candidato a doctorado',
            ageAtDeathOrMissing: 29,
            lastSeenDate: new Date('1969-10-11'),
            lastSeenPlace: 'Presidio Heights, San Francisco',
            deathDate: new Date('1969-10-11'),
            causeOfDeath: 'Disparo en la cabeza',
            biography: 'Paul era mucho mas que un taxista - era candidato a doctorado que estaba a solo meses de completar su posgrado. Su hermano Joe lo había ayudado economicamente con su educacion. Conducia taxi para pagar sus gastos mientras terminaba sus estudios. Fue la ultima víctima confirmada del Zodiaco.',
            status: 'DECEASED'
          },
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1968-12-20'), title: 'Primer ataque: Betty Lou y David', description: 'Dos adolescentes en su primera cita son asesinados en Lake Herman Road.', order: 1 },
          { date: new Date('1969-07-04'), title: 'Segundo ataque: Darlene y Michael', description: 'Darlene Ferrin muere; Michael Mageau sobrevive.', order: 2 },
          { date: new Date('1969-07-31'), title: 'Primera carta del Zodiaco', description: 'El asesino envia cartas a tres periodicos con criptogramas.', order: 3 },
          { date: new Date('1969-09-27'), title: 'Ataque en Lake Berryessa', description: 'Cecelia Shepard muere; Bryan Hartnell sobrevive.', order: 4 },
          { date: new Date('1969-10-11'), title: 'Asesinato de Paul Stine', description: 'El taxista Paul Stine es asesinado en San Francisco.', order: 5 },
          { date: new Date('2020-12-11'), title: 'Criptograma descifrado', description: 'Despues de 51 años, un grupo descifra uno de los mensajes del Zodiaco.', order: 6 },
        ]
      },
      sources: {
        create: [
          { title: 'FBI - Zodiac Killer', url: 'https://www.fbi.gov/', publisher: 'FBI', reliabilityTag: 'HIGH' },
          { title: 'San Francisco Chronicle Archives', url: 'https://www.sfchronicle.com/', publisher: 'SF Chronicle', reliabilityTag: 'HIGH' },
        ]
      }
    }
  })
  console.log('Zodiac Killer actualizado!')
}

async function updateRipper() {
  console.log('Actualizando Jack el Destripador...')

  const existingCase = await prisma.case.findFirst({ where: { slug: 'jack-el-destripador' } })
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
      slug: 'jack-el-destripador',
      title: 'Las Cinco Canónicas: Víctimas de Jack el Destripador',
      summary: 'Cinco mujeres del Londres victoriano fueron brutalmente asesinadas en 1888. Esta es la historia de quienes eran, no solo de como murieron.',
      status: 'UNSOLVED',
      type: 'SERIAL_KILLER',
      year: 1888,
      country: 'Reino Unido',
      city: 'Whitechapel, Londres',
      mainImageUrl: '/images/cases/placeholder-historical.svg',
      tags: JSON.stringify(['serial killer', 'victoriano', 'londres', 'historico', 'sin resolver']),
      featured: true,
      content: `## Las Cinco Canónicas

En el otoño de 1888, cinco mujeres fueron brutalmente asesinadas en el distrito de Whitechapel, en el East End de Londres. Durante mas de un siglo, han sido reducidas a "prostitutas victorianas", pero eran mucho mas que eso.

## Mas Alla del Mito

En 2019, la historiadora Hallie Rubenhold publicó "The Five", un libro que finalmente contó las historias de estas mujeres como seres humanos completos. Su investigacion reveló que al menos tres de ellas NO eran trabajadoras sexuales, como se había asumido durante mas de un siglo.

## Quienes Eran Realmente

### Mary Ann "Polly" Nichols (1845-1888)
Polly había estado casada y era madre de cinco hijos. Se separo de su esposo en 1880 y su vida entro en una espiral descendente marcada por la pobreza y el alcoholismo. A pesar de sus luchas, mantenía la esperanza de una vida mejor. La noche de su muerte, había ganado dinero suficiente para una cama, pero lo gasto en alcohol.

### Annie Chapman (1841-1888)
Annie había tenido una vida de clase media como esposa de un cochero. Tras la muerte de su esposo y la pérdida de su pensión, se vio obligada a ganarse la vida vendiendo flores de crochet y cerillas. Padecia tuberculosis y desnutrición. Tenia 47 años y estaba gravemente enferma cuando murió.

### Elizabeth Stride (1843-1888)
Elizabeth era sueca, había emigrado a Inglaterra buscando una vida mejor. Trabajaba como costurera y limpiadora. Aunque había recurrido a la prostitución en momentos de desesperacion, no era su ocupación principal. Era conocida como "Long Liz" por su altura.

### Catherine Eddowes (1842-1888)
Catherine era una mujer educada que sabia leer y escribir en una epoca en que muchos no podían. Habia viajado por Inglaterra vendiendo libros de canciones. Tenia una relación estable con un hombre llamado John Kelly. Fue asesinada la misma noche que Elizabeth Stride.

### Mary Jane Kelly (1863-1888)
Mary Jane era la mas joven de las cinco, con solo 25 años. Era irlandesa y había llegado a Londres desde Gales. A diferencia de las otras, si trabajaba activamente como prostituta. Fue la única víctima asesinada en interiores, en su propia habitacion.

## El Contexto Social

Whitechapel en 1888 era uno de los lugares mas pobres de Londres. Miles de personas vivian en condiciones de extrema miseria. Las mujeres sin recursos tenían pocas opciones para sobrevivir.

El asesino nunca fue identificado, pero lo que si sabemos es que sus víctimas merecen ser recordadas como las personas que fueron, no solo como las víctimas en que se convirtieron.`,
      viewCount: 210000,
      victims: {
        create: [
          {
            fullName: 'Mary Ann Nichols',
            aliases: JSON.stringify(['Polly Nichols']),
            birthDate: new Date('1845-08-26'),
            birthPlace: 'Londres, Inglaterra',
            occupation: 'Anteriormente esposa y madre, luego trabajadora ocasional',
            ageAtDeathOrMissing: 43,
            lastSeenDate: new Date('1888-08-31'),
            lastSeenPlace: 'Whitechapel, Londres',
            deathDate: new Date('1888-08-31'),
            causeOfDeath: 'Degollamiento y mutilación abdominal',
            biography: 'Mary Ann "Polly" Nichols había sido esposa y madre de cinco hijos antes de que su matrimonio terminara en 1880. La separación la llevó a una vida de pobreza y alcoholismo. A pesar de todo, mantenía la esperanza y la noche de su muerte había comentado con orgullo sobre su nuevo sombrero. Tenia 43 años.',
            status: 'DECEASED'
          },
          {
            fullName: 'Annie Chapman',
            aliases: JSON.stringify(['Dark Annie']),
            birthDate: new Date('1841-09-01'),
            birthPlace: 'Londres, Inglaterra',
            occupation: 'Vendia flores de crochet y cerillas',
            ageAtDeathOrMissing: 47,
            lastSeenDate: new Date('1888-09-08'),
            lastSeenPlace: '29 Hanbury Street, Spitalfields',
            deathDate: new Date('1888-09-08'),
            causeOfDeath: 'Degollamiento y mutilación',
            biography: 'Annie había llevado una vida respetable de clase media como esposa de un cochero. Tras la muerte de su esposo y la pérdida de su pensión, se vio reducida a vender flores de crochet en las calles. Sufria de tuberculosis y estaba gravemente desnutrida. Tenia 47 años y estaba muy enferma cuando murió.',
            status: 'DECEASED'
          },
          {
            fullName: 'Elizabeth Stride',
            aliases: JSON.stringify(['Long Liz']),
            birthDate: new Date('1843-11-27'),
            birthPlace: 'Gotemburgo, Suecia',
            occupation: 'Costurera, limpiadora',
            ageAtDeathOrMissing: 44,
            lastSeenDate: new Date('1888-09-30'),
            lastSeenPlace: 'Dutfields Yard, Whitechapel',
            deathDate: new Date('1888-09-30'),
            causeOfDeath: 'Degollamiento',
            biography: 'Elizabeth era sueca, había emigrado a Inglaterra soñando con una vida mejor. Trabajo principalmente como costurera y limpiadora. Era conocida como "Long Liz" por su altura. Algunos historiadores creen que podria no haber sido víctima del Destripador, ya que su cuerpo no fue mutilado como los otros.',
            status: 'DECEASED'
          },
          {
            fullName: 'Catherine Eddowes',
            aliases: JSON.stringify(['Kate Kelly']),
            birthDate: new Date('1842-04-14'),
            birthPlace: 'Wolverhampton, Inglaterra',
            occupation: 'Vendedora ambulante de libros de canciones',
            ageAtDeathOrMissing: 46,
            lastSeenDate: new Date('1888-09-30'),
            lastSeenPlace: 'Mitre Square, City of London',
            deathDate: new Date('1888-09-30'),
            causeOfDeath: 'Degollamiento y mutilación extrema',
            biography: 'Catherine era una mujer educada que sabia leer y escribir, algo poco comun en su epoca y clase social. Habia viajado por Inglaterra vendiendo libros de canciones con su pareja Thomas Conway. Vivia con John Kelly y acababa de regresar a Londres la noche de su muerte. Fue asesinada la misma noche que Elizabeth Stride.',
            status: 'DECEASED'
          },
          {
            fullName: 'Mary Jane Kelly',
            aliases: JSON.stringify(['Marie Jeanette Kelly', 'Ginger']),
            birthDate: new Date('1863-01-01'),
            birthPlace: 'Limerick, Irlanda',
            occupation: 'Prostituta',
            ageAtDeathOrMissing: 25,
            lastSeenDate: new Date('1888-11-09'),
            lastSeenPlace: '13 Millers Court, Spitalfields',
            deathDate: new Date('1888-11-09'),
            causeOfDeath: 'Degollamiento y mutilación extrema',
            biography: 'Mary Jane era la mas joven de las víctimas canonicas, con solo 25 años. Era irlandesa y había llegado a Londres desde Gales. A diferencia de las otras víctimas, si ejercía la prostitución activamente. Fue la única víctima asesinada en interiores, lo que permitió al asesino mas tiempo y resultó en la mutilación mas severa.',
            status: 'DECEASED'
          },
        ]
      },
      timelineEvents: {
        create: [
          { date: new Date('1888-08-31'), title: 'Mary Ann Nichols', description: 'Primera víctima canonica encontrada en Bucks Row.', order: 1 },
          { date: new Date('1888-09-08'), title: 'Annie Chapman', description: 'Segunda víctima encontrada en 29 Hanbury Street.', order: 2 },
          { date: new Date('1888-09-30'), title: 'El Doble Evento', description: 'Elizabeth Stride y Catherine Eddowes son asesinadas la misma noche.', order: 3 },
          { date: new Date('1888-11-09'), title: 'Mary Jane Kelly', description: 'Ultima y mas joven víctima canonica, unico asesinato en interiores.', order: 4 },
          { date: new Date('2019-01-01'), title: '"The Five" publicado', description: 'Hallie Rubenhold publica libro recuperando las historias reales de las víctimas.', order: 5 },
        ]
      },
      sources: {
        create: [
          { title: 'The Five - Hallie Rubenhold', url: 'https://hallierubenhold.com/books/the-five/', publisher: 'Hallie Rubenhold', reliabilityTag: 'HIGH' },
          { title: 'Casebook: Jack the Ripper', url: 'https://www.casebook.org/', publisher: 'Casebook.org', reliabilityTag: 'MEDIUM' },
          { title: 'Scotland Yard Archives', url: 'https://www.met.police.uk/', publisher: 'Metropolitan Police', reliabilityTag: 'HIGH' },
        ]
      }
    }
  })
  console.log('Jack el Destripador actualizado!')
}

async function main() {
  await updateZodiac()
  await updateRipper()
  console.log('Zodiac y Jack el Destripador actualizados con enfoque en las víctimas!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
