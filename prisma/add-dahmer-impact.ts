import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Buscar el caso de Jeffrey Dahmer
  const caso = await prisma.case.findUnique({
    where: { slug: 'jeffrey-dahmer' },
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
      legislationName: 'Ley de Notificacion a la Comunidad de Depredadores Sexuales de Wisconsin',
      legislationYear: 1994,
      legislationDesc: 'Tras el caso Dahmer, Wisconsin aprobo leyes mas estrictas que requieren que los agresores sexuales registrados notifiquen a las autoridades locales cuando se mudan a una nueva area. Tambien se fortalecieron los protocolos de comunicacion entre departamentos de policia.',

      // Fundacion
      foundationName: 'No existe una fundacion especifica',
      foundationDesc: 'Aunque no se creo una fundacion con el nombre de las victimas, el caso impulso multiples iniciativas de apoyo a victimas de crimenes violentos y a la comunidad LGBTQ+ de Milwaukee, que fue particularmente afectada.',
      foundationUrl: null,

      // Impacto comunitario
      communityImpact: 'El caso devastó a la comunidad afroamericana y LGBTQ+ de Milwaukee. Revelo fallas sistemicas en como la policia trataba a las minorias. El incidente de Konerak Sinthasomphone, un joven de 14 años que escapo pero fue devuelto a Dahmer por la policia, genero protestas masivas y demandas de reforma policial.',
      awarenessEffect: 'El caso genero un debate nacional sobre prejuicios raciales y homofobicos en las fuerzas policiales. Se convirtio en un ejemplo de como los sesgos pueden tener consecuencias fatales cuando las autoridades no toman en serio las denuncias de comunidades marginadas.',

      // Adaptaciones mediaticas
      mediaAdaptations: JSON.stringify([
        {
          title: 'Dahmer - Monstruo: La Historia de Jeffrey Dahmer',
          type: 'series',
          year: 2022,
          url: 'https://www.netflix.com/title/81287562'
        },
        {
          title: 'Conversaciones con un Asesino: Las Cintas de Jeffrey Dahmer',
          type: 'documentary',
          year: 2022,
          url: 'https://www.netflix.com/title/81393459'
        },
        {
          title: 'My Friend Dahmer',
          type: 'movie',
          year: 2017,
          url: null
        },
        {
          title: 'The Jeffrey Dahmer Files',
          type: 'documentary',
          year: 2012,
          url: null
        },
        {
          title: 'A Father\'s Story',
          type: 'book',
          year: 1994,
          url: null
        }
      ]),

      // Cambios procedimentales
      proceduralChanges: 'El Departamento de Policia de Milwaukee implemento reformas significativas: capacitacion obligatoria sobre sensibilidad cultural y hacia la comunidad LGBTQ+, nuevos protocolos para responder a llamadas de bienestar, y revision de politicas sobre como manejar situaciones que involucran a menores. Tres oficiales fueron despedidos por el incidente de Konerak Sinthasomphone.',
    },
    create: {
      caseId: caso.id,
      legislationName: 'Ley de Notificacion a la Comunidad de Depredadores Sexuales de Wisconsin',
      legislationYear: 1994,
      legislationDesc: 'Tras el caso Dahmer, Wisconsin aprobo leyes mas estrictas que requieren que los agresores sexuales registrados notifiquen a las autoridades locales cuando se mudan a una nueva area. Tambien se fortalecieron los protocolos de comunicacion entre departamentos de policia.',
      foundationName: 'No existe una fundacion especifica',
      foundationDesc: 'Aunque no se creo una fundacion con el nombre de las victimas, el caso impulso multiples iniciativas de apoyo a victimas de crimenes violentos y a la comunidad LGBTQ+ de Milwaukee, que fue particularmente afectada.',
      foundationUrl: null,
      communityImpact: 'El caso devastó a la comunidad afroamericana y LGBTQ+ de Milwaukee. Revelo fallas sistemicas en como la policia trataba a las minorias. El incidente de Konerak Sinthasomphone, un joven de 14 años que escapo pero fue devuelto a Dahmer por la policia, genero protestas masivas y demandas de reforma policial.',
      awarenessEffect: 'El caso genero un debate nacional sobre prejuicios raciales y homofobicos en las fuerzas policiales. Se convirtio en un ejemplo de como los sesgos pueden tener consecuencias fatales cuando las autoridades no toman en serio las denuncias de comunidades marginadas.',
      mediaAdaptations: JSON.stringify([
        {
          title: 'Dahmer - Monstruo: La Historia de Jeffrey Dahmer',
          type: 'series',
          year: 2022,
          url: 'https://www.netflix.com/title/81287562'
        },
        {
          title: 'Conversaciones con un Asesino: Las Cintas de Jeffrey Dahmer',
          type: 'documentary',
          year: 2022,
          url: 'https://www.netflix.com/title/81393459'
        },
        {
          title: 'My Friend Dahmer',
          type: 'movie',
          year: 2017,
          url: null
        },
        {
          title: 'The Jeffrey Dahmer Files',
          type: 'documentary',
          year: 2012,
          url: null
        },
        {
          title: 'A Father\'s Story',
          type: 'book',
          year: 1994,
          url: null
        }
      ]),
      proceduralChanges: 'El Departamento de Policia de Milwaukee implemento reformas significativas: capacitacion obligatoria sobre sensibilidad cultural y hacia la comunidad LGBTQ+, nuevos protocolos para responder a llamadas de bienestar, y revision de politicas sobre como manejar situaciones que involucran a menores. Tres oficiales fueron despedidos por el incidente de Konerak Sinthasomphone.',
    },
  })

  console.log('Impacto creado/actualizado:', impact.id)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
