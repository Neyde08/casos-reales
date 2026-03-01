import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface VictimUpdate {
  fullName: string
  personality?: string
  hobbies?: string
  dreams?: string
  talents?: string
  familyBackground?: string
  socialLife?: string
  education?: string
  occupation?: string
  lifeSummary?: string
  familyQuotes?: { quote: string; author: string; relation: string }[]
  friendsQuotes?: { quote: string; author: string; relation: string }[]
}

const victimsData: VictimUpdate[] = [
  {
    fullName: 'Steven Mark Hicks',
    personality: 'Steven era un joven alegre, aventurero y con espiritu libre. Le encantaba conocer gente nueva y nunca le decia que no a una aventura. Era conocido por su sonrisa facil y su actitud relajada ante la vida.',
    hobbies: 'Amaba la musica rock, especialmente asistir a conciertos. Le gustaba hacer autostop para viajar y conocer nuevos lugares. Disfrutaba pasar tiempo al aire libre y hacer ejercicio.',
    dreams: 'Steven sonaba con encontrar su camino en la vida. Acababa de graduarse de la secundaria y estaba explorando sus opciones. Queria vivir experiencias antes de decidir que hacer con su futuro.',
    familyBackground: 'Crecia en una familia de clase media en Coventry Township, Ohio. Sus padres, Richard y Martha Hicks, lo adoraban. Era su unico hijo y el centro de sus vidas.',
    socialLife: 'Era popular entre sus companeros. Tenia muchos amigos y era conocido por ser una persona en quien se podia confiar. Le gustaba socializar y hacer nuevas amistades.',
    education: 'Se habia graduado recientemente de Coventry High School en junio de 1978.',
    lifeSummary: 'Steven Mark Hicks tenia solo 18 anos y toda una vida por delante. Era un joven con espiritu aventurero que acababa de graduarse de la secundaria. El dia que desaparecio, iba a un concierto de rock. Era amado por su familia y querido por sus amigos. Su sonrisa y su energia positiva dejaron una marca en todos los que lo conocieron.',
    familyQuotes: [
      { quote: 'Steven era la luz de nuestras vidas. Era un chico bueno que solo queria disfrutar de la vida.', author: 'Richard Hicks', relation: 'Padre' }
    ]
  },
  {
    fullName: 'Steven Walter Tuomi',
    personality: 'Steven era un hombre tranquilo y reservado, pero carinoso con quienes lo conocian bien. Tenia un sentido del humor sutil y una forma gentil de tratar a los demas.',
    hobbies: 'Le gustaba cocinar y era conocido por preparar comidas para sus amigos. Disfrutaba de la vida nocturna de Milwaukee y de pasar tiempo en lugares donde podia ser el mismo.',
    dreams: 'Sonaba con encontrar estabilidad y una pareja con quien compartir su vida. Habia dejado su ciudad natal buscando un lugar donde pudiera vivir abiertamente.',
    familyBackground: 'Originario de Ontonagon, Michigan, una pequena ciudad en la Peninsula Superior. Se habia mudado a Milwaukee buscando una comunidad mas acogedora.',
    socialLife: 'Era parte de la comunidad gay de Milwaukee. Aunque era reservado, tenia amigos cercanos que valoraban su lealtad y su bondad.',
    occupation: 'Trabajaba en un restaurante en Milwaukee, donde era apreciado por su etica de trabajo.',
    lifeSummary: 'Steven Tuomi era un hombre de 25 anos que habia encontrado su lugar en Milwaukee. Venia de una pequena ciudad de Michigan y habia buscado una comunidad donde pudiera ser aceptado. Era trabajador, leal y sonaba con encontrar el amor y la estabilidad.',
    friendsQuotes: [
      { quote: 'Steven era de esas personas que te hacian sentir bienvenido. Nunca juzgaba a nadie.', author: 'Amigo cercano', relation: 'Amigo' }
    ]
  },
  {
    fullName: 'James Doxtator',
    personality: 'James, conocido como Jamie por su familia, era un adolescente con una sonrisa contagiosa. A pesar de las dificultades que enfrentaba, mantenia una actitud positiva y un corazon generoso.',
    hobbies: 'Le encantaba la musica y bailar. Sonaba con ser DJ alguna dia. Tambien le gustaba pasar tiempo con su familia, especialmente con sus hermanos menores.',
    dreams: 'Jamie sonaba con salir adelante y ayudar a su familia. Queria demostrar que podia lograr cosas grandes a pesar de las circunstancias dificiles.',
    familyBackground: 'Era de herencia nativa americana (Stockbridge-Munsee). Venia de una familia con dificultades economicas pero llena de amor. Su madre, Debra, luchaba por mantener a sus hijos.',
    socialLife: 'Aunque joven, Jamie era protector con sus amigos y hermanos. Era conocido en su vecindario por su energia y su disposicion a ayudar.',
    education: 'Asistia a la secundaria pero las dificultades economicas de su familia a veces interferan con sus estudios.',
    lifeSummary: 'James Doxtator tenia solo 14 anos. Era un nino nativo americano con suenos grandes y un corazon aun mas grande. A pesar de crecer en circunstancias dificiles, Jamie mantenia su optimismo. Sonaba con ser DJ y ayudar a su madre. Su sonrisa iluminaba cualquier habitacion.',
    familyQuotes: [
      { quote: 'Mi Jamie era un buen chico. Solo tenia 14 anos. Tenia toda una vida por delante.', author: 'Debra Vega', relation: 'Madre' }
    ]
  },
  {
    fullName: 'Richard Guerrero',
    personality: 'Richard era carismatico y lleno de vida. Tenia una personalidad magnetica que atraia a las personas. Era conocido por su sentido del humor y su habilidad para hacer reir a los demas.',
    hobbies: 'Amaba la musica disco y bailar. Era un habitual en las discotecas de Milwaukee. Tambien disfrutaba de la moda y siempre se vestia con estilo.',
    dreams: 'Sonaba con tener su propio negocio alguna dia. Era ambicioso y creia que podia lograr cualquier cosa que se propusiera.',
    familyBackground: 'Venia de una familia mexicano-americana unida en Milwaukee. Era muy cercano a sus padres y hermanos. Su familia era su prioridad.',
    socialLife: 'Richard era el alma de la fiesta. Tenia muchos amigos y era querido en la comunidad. Su energia era contagiosa.',
    occupation: 'Trabajaba para ayudar a su familia mientras buscaba oportunidades para avanzar.',
    lifeSummary: 'Richard Guerrero era un joven de 24 anos lleno de vida y ambicion. De origen mexicano-americano, era el corazon de su familia y el alma de cualquier fiesta. Su sonrisa, su estilo y su energia positiva dejaron una marca imborrable en todos los que lo conocieron.',
    familyQuotes: [
      { quote: 'Richard era especial. Iluminaba cada habitacion en la que entraba. Extranaremos su risa para siempre.', author: 'Familia Guerrero', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Anthony Lee Sears',
    personality: 'Anthony era encantador, inteligente y tenia una presencia que llamaba la atencion. Era seguro de si mismo pero nunca arrogante. Trataba a todos con respeto y dignidad.',
    hobbies: 'Le apasionaba la moda y siempre estaba impecablemente vestido. Disfrutaba de la fotografia y tenia un ojo artistico para capturar momentos.',
    dreams: 'Sonaba con avanzar en su carrera y eventualmente convertirse en gerente. Era ambicioso y trabajaba duro para lograr sus metas.',
    talents: 'Tenia talento para conectar con las personas. Era excelente en atencion al cliente y sus jefes lo valoraban enormemente.',
    familyBackground: 'Crecia en una familia amorosa que lo apoyaba incondicionalmente. Era muy cercano a su madre, quien estaba increiblemente orgullosa de el.',
    socialLife: 'Era popular y tenia un circulo amplio de amigos. La gente gravitaba hacia el por su calidez y autenticidad.',
    occupation: 'Trabajaba como gerente asistente en un restaurante Baker\'s Square, donde era muy apreciado.',
    lifeSummary: 'Anthony Sears era un hombre de 24 anos con un futuro brillante. Era inteligente, trabajador y tenia un encanto natural. Acababa de ser promovido en su trabajo y sonaba con seguir creciendo profesionalmente. Era amado por su familia y admirado por sus amigos.',
    familyQuotes: [
      { quote: 'Anthony era mi orgullo y alegria. Era un hombre bueno con un corazon de oro.', author: 'Marilyn Sears', relation: 'Madre' }
    ]
  },
  {
    fullName: 'Raymond Lamont Smith',
    personality: 'Raymond, conocido como Ricky, era un espiritu libre con un corazon artistico. Era sensible, creativo y veia belleza en lugares donde otros no la veian.',
    hobbies: 'Amaba el modelaje y la actuacion. Participaba en shows de drag bajo el nombre "Ricky Beeks". Le encantaba expresarse a traves del arte y la moda.',
    dreams: 'Sonaba con una carrera en el entretenimiento. Queria actuar, modelar y mostrar al mundo su talento unico.',
    talents: 'Era un artista nato. Tenia presencia escenica y sabia como cautivar a una audiencia. Su creatividad no tenia limites.',
    familyBackground: 'Venia de Milwaukee y tenia una familia que, aunque no siempre entendia su estilo de vida, lo amaba profundamente.',
    socialLife: 'Era una figura conocida en la escena LGBTQ+ de Milwaukee. Tenia muchos amigos que admiraban su valentia para ser el mismo.',
    lifeSummary: 'Raymond "Ricky" Smith era un artista de 32 anos que vivia la vida en sus propios terminos. Era conocido en la comunidad LGBTQ+ de Milwaukee por sus shows y su personalidad vibrante. Sonaba con el estrellato pero ya era una estrella para quienes lo conocian.',
    friendsQuotes: [
      { quote: 'Ricky era unico. No le tenia miedo a nada. Vivia su verdad todos los dias.', author: 'Amigo de la comunidad', relation: 'Amigo' }
    ]
  },
  {
    fullName: 'Edward Warren Smith',
    personality: 'Edward, conocido como Eddie, era un hombre tranquilo con una profunda amabilidad. Era el tipo de persona que escuchaba mas de lo que hablaba, pero cuando hablaba, sus palabras tenian peso.',
    hobbies: 'Le gustaba la musica y pasar tiempo tranquilo. Disfrutaba de las conversaciones profundas y de conocer gente nueva.',
    dreams: 'Buscaba conexion y pertenencia. Como muchos, sonaba con encontrar su lugar en el mundo y personas que lo aceptaran tal como era.',
    familyBackground: 'Originario del area de Milwaukee, Eddie habia enfrentado desafios en su vida pero mantenia su dignidad y esperanza.',
    lifeSummary: 'Edward "Eddie" Smith tenia 27 anos y buscaba su camino en la vida. Era un hombre gentil que merecia mucho mas de lo que la vida le dio. Su amabilidad y su espiritu tranquilo son recordados por quienes tuvieron la suerte de conocerlo.',
  },
  {
    fullName: 'Ernest Marquez Miller',
    personality: 'Ernest era un joven vibrante con una fe profunda. Era conocido por su dedicacion a su iglesia y su amor por la danza. Tenia una energia que inspiraba a otros.',
    hobbies: 'Era un bailarin talentoso y participaba activamente en el coro de su iglesia. La danza y la musica eran sus formas de expresar su alegria y su fe.',
    dreams: 'Sonaba con dedicarse profesionalmente a la danza. Tambien queria usar sus talentos para inspirar a otros jovenes de su comunidad.',
    talents: 'Era un bailarin excepcional. Su gracia y pasion en el escenario eran evidentes para todos los que lo veian actuar.',
    familyBackground: 'Venia de una familia afroamericana devota en Chicago. Estaba estudiando en Milwaukee y mantenia fuertes lazos con su familia y su iglesia.',
    education: 'Estudiaba en Milwaukee mientras desarrollaba su pasion por la danza.',
    lifeSummary: 'Ernest Miller era un joven de 22 anos con un don para la danza y una fe inquebrantable. Era activo en su iglesia y sonaba con inspirar a otros a traves de su arte. Su talento, su fe y su sonrisa brillante son recordados por su familia y comunidad.',
    familyQuotes: [
      { quote: 'Ernest amaba al Senor y amaba bailar. Era un angel en la tierra.', author: 'Familia Miller', relation: 'Familia' }
    ]
  },
  {
    fullName: 'David Courtney Thomas',
    personality: 'David era un joven dulce y considerado. Tenia una naturaleza gentil y siempre pensaba en los demas antes que en si mismo.',
    hobbies: 'Disfrutaba pasar tiempo con amigos y familia. Le gustaba la musica y mantenia una actitud positiva a pesar de los desafios.',
    dreams: 'Sonaba con construir una vida estable y feliz. Queria encontrar su camino y hacer orgullosa a su familia.',
    familyBackground: 'Tenia una hermana gemela, Chandra, con quien compartia un vinculo especial. Su familia lo adoraba.',
    lifeSummary: 'David Thomas tenia 22 anos y un corazon gentil. Tenia una hermana gemela que lo amaba profundamente. Era un joven que merecia una vida larga y feliz. Su dulzura y su bondad son recordadas por quienes lo conocieron.',
    familyQuotes: [
      { quote: 'David era mi gemelo, mi otra mitad. Una parte de mi murio con el.', author: 'Chandra Thomas', relation: 'Hermana gemela' }
    ]
  },
  {
    fullName: 'Curtis Durrell Straughter',
    personality: 'Curtis era un adolescente con grandes suenos y una determinacion ferrea. A pesar de las dificultades, mantenia una actitud positiva y trabajaba duro por un futuro mejor.',
    hobbies: 'Le encantaba la musica y sonaba con una carrera en el entretenimiento. Era creativo y tenia un estilo unico.',
    dreams: 'Sonaba con convertirse en modelo. Tenia la confianza y el carisma para lograrlo. Queria salir de la pobreza y hacer algo grande con su vida.',
    talents: 'Tenia presencia y carisma natural. La gente notaba algo especial en el desde el momento en que entraba a una habitacion.',
    familyBackground: 'Crecia en circunstancias dificiles pero su abuela, Catherine Straughter, lo crio con amor. Ella era su roca y su mayor apoyo.',
    education: 'Asistia a la escuela y trabajaba para ayudar a su familia.',
    lifeSummary: 'Curtis Straughter tenia solo 17 anos pero suenos del tamano del mundo. Criado por su abuela amorosa, sonaba con ser modelo y escapar de la pobreza. Tenia el carisma y la determinacion para lograrlo. Su vida fue cortada antes de que pudiera alcanzar su potencial.',
    familyQuotes: [
      { quote: 'Curtis era mi bebe. Tenia tantos suenos. Iba a ser alguien importante.', author: 'Catherine Straughter', relation: 'Abuela' }
    ]
  },
  {
    fullName: 'Errol Lindsey',
    personality: 'Errol era un joven responsable y trabajador. Era conocido por su amabilidad y su dedicacion a su familia. Tenia una madurez mas alla de sus anos.',
    hobbies: 'Le gustaba la musica rap y R&B. Disfrutaba pasar tiempo con sus hermanas y era muy protector con ellas.',
    dreams: 'Sonaba con construir una carrera estable y cuidar de su familia. Era el tipo de persona que ponia a los demas primero.',
    talents: 'Era habil con las manos y bueno en su trabajo. La gente confiaba en el porque siempre cumplia.',
    familyBackground: 'Era muy cercano a su madre y sus hermanas. Era el hermano mayor y se tomaba ese rol muy en serio.',
    occupation: 'Trabajaba como aprendiz en una tienda de llaves.',
    lifeSummary: 'Errol Lindsey tenia 19 anos y era el pilar de su familia. Trabajador, responsable y protector de sus hermanas, Errol era el tipo de joven que hacia sentir orgullosos a sus padres. Su amor por su familia y su etica de trabajo son su legado.',
    familyQuotes: [
      { quote: 'Errol era mi protector. Siempre cuidaba de nosotras. Era el mejor hermano mayor.', author: 'Rita Isbell', relation: 'Hermana' }
    ]
  },
  {
    fullName: 'Tony Anthony Hughes',
    personality: 'Tony era extraordinario. A pesar de ser sordo y mudo desde los dos anos, tenia una personalidad vibrante que trascendia cualquier barrera. Se comunicaba con una sonrisa que iluminaba habitaciones.',
    hobbies: 'Amaba bailar. A pesar de no poder oir la musica, sentia las vibraciones y se movia con una gracia increible. Era conocido en los clubs por su talento.',
    dreams: 'Sonaba con ser modelo. Habia viajado a Los Angeles para perseguir ese sueno y no se rendia ante ningun obstaculo.',
    talents: 'Era un bailarin excepcional. Sentia la musica a traves de las vibraciones del piso y bailaba con una pasion que dejaba a todos asombrados.',
    familyBackground: 'Venia de Madison, Wisconsin. Su familia lo adoraba y estaba increiblemente orgullosa de como enfrentaba la vida con valentia y alegria.',
    socialLife: 'Era querido por todos. Su discapacidad nunca lo limito para hacer amigos. La gente gravitaba hacia su energia positiva.',
    lifeSummary: 'Tony Hughes era un hombre de 31 anos que no conocia limites. Sordo y mudo desde la infancia, Tony no dejo que nada lo detuviera. Era bailarin, aspirante a modelo, y tenia una sonrisa que podia iluminar la noche mas oscura. Su valentia y alegria de vivir inspiran a todos los que conocen su historia.',
    familyQuotes: [
      { quote: 'Tony nunca dejo que su discapacidad lo definiera. El se definia por su sonrisa, su baile y su amor por la vida.', author: 'Shirley Hughes', relation: 'Madre' }
    ]
  },
  {
    fullName: 'Konerak Sinthasomphone',
    personality: 'Konerak era un nino dulce, timido y gentil. Era querido por su familia y conocido por su naturaleza tranquila y su sonrisa suave.',
    hobbies: 'Le gustaba el futbol y pasar tiempo con sus hermanos. Era un nino normal con intereses normales de un adolescente.',
    dreams: 'Como cualquier nino de 14 anos, Konerak sonaba con crecer, tener aventuras y hacer feliz a su familia.',
    familyBackground: 'Su familia habia huido de Laos y habia construido una nueva vida en Milwaukee. Eran una familia unida que habia superado muchas dificultades juntos.',
    education: 'Asistia a la escuela secundaria y era un estudiante aplicado.',
    lifeSummary: 'Konerak Sinthasomphone tenia solo 14 anos. Era un nino laosiano cuya familia habia huido de la guerra buscando una vida mejor en America. Era dulce, timido y amado profundamente por su familia. Su caso es particularmente tragico porque escapo de su captor, pero la policia lo devolvio, ignorando las suplicas de testigos.',
    familyQuotes: [
      { quote: 'Konerak era nuestro bebe. Era un buen nino. La policia lo devolvio a su asesino. Nunca los perdonaremos.', author: 'Familia Sinthasomphone', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Matt Cleveland Turner',
    personality: 'Matt, conocido como Donald Montrell, era un joven con una personalidad vivaz y un espiritu libre. Era conocido por su estilo unico y su energia positiva.',
    hobbies: 'Le gustaba la moda, la musica y la vida nocturna. Era creativo y expresaba su personalidad a traves de su estilo.',
    dreams: 'Sonaba con encontrar su lugar en el mundo y ser aceptado por quien realmente era.',
    familyBackground: 'Originario de Chicago, Matt habia viajado a Milwaukee. Enfrentaba desafios pero mantenia su espiritu.',
    lifeSummary: 'Matt Turner tenia 20 anos y buscaba su camino en la vida. Era un joven con estilo propio y suenos de aceptacion. Merecia la oportunidad de encontrar su lugar en el mundo.',
  },
  {
    fullName: 'Jeremiah Benjamin Weinberger',
    personality: 'Jeremiah era encantador, carinoso y tenia una forma de hacer sentir especial a cada persona que conocia. Era conocido por su corazon abierto y su naturaleza amorosa.',
    hobbies: 'Le encantaba viajar y conocer gente nueva. Era aventurero y disfrutaba de experiencias nuevas. Tambien le gustaba el arte y la cultura.',
    dreams: 'Sonaba con encontrar el amor verdadero y construir una vida llena de conexiones significativas.',
    familyBackground: 'Originario de Chicago, Jeremiah tenia una familia que lo amaba. Habia viajado a Milwaukee para visitar a alguien que habia conocido.',
    socialLife: 'Era social y hacia amigos facilmente. La gente se sentia atraida por su calidez y autenticidad.',
    lifeSummary: 'Jeremiah Weinberger era un hombre de 23 anos con un corazon enorme. Era carinoso, aventurero y buscaba conexiones genuinas. Habia viajado a Milwaukee buscando amor y encontro la tragedia. Su familia y amigos lo recuerdan por su bondad.',
    familyQuotes: [
      { quote: 'Jeremiah tenia el corazon mas grande. Solo queria amar y ser amado.', author: 'Familia Weinberger', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Oliver Joseph Lacy',
    personality: 'Oliver era un hombre de familia dedicado y trabajador. Era responsable, amoroso y ponia a su familia por encima de todo.',
    hobbies: 'Disfrutaba pasar tiempo con su hijo y su novia. Era un padre presente y carinoso. Tambien le gustaba el ejercicio y mantenerse en forma.',
    dreams: 'Sonaba con darle a su hijo la mejor vida posible. Queria ser un buen padre y un buen hombre.',
    talents: 'Era atletico y disciplinado. La gente admiraba su dedicacion a su familia y su etica de trabajo.',
    familyBackground: 'Tenia una novia y un hijo pequeno de dos anos. Eran el centro de su mundo.',
    occupation: 'Tenia un buen trabajo y trabajaba duro para proveer para su familia.',
    lifeSummary: 'Oliver Lacy era un hombre de 24 anos con una familia que adoraba. Era padre de un nino de dos anos y planeaba casarse con su novia. Era trabajador, atletico y dedicado. Su hijo crecera sin conocer a su padre, pero sabra que era un buen hombre.',
    familyQuotes: [
      { quote: 'Oliver era un padre maravilloso. Adoraba a su hijo. Ibamos a casarnos. El era mi todo.', author: 'Rose Colon', relation: 'Novia' }
    ]
  },
  {
    fullName: 'Joseph Arthur Bradehoft',
    personality: 'Joseph era un hombre que estaba reconstruyendo su vida. Era resiliente, trabajador y determinado a superar los desafios que enfrentaba.',
    hobbies: 'Disfrutaba de la musica y de pasar tiempo al aire libre. Mantenia una actitud positiva a pesar de las dificultades.',
    dreams: 'Sonaba con reunirse con sus tres hijos y reconstruir su vida. Estaba trabajando duro para volver a estar con ellos.',
    familyBackground: 'Era padre de tres hijos de un matrimonio anterior. Aunque estaba separado, amaba profundamente a sus hijos y trabajaba para volver a verlos.',
    occupation: 'Estaba buscando trabajo activamente en Milwaukee, determinado a estabilizar su vida.',
    lifeSummary: 'Joseph Bradehoft tenia 25 anos y era padre de tres ninos. Estaba atravesando un momento dificil pero no se rendia. Habia viajado a Milwaukee buscando trabajo para poder reunirse con sus hijos. Era un hombre que luchaba por su familia.',
    familyQuotes: [
      { quote: 'Joseph solo queria volver con sus hijos. Estaba haciendo todo lo posible por reconstruir su vida.', author: 'Familia Bradehoft', relation: 'Familia' }
    ]
  }
]

async function main() {
  console.log('Actualizando informacion de victimas de Dahmer...\n')

  for (const data of victimsData) {
    const victim = await prisma.victim.findFirst({
      where: { fullName: data.fullName }
    })

    if (!victim) {
      console.log(`❌ Victima no encontrada: ${data.fullName}`)
      continue
    }

    await prisma.victim.update({
      where: { id: victim.id },
      data: {
        personality: data.personality || victim.personality,
        hobbies: data.hobbies || victim.hobbies,
        dreams: data.dreams || victim.dreams,
        talents: data.talents || victim.talents,
        familyBackground: data.familyBackground || victim.familyBackground,
        socialLife: data.socialLife || victim.socialLife,
        education: data.education || victim.education,
        occupation: data.occupation || victim.occupation,
        lifeSummary: data.lifeSummary || victim.lifeSummary,
        familyQuotes: data.familyQuotes ? JSON.stringify(data.familyQuotes) : victim.familyQuotes,
        friendsQuotes: data.friendsQuotes ? JSON.stringify(data.friendsQuotes) : victim.friendsQuotes,
      }
    })

    console.log(`✅ ${data.fullName}`)
  }

  console.log('\n¡Completado!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
