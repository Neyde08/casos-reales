import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Buscar el caso de Madeleine McCann
  const caso = await prisma.case.findUnique({
    where: { slug: 'madeleine-mccann' },
  })

  if (!caso) {
    console.log('Caso no encontrado')
    return
  }

  console.log('Caso encontrado:', caso.title)

  // Crear el impacto del caso
  const impact = await prisma.caseImpact.upsert({
    where: { caseId: caso.id },
    update: {
      // Legislacion
      legislationName: 'Child Rescue Alert (UK) y Ley de Alerta de Menores Desaparecidos',
      legislationYear: 2008,
      legislationDesc: 'El caso impulso la implementacion del sistema Child Rescue Alert en Reino Unido, similar al Amber Alert estadounidense. Tambien se fortalecio la cooperacion policial internacional mediante acuerdos entre UK y Portugal, y se revisaron las leyes de prescripcion para delitos contra menores.',

      // Fundacion
      foundationName: 'Madeleine Fund: Leaving No Stone Unturned',
      foundationDesc: 'Fundacion creada por los padres de Madeleine, Kate y Gerry McCann, para financiar la busqueda privada de su hija y apoyar a otras familias de ninos desaparecidos. Ha recaudado millones de libras y mantiene activa la investigacion.',
      foundationUrl: 'https://www.findmadeleine.com',

      // Impacto comunitario
      communityImpact: 'El caso transformo la percepcion publica sobre la seguridad infantil en vacaciones. Los resorts turisticos de todo el mundo implementaron medidas de seguridad mas estrictas. Se genero un debate sobre la practica de dejar ninos solos mientras los padres cenan cerca, algo comun en algunos paises europeos.',
      awarenessEffect: 'Madeleine se convirtio en el rostro de los ninos desaparecidos a nivel mundial. Su imagen fue la mas difundida en la historia de casos de personas desaparecidas. El caso demostro el poder de las redes sociales y los medios para mantener viva una investigacion, pero tambien los peligros de la desinformacion y el juicio mediatico.',

      // Adaptaciones mediaticas
      mediaAdaptations: JSON.stringify([
        {
          title: 'La Desaparicion de Madeleine McCann',
          type: 'documentary',
          year: 2019,
          url: 'https://www.netflix.com/title/80194956'
        },
        {
          title: 'Madeleine',
          type: 'book',
          year: 2011,
          url: null
        },
        {
          title: 'Looking for Madeleine',
          type: 'documentary',
          year: 2014,
          url: null
        },
        {
          title: 'Madeleine Was Here',
          type: 'documentary',
          year: 2009,
          url: null
        },
        {
          title: 'The Truth of the Lie (Goncalo Amaral)',
          type: 'book',
          year: 2008,
          url: null
        },
        {
          title: 'Madeleine McCann: Prime Suspect',
          type: 'documentary',
          year: 2022,
          url: null
        }
      ]),

      // Cambios procedimentales
      proceduralChanges: 'El caso expuso deficiencias en la cooperacion policial internacional. Como resultado, se establecieron protocolos mejorados entre Scotland Yard y la Policia Judiciaria portuguesa. Se creo la Operacion Grange en 2011, una revision completa del caso por parte de la policia britanica. Tambien se implementaron cambios en como los medios pueden reportar casos de ninos desaparecidos para evitar interferir con investigaciones activas.',
    },
    create: {
      caseId: caso.id,
      legislationName: 'Child Rescue Alert (UK) y Ley de Alerta de Menores Desaparecidos',
      legislationYear: 2008,
      legislationDesc: 'El caso impulso la implementacion del sistema Child Rescue Alert en Reino Unido, similar al Amber Alert estadounidense. Tambien se fortalecio la cooperacion policial internacional mediante acuerdos entre UK y Portugal, y se revisaron las leyes de prescripcion para delitos contra menores.',
      foundationName: 'Madeleine Fund: Leaving No Stone Unturned',
      foundationDesc: 'Fundacion creada por los padres de Madeleine, Kate y Gerry McCann, para financiar la busqueda privada de su hija y apoyar a otras familias de ninos desaparecidos. Ha recaudado millones de libras y mantiene activa la investigacion.',
      foundationUrl: 'https://www.findmadeleine.com',
      communityImpact: 'El caso transformo la percepcion publica sobre la seguridad infantil en vacaciones. Los resorts turisticos de todo el mundo implementaron medidas de seguridad mas estrictas. Se genero un debate sobre la practica de dejar ninos solos mientras los padres cenan cerca, algo comun en algunos paises europeos.',
      awarenessEffect: 'Madeleine se convirtio en el rostro de los ninos desaparecidos a nivel mundial. Su imagen fue la mas difundida en la historia de casos de personas desaparecidas. El caso demostro el poder de las redes sociales y los medios para mantener viva una investigacion, pero tambien los peligros de la desinformacion y el juicio mediatico.',
      mediaAdaptations: JSON.stringify([
        {
          title: 'La Desaparicion de Madeleine McCann',
          type: 'documentary',
          year: 2019,
          url: 'https://www.netflix.com/title/80194956'
        },
        {
          title: 'Madeleine',
          type: 'book',
          year: 2011,
          url: null
        },
        {
          title: 'Looking for Madeleine',
          type: 'documentary',
          year: 2014,
          url: null
        },
        {
          title: 'Madeleine Was Here',
          type: 'documentary',
          year: 2009,
          url: null
        },
        {
          title: 'The Truth of the Lie (Goncalo Amaral)',
          type: 'book',
          year: 2008,
          url: null
        },
        {
          title: 'Madeleine McCann: Prime Suspect',
          type: 'documentary',
          year: 2022,
          url: null
        }
      ]),
      proceduralChanges: 'El caso expuso deficiencias en la cooperacion policial internacional. Como resultado, se establecieron protocolos mejorados entre Scotland Yard y la Policia Judiciaria portuguesa. Se creo la Operacion Grange en 2011, una revision completa del caso por parte de la policia britanica. Tambien se implementaron cambios en como los medios pueden reportar casos de ninos desaparecidos para evitar interferir con investigaciones activas.',
    },
  })

  console.log('Impacto creado/actualizado:', impact.id)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
