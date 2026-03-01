import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const victimsData = [
  // ========== JACK EL DESTRIPADOR ==========
  {
    fullName: 'Mary Ann Nichols',
    personality: 'Mary Ann, conocida como Polly, era una mujer que habia conocido tiempos mejores. A pesar de sus circunstancias, mantenia su dignidad y humor.',
    hobbies: 'Le gustaba cantar y era conocida por su sentido del humor. A pesar de todo, intentaba mantener el animo.',
    dreams: 'Sonaba con reunirse con su familia y recuperar la estabilidad que habia perdido. Queria una segunda oportunidad.',
    familyBackground: 'Habia estado casada y tenia cinco hijos. El alcoholismo y las circunstancias la separaron de su familia.',
    lifeSummary: 'Polly Nichols tenia 43 anos. Habia sido esposa y madre de cinco hijos. Las circunstancias de la vida la llevaron a las calles de Whitechapel. Pero antes de eso, fue una mujer con una familia que la amaba.',
  },
  {
    fullName: 'Annie Chapman',
    personality: 'Annie era conocida como "Dark Annie" por su cabello oscuro. Era inteligente y habia tenido una vida respetable antes de caer en desgracia.',
    hobbies: 'Era habil con las manos y hacia flores de crochet y costura para sobrevivir cuando podia.',
    dreams: 'Sonaba con recuperar su salud y encontrar estabilidad. Estaba enferma de tuberculosis pero seguia luchando.',
    familyBackground: 'Habia estado casada con un cochero y tenia tres hijos. Su matrimonio termino y su vida se desmorono.',
    lifeSummary: 'Annie Chapman tenia 47 anos. Habia sido esposa y madre. Estaba gravemente enferma de tuberculosis cuando fue asesinada. A pesar de todo, seguia luchando por sobrevivir.',
  },
  {
    fullName: 'Elizabeth Stride',
    personality: 'Elizabeth, conocida como Long Liz, era una mujer sueca que habia emigrado buscando una vida mejor. Era trabajadora y resiliente.',
    hobbies: 'Era buena costurera y trabajaba cuando podia. Hablaba sueco y era conocida en su comunidad.',
    dreams: 'Habia sonado con una vida mejor en Inglaterra. Aunque las circunstancias no fueron amables, nunca perdio completamente la esperanza.',
    familyBackground: 'Era inmigrante de Suecia. Habia estado casada y habia trabajado como sirvienta.',
    lifeSummary: 'Elizabeth Stride tenia 44 anos y habia nacido en Suecia. Emigro a Inglaterra buscando oportunidades. Era trabajadora y resiliente. Su vida termino la misma noche que Catherine Eddowes.',
  },
  {
    fullName: 'Catherine Eddowes',
    personality: 'Catherine, conocida como Kate, era vivaz y tenia un espiritu fuerte. Era inteligente y educada para los estandares de la epoca.',
    hobbies: 'Sabia leer y escribir, lo cual era raro para mujeres de su clase. Era curiosa e inteligente.',
    dreams: 'Sonaba con mejorar sus circunstancias. Habia viajado recientemente y tenia planes de ganar dinero.',
    familyBackground: 'Tenia una pareja estable, John Kelly, quien la amaba. Tambien tenia hijos de una relacion anterior.',
    lifeSummary: 'Catherine Eddowes tenia 46 anos. Era educada, inteligente y tenia una pareja que la amaba. Fue asesinada la misma noche que Elizabeth Stride en lo que se conoce como la "doble noche".',
    familyQuotes: [
      { quote: 'Era una buena mujer. No merecia lo que le paso.', author: 'John Kelly', relation: 'Pareja' }
    ]
  },
  {
    fullName: 'Mary Jane Kelly',
    personality: 'Mary Jane era la mas joven y hermosa de las victimas canonicas. Era vivaz, le gustaba cantar y tenia suenos de una vida mejor.',
    hobbies: 'Amaba cantar canciones irlandesas. Era conocida en Whitechapel por su voz y su belleza.',
    dreams: 'Sonaba con volver a Irlanda y escapar de la vida en Whitechapel. Queria un nuevo comienzo.',
    familyBackground: 'Venia de Irlanda y habia tenido una vida diferente antes de llegar a Londres. Habia estado casada.',
    lifeSummary: 'Mary Jane Kelly tenia solo 25 anos, la mas joven de las cinco. Era irlandesa, hermosa, y tenia una voz que encantaba a quienes la escuchaban. Sonaba con volver a casa. Fue la ultima victima canonica y su asesinato fue el mas brutal.',
  },

  // ========== ZODIAC ==========
  {
    fullName: 'David Arthur Faraday',
    personality: 'David era un estudiante modelo: inteligente, responsable y con un futuro brillante. Era atleta y academicamente sobresaliente.',
    hobbies: 'Era luchador de su escuela y un estudiante dedicado. Le gustaba pasar tiempo con amigos y habia empezado a salir con Betty Lou.',
    dreams: 'Sonaba con ir a la universidad y tener una carrera exitosa. Tenia todas las herramientas para lograrlo.',
    talents: 'Era un atleta talentoso y un estudiante sobresaliente.',
    education: 'Estudiante de secundaria en Vallejo, California.',
    lifeSummary: 'David Faraday tenia 17 anos y era el estudiante perfecto. Atleta, inteligente, con futuro. Estaba en su primera cita con Betty Lou Jensen cuando fueron atacados en Lake Herman Road.',
    familyQuotes: [
      { quote: 'David era un hijo maravilloso. Tenia todo por delante.', author: 'Familia Faraday', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Betty Lou Jensen',
    personality: 'Betty Lou era una joven dulce y popular. Era querida por todos y tenia una sonrisa que iluminaba cualquier habitacion.',
    hobbies: 'Era activa en su escuela y tenia muchos amigos. Era el tipo de chica que hacia sentir bienvenidos a todos.',
    dreams: 'Como cualquier joven de 16 anos, sonaba con el amor, la universidad y un futuro brillante.',
    education: 'Estudiante de secundaria en Vallejo.',
    lifeSummary: 'Betty Lou Jensen tenia solo 16 anos. Era su primera cita con David. Estaban enamorados de esa manera inocente de la adolescencia. Su vida termino esa noche en Lake Herman Road.',
  },
  {
    fullName: 'Darlene Elizabeth Ferrin',
    personality: 'Darlene era una mujer vibrante y llena de vida. Era conocida por su personalidad extrovertida y su amor por la diversion.',
    hobbies: 'Amaba la musica y frecuentaba lugares donde podia bailar y divertirse. Era sociable y tenia muchos amigos.',
    dreams: 'Era madre de una nina pequena y sonaba con darle una buena vida. Trabajaba duro para su familia.',
    familyBackground: 'Estaba casada y tenia una hija pequena llamada Deena. Adoraba a su hija.',
    occupation: 'Trabajaba como mesera en varios restaurantes de Vallejo.',
    lifeSummary: 'Darlene Ferrin tenia 22 anos y era madre de una nina. Era vibrante, llena de vida y querida por muchos. Fue atacada junto a Michael Mageau en Blue Rock Springs Park.',
    familyQuotes: [
      { quote: 'Darlene amaba la vida. Amaba reir y bailar. Amaba a su hija.', author: 'Familia Ferrin', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Michael Renault Mageau',
    personality: 'Michael era un joven trabajador que estaba comenzando su vida adulta. Sobrevivio el ataque y lleva las cicatrices fisicas y emocionales.',
    hobbies: 'Era un joven normal que disfrutaba salir con amigos.',
    dreams: 'Como cualquier joven de 19 anos, tenia suenos de futuro que fueron interrumpidos por la tragedia.',
    lifeSummary: 'Michael Mageau tenia 19 anos cuando fue atacado junto a Darlene Ferrin. Sobrevivio a pesar de recibir multiples disparos. Vivio el resto de su vida con el trauma de esa noche.',
  },
  {
    fullName: 'Cecelia Ann Shepard',
    personality: 'Cecelia era una joven devota con una fe profunda. Era estudiante universitaria y estaba comprometida. Era dulce, inteligente y amada.',
    hobbies: 'Era dedicada a sus estudios y a su fe. Disfrutaba de actividades al aire libre como picnics.',
    dreams: 'Estaba comprometida y sonaba con casarse y tener una familia. Estudiaba para tener una carrera.',
    education: 'Estudiante en Pacific Union College.',
    lifeSummary: 'Cecelia Shepard tenia 22 anos y estaba comprometida. Era estudiante universitaria con una fe profunda. Fue atacada junto a su novio Bryan Hartnell en Lake Berryessa mientras hacian un picnic.',
    familyQuotes: [
      { quote: 'Cecelia era pura bondad. Su fe era inquebrantable.', author: 'Familia Shepard', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Bryan Calvin Hartnell',
    personality: 'Bryan era un joven de fe estudiando para el ministerio. Era devoto, amable y estaba enamorado de Cecelia.',
    hobbies: 'Era dedicado a sus estudios religiosos. Disfrutaba de actividades al aire libre.',
    dreams: 'Sonaba con convertirse en ministro y casarse con Cecelia.',
    education: 'Estudiante en Pacific Union College, estudiando para el ministerio.',
    lifeSummary: 'Bryan Hartnell tenia 20 anos y estudiaba para ser ministro. Sobrevivio el ataque en Lake Berryessa pero perdio a Cecelia, el amor de su vida. Lleva esas cicatrices para siempre.',
  },
  {
    fullName: 'Paul Lee Stine',
    personality: 'Paul era un estudiante de posgrado trabajando como taxista para pagar sus estudios. Era inteligente, trabajador y tenia grandes planes.',
    hobbies: 'Era un academico dedicado a sus estudios de ingles. Amaba la literatura.',
    dreams: 'Sonaba con obtener su doctorado y convertirse en profesor universitario.',
    education: 'Estudiante de posgrado en San Francisco State, estudiando para un doctorado en ingles.',
    occupation: 'Trabajaba como taxista de Yellow Cab para pagar sus estudios.',
    lifeSummary: 'Paul Stine tenia 29 anos y era estudiante de doctorado trabajando como taxista. Era la persona que trabajaba duro para lograr sus suenos. Fue asesinado mientras hacia su trabajo en Presidio Heights, San Francisco.',
    familyQuotes: [
      { quote: 'Paul trabajaba tan duro. Solo queria terminar su educacion.', author: 'Familia Stine', relation: 'Familia' }
    ]
  },

  // ========== DELPHI ==========
  {
    fullName: 'Abigail Joyce Williams',
    personality: 'Abby era una joven alegre y creativa. Tenia una imaginacion vivida y un corazon bondadoso. Era la mejor amiga de Libby.',
    hobbies: 'Le encantaba el arte y era muy creativa. Disfrutaba pasar tiempo con Libby y explorar.',
    dreams: 'Sonaba con ser artista o diseñadora. Tenia un talento natural para la creatividad.',
    talents: 'Era artistica y creativa. Tenia un ojo para el arte.',
    education: 'Estudiante de secundaria en Delphi, Indiana.',
    lifeSummary: 'Abby Williams tenia 13 anos y era inseparable de su mejor amiga Libby. Era creativa, carinosa y llena de vida. Las dos amigas fueron a caminar por el sendero Monon High Bridge ese dia de febrero.',
    familyQuotes: [
      { quote: 'Abby y Libby eran como hermanas. Hacian todo juntas.', author: 'Familia Williams', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Liberty Rose German',
    personality: 'Libby era valiente, inteligente y protectora. Era el tipo de chica que defendia a sus amigos. Su valentia quedo demostrada al grabar a su atacante.',
    hobbies: 'Le encantaba la naturaleza y explorar senderos. Tambien le gustaba la tecnologia y las redes sociales.',
    dreams: 'Sonaba con una vida llena de aventuras. Era curiosa y valiente.',
    talents: 'Tenia presencia de animo increible. En sus ultimos momentos, tuvo la valentia de grabar evidencia.',
    education: 'Estudiante de secundaria en Delphi, Indiana.',
    lifeSummary: 'Libby German tenia 14 anos y era una joven valiente y astuta. En sus ultimos momentos, tuvo la increible presencia de animo de grabar a su atacante. Ese video y audio se convirtieron en evidencia clave. Su valentia puede haber salvado a otras vidas.',
    familyQuotes: [
      { quote: 'Libby era una guerrera. Incluso al final, lucho por la justicia.', author: 'Familia German', relation: 'Familia' }
    ]
  },

  // ========== CASOS ESPAÑOLES ==========
  {
    fullName: 'Asunta Yong Fang Basterra Porto',
    personality: 'Asunta era una nina brillante y talentosa. Era sobresaliente en todo lo que hacia: musica, estudios, idiomas. Era dulce pero tambien fuerte.',
    hobbies: 'Tocaba el violin con maestria, hablaba varios idiomas y era una estudiante excepcional. Tambien practicaba deportes.',
    dreams: 'Sonaba con ser musica profesional o dedicarse a algo donde pudiera usar sus talentos.',
    talents: 'Era una violinista talentosa, hablaba chino, ingles y espanol. Era sobresaliente academicamente.',
    familyBackground: 'Fue adoptada de China cuando era bebe por Alfonso Basterra y Rosario Porto. Crecia en una familia aparentemente perfecta.',
    education: 'Estudiante sobresaliente en Santiago de Compostela.',
    lifeSummary: 'Asunta tenia 12 anos y era una nina prodigio. Tocaba el violin, hablaba tres idiomas, era la mejor de su clase. Era una luz brillante. La tragedia es que quienes deberian haberla protegido fueron quienes le arrebataron la vida.',
  },
  {
    fullName: 'Gabriel Cruz Ramírez',
    personality: 'Gabriel era un nino alegre, carinoso y lleno de energia. Su sonrisa y su gesto del "pez" con las manos se convirtieron en simbolo de esperanza.',
    hobbies: 'Le encantaba jugar y pasar tiempo con su familia. Era un nino normal con una alegria contagiosa.',
    dreams: 'Como cualquier nino de 8 anos, sonaba con jugar, crecer y ser feliz.',
    familyBackground: 'Era hijo de Patricia Ramirez y Angel Cruz. Sus padres lo adoraban.',
    lifeSummary: 'Gabriel Cruz tenia 8 anos y una sonrisa que enamoro a toda España. El gesto del "pez" que hacia con sus manos se convirtio en simbolo de esperanza durante su busqueda. Era un nino feliz que merecia una vida larga.',
    familyQuotes: [
      { quote: 'Gabriel era pura luz. Su sonrisa podia iluminar el mundo.', author: 'Patricia Ramirez', relation: 'Madre' }
    ]
  },
  {
    fullName: 'Anabel Segura García',
    personality: 'Anabel era una joven alegre, deportista y llena de vida. Era popular y querida en su comunidad.',
    hobbies: 'Le encantaba el paddle y era muy deportista. Disfrutaba de actividades al aire libre.',
    dreams: 'Sonaba con estudiar y tener una carrera exitosa. Tenia toda la vida por delante.',
    familyBackground: 'Vivia con su familia en La Moraleja, una de las urbanizaciones mas exclusivas de Madrid.',
    education: 'Estudiante universitaria.',
    lifeSummary: 'Anabel Segura tenia 22 anos cuando fue secuestrada de su casa en La Moraleja. Era deportista, alegre y querida. Su secuestro duro 66 dias de angustia para su familia.',
    familyQuotes: [
      { quote: 'Anabel era nuestra princesa. Era alegria pura.', author: 'Familia Segura', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Marta del Castillo Casanueva',
    personality: 'Marta era una adolescente normal con suenos normales. Era carinosa, alegre y muy cercana a su familia.',
    hobbies: 'Le gustaba salir con amigos y usar las redes sociales. Era una joven de su tiempo.',
    dreams: 'Sonaba con el futuro, con el amor, con crecer. Tenia toda la vida por delante.',
    familyBackground: 'Vivia con sus padres Antonio y Eva en Sevilla. Tenia una hermana.',
    education: 'Estudiante de secundaria.',
    lifeSummary: 'Marta del Castillo tenia 17 anos cuando desaparecio. Era una adolescente sevillana normal con suenos normales. Su cuerpo nunca fue encontrado, negando a su familia el derecho a despedirse.',
    familyQuotes: [
      { quote: 'Solo queremos encontrar a Marta. Solo queremos poder enterrarla dignamente.', author: 'Antonio del Castillo', relation: 'Padre' }
    ]
  },
  {
    fullName: 'Yéremi Vargas',
    personality: 'Yeremi era un nino alegre y lleno de energia. Tenia una sonrisa que enamoraba a todos.',
    hobbies: 'Le encantaba jugar como cualquier nino de 7 anos. Era activo y feliz.',
    dreams: 'Sonaba con crecer, jugar, ser feliz. Los suenos de cualquier nino.',
    lifeSummary: 'Yeremi Vargas tenia solo 7 anos cuando desaparecio en Vecindario, Gran Canaria. Era un nino feliz jugando cerca de su casa. Nunca fue encontrado.',
    familyQuotes: [
      { quote: 'Mi nino solo estaba jugando. Solo quiero saber donde esta.', author: 'Ithaisa Suarez', relation: 'Madre' }
    ]
  },

  // ========== OTROS CASOS ==========
  {
    fullName: 'Amy Renee Mihaljevic',
    personality: 'Amy era una nina brillante y confiada. Era el orgullo de sus padres y una estudiante sobresaliente.',
    hobbies: 'Le gustaba montar a caballo y era una nina activa. Era buena estudiante.',
    dreams: 'Como cualquier nina de 10 anos, sonaba con crecer y vivir aventuras.',
    education: 'Estudiante de primaria en Bay Village, Ohio.',
    lifeSummary: 'Amy Mihaljevic tenia 10 anos cuando fue secuestrada de un centro comercial en Bay Village, Ohio. Era inteligente y confiada. Su caso sigue sin resolverse.',
    familyQuotes: [
      { quote: 'Amy era nuestra estrella. Era brillante en todo lo que hacia.', author: 'Familia Mihaljevic', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Chandra Ann Levy',
    personality: 'Chandra era ambiciosa e inteligente. Estaba construyendo una carrera en politica y tenia grandes suenos.',
    hobbies: 'Le gustaba correr y hacer ejercicio. Era activa y saludable.',
    dreams: 'Sonaba con una carrera en el gobierno. Era pasante y estaba construyendo su futuro.',
    education: 'Graduada universitaria, pasante en la Oficina Federal de Prisiones.',
    occupation: 'Pasante del gobierno federal en Washington D.C.',
    lifeSummary: 'Chandra Levy tenia 24 anos y era una joven ambiciosa trabajando en Washington D.C. Sonaba con una carrera en politica. Desaparecio mientras corria en Rock Creek Park.',
  },
  {
    fullName: 'Meredith Susanna Cara Kercher',
    personality: 'Meredith era una joven brillante, amable y llena de vida. Era querida por todos los que la conocian.',
    hobbies: 'Amaba viajar y aprender idiomas. Estudiar en Italia era un sueno hecho realidad.',
    dreams: 'Sonaba con ser periodista y viajar por el mundo. Italia era solo el comienzo.',
    talents: 'Era buena con los idiomas y tenia talento para escribir.',
    education: 'Estudiante de la Universidad de Leeds, estudiando en el extranjero en Perugia, Italia.',
    lifeSummary: 'Meredith Kercher tenia 21 anos y estaba viviendo su sueno de estudiar en Italia. Era inteligente, carinosa y aventurera. Fue asesinada en su apartamento en Perugia.',
    familyQuotes: [
      { quote: 'Mez era pura bondad. Solo queria ver el mundo y ayudar a otros.', author: 'Familia Kercher', relation: 'Familia' }
    ]
  },
  {
    fullName: 'Laci Denise Peterson',
    personality: 'Laci era el tipo de persona que iluminaba cada habitacion. Era carinosa, divertida y una esposa devota.',
    hobbies: 'Amaba cocinar y decorar su casa. Estaba emocionada preparando todo para su bebe.',
    dreams: 'Sonaba con ser madre y criar a su hijo Connor. Estaba a semanas de dar a luz.',
    familyBackground: 'Estaba casada con Scott Peterson y esperaba a su primer hijo, a quien iban a llamar Connor.',
    occupation: 'Habia sido maestra de jardin de infantes.',
    lifeSummary: 'Laci Peterson tenia 27 anos y estaba embarazada de 8 meses. Estaba a semanas de convertirse en madre. Era amada por todos. Desaparecio en Nochebuena de 2002.',
    familyQuotes: [
      { quote: 'Laci era la luz de nuestras vidas. Estaba tan emocionada por Connor.', author: 'Sharon Rocha', relation: 'Madre' }
    ]
  },
  {
    fullName: 'Caylee Marie Anthony',
    personality: 'Caylee era una nina pequeña llena de alegria. Tenia una sonrisa que enamoraba a todos.',
    hobbies: 'Le encantaba jugar, cantar y bailar. Era una nina feliz.',
    dreams: 'Con solo 2 anos, sus suenos eran los de cualquier nina: jugar, reir, ser amada.',
    familyBackground: 'Vivia con su madre Casey y sus abuelos George y Cindy Anthony.',
    lifeSummary: 'Caylee Anthony tenia solo 2 años. Era una nina pequena con una sonrisa enorme. Merecia crecer, ir a la escuela, tener amigos, vivir. Su muerte conmociono a Estados Unidos.',
    familyQuotes: [
      { quote: 'Caylee era nuestra vida. Era todo para nosotros.', author: 'Cindy Anthony', relation: 'Abuela' }
    ]
  },
  {
    fullName: 'Natalee Ann Holloway',
    personality: 'Natalee era una estudiante sobresaliente, popular y con un futuro brillante. Era la chica que lo tenia todo.',
    hobbies: 'Era cheerleader, buena estudiante y muy sociable. Le gustaba bailar y divertirse.',
    dreams: 'Tenia beca completa para estudiar medicina pre-med. Iba a ser doctora.',
    talents: 'Era academicamente brillante y habia sido aceptada en la universidad con beca completa.',
    education: 'Recien graduada de secundaria, aceptada en la Universidad de Alabama con beca.',
    lifeSummary: 'Natalee Holloway tenia 18 anos y acababa de graduarse. Tenia beca completa para estudiar medicina. Desaparecio en su viaje de graduacion a Aruba. Era una estrella con todo el futuro por delante.',
    familyQuotes: [
      { quote: 'Natalee era perfecta. Tenia todo: belleza, inteligencia, bondad. Y nos la quitaron.', author: 'Beth Holloway', relation: 'Madre' }
    ]
  },
  {
    fullName: 'Maura Murray',
    personality: 'Maura era una joven compleja, inteligente y atletica. Estaba atravesando un momento dificil pero seguia luchando.',
    hobbies: 'Era corredora de larga distancia y le gustaba el senderismo. Era atletica y activa.',
    dreams: 'Estudiaba enfermeria y sonaba con ayudar a otros.',
    talents: 'Era una atleta talentosa, especialmente en carreras de larga distancia.',
    education: 'Estudiante de enfermeria en UMass Amherst.',
    lifeSummary: 'Maura Murray tenia 21 anos cuando desaparecio en New Hampshire. Era estudiante de enfermeria y atleta. Su caso se ha convertido en uno de los misterios mas discutidos en internet.',
  },
  {
    fullName: 'Tammy Lynn Leppert',
    personality: 'Tammy era una belleza con talento. Era modelo y actriz con un futuro prometedor en Hollywood.',
    hobbies: 'Amaba actuar y modelar. Habia aparecido en peliculas y competencias de belleza.',
    dreams: 'Sonaba con ser una estrella de cine. Ya habia aparecido en peliculas como Scarface.',
    talents: 'Era una modelo y actriz talentosa. Habia ganado competencias de belleza.',
    occupation: 'Modelo y actriz. Habia aparecido en la pelicula Scarface.',
    lifeSummary: 'Tammy Leppert tenia 18 anos y era una estrella en ascenso. Habia sido reina de belleza y actuado en peliculas de Hollywood. Desaparecio despues de un comportamiento erratico que sugirio que habia visto algo que no debia.',
  },
  {
    fullName: 'Emanuela Orlandi',
    personality: 'Emanuela era una adolescente dulce y responsable. Era estudiante de musica y ciudadana del Vaticano.',
    hobbies: 'Estudiaba flauta en una prestigiosa escuela de musica. Amaba la musica.',
    dreams: 'Sonaba con ser musica profesional. Tenia talento y dedicacion.',
    talents: 'Era una flautista talentosa estudiando en una escuela de musica.',
    familyBackground: 'Su familia trabajaba en el Vaticano. Era ciudadana vaticana.',
    education: 'Estudiante en la escuela de musica Tommaso Ludovico da Victoria.',
    lifeSummary: 'Emanuela Orlandi tenia 15 anos y era ciudadana del Vaticano. Desaparecio en Roma en 1983. Su caso esta envuelto en misterio y teorias que involucran al Vaticano, la mafia y espias.',
  },
  {
    fullName: 'Aurelia "Oriel" Briant',
    personality: 'Oriel era una adolescente de una familia aristocratica argentina. Era dulce y vivia una vida privilegiada.',
    hobbies: 'Disfrutaba de actividades tipicas de una joven de su clase social.',
    dreams: 'Tenia todo el futuro por delante, con todas las oportunidades que su familia podia ofrecer.',
    familyBackground: 'Pertenecia a una de las familias mas tradicionales de la aristocracia argentina.',
    lifeSummary: 'Oriel Briant tenia 15 anos y pertenecia a la aristocracia argentina. Su caso conmociono a la sociedad de Buenos Aires en 1984.',
  },
  {
    fullName: 'Solange Grabenheimer',
    personality: 'Solange era una joven de clase media argentina, estudiosa y con planes de futuro.',
    hobbies: 'Era una estudiante dedicada con intereses tipicos de una joven de su edad.',
    dreams: 'Sonaba con terminar sus estudios y construir una carrera.',
    education: 'Estudiante universitaria.',
    lifeSummary: 'Solange Grabenheimer tenia 21 anos y era estudiante universitaria en Buenos Aires. Su caso revelo aspectos oscuros de la sociedad argentina.',
  }
]

async function main() {
  console.log('Actualizando victimas restantes...\n')

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
