import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const victimsData = [
  {
    fullName: 'Timothy Jack McCoy',
    personality: 'Timothy era un joven aventurero que habia servido a su pais. Era trabajador, independiente y tenia una naturaleza curiosa que lo llevaba a explorar nuevos lugares.',
    hobbies: 'Disfrutaba viajar y conocer nuevos lugares. Habia viajado por el pais despues del servicio militar, buscando nuevas experiencias.',
    dreams: 'Sonaba con establecerse y construir una vida estable despues de sus viajes. Buscaba su lugar en el mundo.',
    familyBackground: 'Venia de Omaha, Nebraska. Habia servido en el ejercito y estaba regresando a casa cuando desaparecio.',
    lifeSummary: 'Timothy McCoy tenia 15 anos y era un joven que habia servido en el ejercito a pesar de su corta edad. Estaba viajando de regreso a casa en Nebraska, lleno de planes para el futuro. Era la primera victima conocida de Gacy.',
  },
  {
    fullName: 'John Butkovich',
    personality: 'John era un joven trabajador y lleno de energia. Era conocido por su etica de trabajo y su determinacion. Cuando algo no le parecia justo, lo decia sin miedo.',
    hobbies: 'Le gustaba trabajar en construccion y era habil con las manos. Disfrutaba pasar tiempo con amigos y tenia una vida social activa.',
    dreams: 'Sonaba con tener su propio negocio de construccion alguna dia. Era ambicioso y trabajaba duro para lograr sus metas.',
    familyBackground: 'Tenia una familia que lo amaba en Chicago. Sus padres lucharon durante anos para encontrar respuestas sobre su desaparicion.',
    occupation: 'Trabajaba para la empresa de construccion de Gacy, PDM Contractors.',
    lifeSummary: 'John Butkovich tenia 18 anos y trabajaba para Gacy en su empresa de construccion. Era un joven trabajador que exigio el pago de su salario atrasado, lo que llevo a una confrontacion. Su familia nunca dejo de buscarlo.',
    familyQuotes: [
      { quote: 'Sabiamos que algo malo habia pasado. John nunca se habria ido sin decirnos.', author: 'Familia Butkovich', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Randall Wayne Reffett',
    personality: 'Randall era un adolescente tranquilo y amable. Era el tipo de chico que no buscaba problemas y trataba de llevarse bien con todos.',
    hobbies: 'Le gustaba pasar tiempo con amigos y disfrutaba de actividades tipicas de adolescentes de su epoca.',
    dreams: 'Como muchos jovenes de 15 anos, Randall sonaba con crecer, tener un carro y vivir aventuras con sus amigos.',
    familyBackground: 'Vivia con su familia en el area de Chicago. Era un chico normal de secundaria con una vida por delante.',
    lifeSummary: 'Randall Reffett tenia solo 15 anos. Era un adolescente con toda una vida por delante, arrebatado demasiado pronto. Su juventud e inocencia hacen su perdida aun mas tragica.',
  },
  {
    fullName: 'Samuel Stapleton',
    personality: 'Samuel era un joven tranquilo y reservado. Preferia mantener un perfil bajo pero era leal con quienes consideraba amigos.',
    hobbies: 'Disfrutaba de la musica y pasar tiempo tranquilo. Era una persona reflexiva.',
    dreams: 'Buscaba encontrar su camino en la vida y construir algo propio.',
    lifeSummary: 'Samuel Stapleton tenia 14 anos. Era apenas un nino, con suenos y esperanzas que nunca pudo realizar. Su corta vida es un recordatorio de la inocencia perdida.',
  },
  {
    fullName: 'Michael Bonnin',
    personality: 'Michael era un joven alegre y sociable. Le gustaba conocer gente nueva y tenia una energia contagiosa.',
    hobbies: 'Disfrutaba de la vida social y de explorar la ciudad. Era curioso y aventurero.',
    dreams: 'Sonaba con encontrar su pasion y construir una carrera. Estaba en esa etapa de la vida donde todo parece posible.',
    lifeSummary: 'Michael Bonnin tenia 17 anos y una personalidad vivaz. Era un joven lleno de vida que merecia la oportunidad de crecer y descubrir quien seria.',
  },
  {
    fullName: 'William Carroll',
    personality: 'William era un adolescente con buen corazon. Era conocido por su amabilidad y su disposicion a ayudar a otros.',
    hobbies: 'Le gustaba pasar tiempo con su familia y amigos. Era un chico de pueblo con valores solidos.',
    dreams: 'Sonaba con tener una buena vida, un trabajo estable y una familia propia algun dia.',
    familyBackground: 'Venia de una familia unida que lo amaba profundamente.',
    lifeSummary: 'William Carroll tenia 16 anos. Era un adolescente con un corazon bondadoso y suenos simples pero sinceros. Su familia nunca supero su perdida.',
  },
  {
    fullName: 'Gregory Godzik',
    personality: 'Gregory era un joven trabajador y responsable. Era el tipo de empleado que llegaba temprano y se quedaba hasta terminar el trabajo.',
    hobbies: 'Le gustaba el trabajo manual y era habil en construccion. Tambien disfrutaba pasar tiempo con su novia y hacer planes para el futuro.',
    dreams: 'Sonaba con casarse con su novia y construir una familia. Estaba ahorrando dinero para su futuro juntos.',
    occupation: 'Trabajaba para PDM Contractors, la empresa de Gacy.',
    lifeSummary: 'Gregory Godzik tenia 17 anos y estaba enamorado. Trabajaba duro para construir un futuro con su novia. Era un joven con planes y esperanzas que fueron cruelmente truncados.',
    familyQuotes: [
      { quote: 'Gregory tenia toda su vida planeada. Iban a casarse. El la amaba tanto.', author: 'Familia Godzik', relation: 'Familia' }
    ]
  },
  {
    fullName: 'John Wayne Szyc',
    personality: 'John era un joven independiente y aventurero. Le gustaba su libertad y disfrutaba de la vida sin preocuparse demasiado por el manana.',
    hobbies: 'Amaba su carro, un Plymouth Satellite 1971, que era su orgullo. Le gustaba conducir y sentir la libertad de la carretera.',
    dreams: 'Sonaba con viajar y ver el mundo. Su carro era el primer paso hacia esa libertad.',
    lifeSummary: 'John Szyc tenia 19 anos y amaba la libertad. Su carro era su posesion mas preciada. Irónicamente, Gacy vendio ese carro a otro empleado que luego tambien seria victima.',
  },
  {
    fullName: 'Robert Piest',
    personality: 'Robert era un joven excepcional: trabajador, inteligente y dedicado a su familia. Era el orgullo de sus padres y un ejemplo para sus companeros.',
    hobbies: 'Era miembro del equipo de gimnasia de su escuela y le encantaba el deporte. Tambien trabajaba en una farmacia para ayudar a su familia.',
    dreams: 'Sonaba con ir a la universidad y convertirse en profesional. Tenia las notas y la determinacion para lograrlo.',
    talents: 'Era un gimnasta talentoso y un estudiante sobresaliente. Todo lo que hacia, lo hacia bien.',
    familyBackground: 'Venia de una familia unida y amorosa. Sus padres, Elizabeth y Harold, lo adoraban. Tenia hermanos que lo admiraban.',
    education: 'Estudiante de secundaria con excelentes calificaciones, preparandose para la universidad.',
    occupation: 'Trabajaba medio tiempo en la farmacia Nisson.',
    lifeSummary: 'Robert Piest tenia 15 anos y era el hijo que todos los padres suenan. Estudiante de honor, atleta, trabajador. La noche que desaparecio, habia ido a hablar con Gacy sobre un trabajo mejor pagado. Su madre lo esperaba afuera para celebrar su cumpleanos.',
    familyQuotes: [
      { quote: 'Era el cumpleanos de Robert. Lo estaba esperando en el estacionamiento. Nunca salio.', author: 'Elizabeth Piest', relation: 'Madre' },
      { quote: 'Robert era perfecto. Era todo lo que un padre podia pedir. Y nos lo arrebataron.', author: 'Harold Piest', relation: 'Padre' }
    ]
  },
  {
    fullName: 'Francis Wayne Alexander',
    personality: 'Francis, conocido por su segundo nombre Wayne, era un joven que buscaba su lugar en el mundo. Era amable y tenia un espiritu gentil.',
    hobbies: 'Disfrutaba de la musica y de conocer gente nueva. Estaba explorando la vida y descubriendo quien era.',
    dreams: 'Sonaba con encontrar aceptacion y un lugar donde pudiera ser el mismo. Como muchos jovenes de su epoca, buscaba conexion.',
    lifeSummary: 'Francis Wayne Alexander tenia 21 anos. Era uno de los jovenes que permanecio sin identificar durante decadas. Gracias a avances en ADN, finalmente fue identificado en 2021, devolviendole su nombre y su historia.',
    familyQuotes: [
      { quote: 'Finalmente sabemos que paso con Wayne. Ahora puede descansar en paz.', author: 'Familia Alexander', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Victima Sin Identificar #1',
    personality: 'Aunque su nombre se perdio, era un ser humano con suenos, esperanzas y una familia que lo amaba. Merece ser recordado con dignidad.',
    lifeSummary: 'Esta victima aun no ha sido identificada. Pero detras de los huesos sin nombre habia un joven con una vida, una familia, suenos. Merece que su historia sea conocida, y algun dia, que su nombre sea recuperado.',
  }
]

async function main() {
  console.log('Actualizando victimas de John Wayne Gacy...\n')

  for (const data of victimsData) {
    const victim = await prisma.victim.findFirst({
      where: { fullName: data.fullName }
    })

    if (!victim) {
      console.log(`❌ No encontrada: ${data.fullName}`)
      continue
    }

    await prisma.victim.update({
      where: { id: victim.id },
      data: {
        personality: data.personality,
        hobbies: data.hobbies || null,
        dreams: data.dreams || null,
        talents: data.talents || null,
        familyBackground: data.familyBackground || null,
        education: data.education || null,
        occupation: data.occupation || null,
        lifeSummary: data.lifeSummary,
        familyQuotes: data.familyQuotes ? JSON.stringify(data.familyQuotes) : null,
      }
    })

    console.log(`✅ ${data.fullName}`)
  }

  console.log('\n¡Completado!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
