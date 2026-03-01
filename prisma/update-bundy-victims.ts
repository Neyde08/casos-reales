import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const victimsData = [
  {
    fullName: 'Lynda Ann Healy',
    personality: 'Lynda era brillante, carismatica y tenia una sonrisa que iluminaba cualquier habitacion. Era la definicion de una joven con futuro prometedor.',
    hobbies: 'Amaba esquiar y era locutora de radio para informes de esqui. Le encantaba la naturaleza y las actividades al aire libre.',
    dreams: 'Estudiaba psicologia y sonaba con ayudar a otros. Tenia planes de continuar su educacion y hacer una diferencia en el mundo.',
    talents: 'Era una comunicadora natural, lo que la llevo a trabajar en radio. Tambien era una esquiadora talentosa.',
    familyBackground: 'Venia de una familia amorosa en Seattle. Era la mayor de varios hermanos y un modelo a seguir para ellos.',
    education: 'Estudiante de psicologia en la Universidad de Washington.',
    occupation: 'Trabajaba como locutora de radio dando informes de condiciones para esquiar.',
    lifeSummary: 'Lynda Healy tenia 21 anos y era la imagen del exito. Estudiante universitaria, locutora de radio, esquiadora. Era hermosa por dentro y por fuera. Desaparecio de su habitacion en una casa compartida cerca de la universidad.',
    familyQuotes: [
      { quote: 'Lynda era todo lo que unos padres podian pedir. Era nuestra estrella.', author: 'Familia Healy', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Donna Gail Manson',
    personality: 'Donna era una espiritu libre con una mente creativa. Era artistica, pensativa y veia el mundo de una manera unica.',
    hobbies: 'Amaba el arte y la musica. Escribia poesia y disfrutaba de expresarse creativamente.',
    dreams: 'Sonaba con una vida llena de arte y creatividad. Queria explorar el mundo y encontrar su voz artistica.',
    education: 'Estudiante en Evergreen State College en Olympia, Washington.',
    lifeSummary: 'Donna Manson tenia 19 anos y un alma artistica. Era estudiante universitaria con suenos de creatividad y expresion. Desaparecio camino a un concierto de jazz en el campus.',
  },
  {
    fullName: 'Susan Elaine Rancourt',
    personality: 'Susan era dulce, timida y genuinamente bondadosa. Tenia una naturaleza gentil que hacia que todos quisieran protegerla.',
    hobbies: 'Le encantaba la biologia y pasaba horas estudiando la naturaleza. Era una estudiante dedicada.',
    dreams: 'Sonaba con una carrera en ciencias biologicas. Queria entender el mundo natural y contribuir al conocimiento cientifico.',
    education: 'Estudiante de biologia en Central Washington State College.',
    lifeSummary: 'Susan Rancourt tenia 18 anos y una mente curiosa. Era timida pero brillante, con pasion por la biologia. Desaparecio despues de asistir a una reunion en el campus.',
    familyQuotes: [
      { quote: 'Susan era tan gentil. No tenia un hueso malo en su cuerpo.', author: 'Familia Rancourt', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Roberta Kathleen Parks',
    personality: 'Roberta, conocida como Kathy, era una joven vivaz con una risa contagiosa. Era popular y querida por todos.',
    hobbies: 'Le encantaba la moda y siempre estaba impecablemente vestida. Disfrutaba de las actividades sociales y tenia muchos amigos.',
    dreams: 'Estudiaba humanidades y sonaba con una carrera que le permitiera ayudar a otros y viajar.',
    education: 'Estudiante en Oregon State University.',
    lifeSummary: 'Kathy Parks tenia 20 anos y una personalidad magnetica. Era el tipo de persona que hacia amigos donde fuera. Desaparecio despues de ir a tomar cafe en el campus.',
  },
  {
    fullName: 'Brenda Carol Ball',
    personality: 'Brenda era independiente y libre. Vivia la vida en sus propios terminos y no se disculpaba por ser quien era.',
    hobbies: 'Disfrutaba de la vida nocturna y de conocer gente nueva. Era sociable y aventurera.',
    dreams: 'Buscaba encontrar su camino y disfrutar de la vida. Valoraba su libertad por encima de todo.',
    lifeSummary: 'Brenda Ball tenia 22 anos y un espiritu libre. Desaparecio despues de salir de una taberna en Burien, Washington. Era una mujer independiente que merecia vivir su vida.',
  },
  {
    fullName: 'Georgann Hawkins',
    personality: 'Georgann era la chica perfecta de hermandad: inteligente, hermosa, amable y popular. Era querida por todos los que la conocian.',
    hobbies: 'Era activa en su hermandad y le encantaba la vida universitaria. Disfrutaba de eventos sociales y ayudar a otros.',
    dreams: 'Sonaba con graduarse y tener una carrera exitosa. Tenia planes de casarse y formar una familia.',
    talents: 'Era una estudiante sobresaliente y una lider natural en su hermandad.',
    education: 'Estudiante en la Universidad de Washington, miembro de la hermandad Kappa Alpha Theta.',
    lifeSummary: 'Georgann Hawkins tenia 18 anos y era la encarnacion del sueno universitario. Popular, inteligente, hermosa. Desaparecio mientras caminaba por el callejon detras de su hermandad hacia la residencia de su novio.',
    familyQuotes: [
      { quote: 'Georgann era todo lo que una hija deberia ser. Era nuestra luz.', author: 'Familia Hawkins', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Janice Anne Ott',
    personality: 'Janice era vibrante y confiada. Era el tipo de persona que hablaba con desconocidos sin miedo porque veia lo bueno en todos.',
    hobbies: 'Amaba el sol y la playa. Disfrutaba de actividades al aire libre y de relajarse junto al agua.',
    dreams: 'Recien casada, sonaba con construir una vida con su esposo y tal vez algun dia tener hijos.',
    occupation: 'Trabajaba en el King County Department of Parks.',
    lifeSummary: 'Janice Ott tenia 23 anos y estaba recien casada. Desaparecio del Lake Sammamish State Park en plena luz del dia, frente a docenas de testigos. Fue atraida por un hombre con un brazo en cabestrillo que pedia ayuda.',
  },
  {
    fullName: 'Denise Marie Naslund',
    personality: 'Denise era alegre y llena de vida. Tenia una energia positiva que contagiaba a todos a su alrededor.',
    hobbies: 'Le encantaba pasar tiempo al aire libre y disfrutar del verano. Iba al lago con amigos siempre que podia.',
    dreams: 'Sonaba con un futuro feliz junto a su novio y una vida llena de aventuras.',
    lifeSummary: 'Denise Naslund tenia 19 anos y desaparecio del mismo parque que Janice Ott, el mismo dia, solo horas despues. Habia ido al lago con amigos a disfrutar del verano.',
  },
  {
    fullName: 'Nancy Wilcox',
    personality: 'Nancy era una adolescente dulce y alegre. Tenia toda la vida por delante y la energia tipica de los 16 anos.',
    hobbies: 'Disfrutaba de las cosas tipicas de una adolescente: amigos, musica, y pasar tiempo divirtiendose.',
    dreams: 'Como cualquier joven de 16 anos, sonaba con crecer, enamorarse y tener aventuras.',
    lifeSummary: 'Nancy Wilcox tenia solo 16 anos. Desaparecio en Holladay, Utah. Era apenas una nina con toda una vida por delante que le fue arrebatada.',
  },
  {
    fullName: 'Melissa Anne Smith',
    personality: 'Melissa era la hija del jefe de policia de Midvale. Era una buena chica, responsable y querida por su comunidad.',
    hobbies: 'Era una adolescente normal que disfrutaba pasar tiempo con amigos y familia.',
    dreams: 'Sonaba con graduarse, ir a la universidad y hacer orgulloso a su padre.',
    familyBackground: 'Era hija del jefe de policia Louis Smith. Su familia estaba profundamente involucrada en la comunidad.',
    lifeSummary: 'Melissa Smith tenia 17 anos y era hija del jefe de policia local. La ironia de su desaparicion no paso desapercibida. Su padre dedico el resto de su vida a encontrar justicia.',
    familyQuotes: [
      { quote: 'Como policia, pense que podia proteger a mi familia. Falle con Melissa.', author: 'Louis Smith', relation: 'Padre' }
    ]
  },
  {
    fullName: 'Laura Ann Aime',
    personality: 'Laura era una joven independiente que vivia la vida a su manera. Era fuerte y no tenia miedo de ser ella misma.',
    hobbies: 'Le gustaba salir y disfrutar de la vida nocturna. Era sociable y le gustaba conocer gente.',
    dreams: 'Buscaba encontrar su camino y disfrutar de su juventud.',
    lifeSummary: 'Laura Aime tenia 17 anos y un espiritu independiente. Desaparecio en la noche de Halloween de 1974 en Lehi, Utah.',
  },
  {
    fullName: 'Debra Jean Kent',
    personality: 'Debra era una estudiante responsable y una hija devota. Era el tipo de chica que siempre hacia lo correcto.',
    hobbies: 'Le gustaba la escuela y participaba en actividades extracurriculares. Era dedicada a sus estudios.',
    dreams: 'Sonaba con graduarse y tener una carrera exitosa. Era ambiciosa y trabajadora.',
    familyBackground: 'Venia de una familia unida en Bountiful, Utah. Sus padres la adoraban.',
    lifeSummary: 'Debra Kent tenia 17 anos y desaparecio de una obra de teatro escolar. Habia salido a recoger a su hermano. Nunca llego al carro.',
  },
  {
    fullName: 'Caryn Eileen Campbell',
    personality: 'Caryn era una enfermera dedicada con un corazon de oro. Amaba cuidar a otros y tenia una naturaleza compasiva.',
    hobbies: 'Disfrutaba de esquiar y de las vacaciones en las montanas. Amaba la naturaleza y el aire fresco.',
    dreams: 'Estaba comprometida y planeaba casarse. Sonaba con una vida feliz con su prometido y tal vez una familia.',
    occupation: 'Trabajaba como enfermera en Michigan.',
    lifeSummary: 'Caryn Campbell tenia 23 anos y estaba de vacaciones en Aspen con su prometido. Era enfermera, dedicada a cuidar a otros. Desaparecio del hotel Wildwood Inn mientras iba a buscar una revista.',
    familyQuotes: [
      { quote: 'Caryn dedicaba su vida a cuidar a otros. Era un angel.', author: 'Familia Campbell', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Julie Cunningham',
    personality: 'Julie era una joven que habia superado muchos desafios. Era resiliente y estaba trabajando en construir una vida mejor.',
    hobbies: 'Disfrutaba de la vida tranquila de Vail y de las actividades al aire libre que la montana ofrecia.',
    dreams: 'Sonaba con encontrar estabilidad y felicidad. Estaba en un buen momento de su vida.',
    occupation: 'Trabajaba en una tienda de esqui en Vail.',
    lifeSummary: 'Julie Cunningham tenia 26 anos y vivia en Vail, Colorado. Habia encontrado paz en la vida de montana. Desaparecio mientras caminaba a encontrarse con un amigo para cenar.',
  },
  {
    fullName: 'Denise Lynn Oliverson',
    personality: 'Denise era una joven esposa que amaba profundamente a su familia. Era hogareña pero con espiritu aventurero.',
    hobbies: 'Le encantaba andar en bicicleta y disfrutar del aire libre. Era activa y saludable.',
    dreams: 'Recien casada, sonaba con construir un hogar y una familia con su esposo.',
    lifeSummary: 'Denise Oliverson tenia 25 anos y estaba recien casada. Desaparecio mientras andaba en bicicleta a ver a sus padres en Grand Junction, Colorado. Su bicicleta fue encontrada bajo un viaducto.',
  },
  {
    fullName: 'Lynette Dawn Culver',
    personality: 'Lynette era una estudiante de secundaria con toda la vida por delante. Era curiosa y llena de energia juvenil.',
    hobbies: 'Era una adolescente normal que disfrutaba de la escuela y de pasar tiempo con amigos.',
    dreams: 'Sonaba con graduarse, ir a la universidad y descubrir el mundo.',
    education: 'Estudiante de secundaria en Pocatello, Idaho.',
    lifeSummary: 'Lynette Culver tenia 12 anos y era apenas una nina. Desaparecio de su escuela secundaria en Pocatello, Idaho. Su juventud hace su historia particularmente desgarradora.',
  },
  {
    fullName: 'Susan Curtis',
    personality: 'Susan era una adolescente brillante y ambiciosa. Participaba en un programa para estudiantes sobresalientes.',
    hobbies: 'Era una estudiante dedicada que disfrutaba aprender y participar en programas academicos.',
    dreams: 'Sonaba con una educacion universitaria y una carrera exitosa. Tenia todo el potencial para lograrlo.',
    education: 'Estudiante de secundaria participando en una conferencia de jovenes en BYU.',
    lifeSummary: 'Susan Curtis tenia 15 anos y era una de las mejores estudiantes. Estaba participando en una conferencia juvenil en BYU cuando desaparecio.',
  },
  {
    fullName: 'Lisa Levy',
    personality: 'Lisa era vivaz, inteligente y llena de vida. Era popular en su hermandad y querida por todos.',
    hobbies: 'Era activa en la vida universitaria y disfrutaba de eventos sociales. Le encantaba bailar.',
    dreams: 'Sonaba con graduarse y tener una carrera en moda o diseno.',
    education: 'Estudiante en Florida State University, miembro de Chi Omega.',
    lifeSummary: 'Lisa Levy tenia 20 anos y era estudiante en FSU. Fue atacada mientras dormia en su habitacion de la hermandad Chi Omega en la noche del 15 de enero de 1978.',
    familyQuotes: [
      { quote: 'Lisa era pura luz. No habia nadie como ella.', author: 'Familia Levy', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Margaret Elizabeth Bowman',
    personality: 'Margaret era una estudiante modelo: inteligente, responsable y con un futuro brillante. Era querida por todos en su hermandad.',
    hobbies: 'Era dedicada a sus estudios pero tambien disfrutaba de la vida social universitaria.',
    dreams: 'Sonaba con graduarse con honores y tener una carrera exitosa.',
    education: 'Estudiante en Florida State University, miembro de Chi Omega.',
    lifeSummary: 'Margaret Bowman tenia 21 anos y era estudiante de FSU. Fue atacada la misma noche que Lisa Levy en la hermandad Chi Omega.',
  },
  {
    fullName: 'Kimberly Diane Leach',
    personality: 'Kimberly era una nina alegre y llena de energia. Era popular en su escuela y tenia muchos amigos.',
    hobbies: 'Le encantaba bailar y era parte del equipo de porristas. Era una nina activa y feliz.',
    dreams: 'Como cualquier nina de 12 anos, sonaba con crecer, tener aventuras y ser feliz.',
    education: 'Estudiante de septimo grado en Lake City Junior High School.',
    lifeSummary: 'Kimberly Leach tenia solo 12 anos. Era la ultima victima conocida de Bundy. Desaparecio de su escuela en Lake City, Florida. Su juventud e inocencia hacen su historia particularmente tragica. Fue la victima cuyo asesinato llevo a la pena de muerte para Bundy.',
    familyQuotes: [
      { quote: 'Kim era nuestra bebe. Era tan pequena, tan inocente.', author: 'Familia Leach', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Katherine Merry Devine',
    personality: 'Katherine estaba atravesando un momento dificil pero mantenia esperanza. Era una joven buscando su camino.',
    hobbies: 'Le gustaba viajar y estaba en camino a visitar amigos cuando desaparecio.',
    dreams: 'Buscaba un nuevo comienzo y esperanza para el futuro.',
    lifeSummary: 'Katherine Devine tenia 14 anos. Estaba viajando a Oregon cuando desaparecio. Era una joven vulnerable buscando un mejor camino.',
  },
  {
    fullName: 'Rita Lorraine Jolly',
    personality: 'Rita era una joven esposa y madre. Era dedicada a su familia y trabajaba duro.',
    hobbies: 'Su vida giraba alrededor de su familia y su trabajo. Era una persona responsable.',
    dreams: 'Sonaba con criar a su familia y tener una vida estable y feliz.',
    lifeSummary: 'Rita Jolly tenia 17 anos. Era joven pero ya tenia responsabilidades. Desaparecio en Utah.',
  },
  {
    fullName: 'Vicki Lynn Hollar',
    personality: 'Vicki era una joven que intentaba encontrar su camino. Era resiliente a pesar de los desafios.',
    dreams: 'Buscaba estabilidad y un futuro mejor.',
    lifeSummary: 'Vicki Hollar tenia 24 anos. Desaparecio en Utah en 1973. Era una mujer buscando su lugar en el mundo.',
  },
  {
    fullName: 'Sandra Jean Weaver',
    personality: 'Sandra era una joven trabajadora que hacia lo mejor con lo que tenia. Era resiliente.',
    lifeSummary: 'Sandra Weaver tenia 19 anos. Desaparecio en Utah. Era una joven con toda una vida por delante.',
  },
  {
    fullName: 'Carol Valenzuela',
    personality: 'Carol era una adolescente normal con suenos normales. Era alegre y tenia amigos.',
    education: 'Estudiante de secundaria.',
    lifeSummary: 'Carol Valenzuela tenia 20 anos. Desaparecio en Washington. Era una joven con esperanzas y suenos.',
  },
  {
    fullName: 'Shelley Kay Robertson',
    personality: 'Shelley era una joven con toda la vida por delante. Era alegre y tenia suenos.',
    lifeSummary: 'Shelley Robertson tenia 24 anos. Desaparecio en Colorado. Merecia vivir su vida.',
  },
  {
    fullName: 'Melanie Suzanne Cooley',
    personality: 'Melanie era una estudiante de secundaria con suenos de futuro. Era responsable y querida.',
    education: 'Estudiante de secundaria en Nederland, Colorado.',
    lifeSummary: 'Melanie Cooley tenia 18 anos y era estudiante de secundaria. Desaparecio en Colorado cerca de su escuela.',
  },
  {
    fullName: 'Nancy Baird',
    personality: 'Nancy era una joven trabajadora y responsable. Era independiente y fuerte.',
    occupation: 'Trabajaba en una gasolinera.',
    lifeSummary: 'Nancy Baird tenia 21 anos. Desaparecio mientras trabajaba en una gasolinera en Utah.',
  },
  {
    fullName: 'Debbie Smith',
    personality: 'Debbie era una joven enfermera con vocacion de servicio. Amaba ayudar a otros.',
    occupation: 'Estudiante de enfermeria.',
    lifeSummary: 'Debbie Smith tenia 17 anos y estudiaba enfermeria. Desaparecio en Utah. Queria dedicar su vida a ayudar a otros.',
  },
  {
    fullName: 'Victima No Identificada #1',
    personality: 'Aunque su nombre permanece desconocido, era una persona real con una vida, suenos y una familia que la amaba.',
    lifeSummary: 'Esta victima aun no ha sido identificada. Pero detras del misterio hay una persona real que merece ser recordada y, algun dia, nombrada.',
  }
]

async function main() {
  console.log('Actualizando victimas de Ted Bundy...\n')

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
