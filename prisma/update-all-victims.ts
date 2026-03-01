import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * ACTUALIZACION DE TODAS LAS VICTIMAS - CASOS REALES
 *
 * Ejecutar con: npx tsx prisma/update-all-victims.ts
 *
 * Fuentes utilizadas:
 * - Infobae (casos internacionales)
 * - Oxygen True Crime
 * - BBC, The Guardian
 * - Medios locales verificados
 * - Documentos judiciales publicos
 */

async function updateAllVictims() {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  ACTUALIZANDO TODAS LAS VICTIMAS - CASOS REALES')
  console.log('═══════════════════════════════════════════════════════════════\n')

  let totalUpdated = 0

  // ============================================================================
  // MADELEINE McCANN
  // ============================================================================
  console.log('📁 Caso: Madeleine McCann')

  const madeleine = await prisma.victim.updateMany({
    where: { fullName: { contains: 'Madeleine' } },
    data: {
      fullName: 'Madeleine Beth McCann',
      birthDate: new Date('2003-05-12'),
      birthPlace: 'Leicester, Reino Unido',
      nationality: 'Britanica',
      ageAtDeathOrMissing: 3,

      parents: 'Kate McCann (medica general) y Gerry McCann (cardiologo)',
      parentsOccupation: 'Ambos medicos. Kate trabajo en anestesia, obstetricia y ginecologia. Gerry es profesor de investigacion en la Universidad de Leicester.',
      siblings: 'Sean y Amelie McCann (gemelos, nacidos el 1 de febrero de 2005)',
      familyBackground: 'Familia de clase media-alta britanica. Los padres son medicos. Viven en Rothley, Leicestershire. Kate ha revelado que sigue comprando regalos de cumpleanos y Navidad para Madeleine, guardados en su habitacion que permanece intacta.',

      personality: 'Segun sus padres: "Madeleine es una nina muy feliz con una personalidad extrovertida. Siempre ha sido muy popular, atrayendo tanto a ninos como adultos con su charla divertida y cautivadora." Gerry la describio como "absolutamente increible, increiblemente brillante, divertida, muy energica e increiblemente carinosa." Kate anadio: "Madeleine era mi pequena companera."',
      physicalDescription: 'Rubia, ojos verdes. Tenia una marca distintiva en el iris derecho (coloboma).',

      hobbies: 'Jugar con sus hermanos gemelos, actividades tipicas de una nina de su edad.',
      socialLife: 'Muy popular entre ninos y adultos. Tenia muchos amigos que la extranaban.',

      lastSeenDate: new Date('2007-05-03'),
      lastSeenPlace: 'Apartamento 5A, Ocean Club Resort, Praia da Luz, Portugal',
      lastSeenDetails: 'La familia estaba de vacaciones en Portugal. Madeleine fue vista por ultima vez durmiendo en su cama alrededor de las 21:00, mientras sus padres cenaban en un restaurante del resort a unos 50 metros. Los padres revisaban a los ninos cada 30 minutos. A las 22:00, Kate descubrio que Madeleine habia desaparecido.',
      lastSeenWearing: 'Pijama rosa de Eeyore.',
      lastKnownActivities: 'Ese dia habia estado en el club infantil del resort y pidio a sus padres por que no vinieron cuando ella y Sean lloraron la noche anterior.',

      status: 'MISSING',

      legacy: 'El caso genero una de las busquedas mas grandes de la historia. La fundacion "Find Madeleine" sigue activa. Sus hermanos gemelos, ahora de 19 anos, son atletas destacados en cross country y triatlones.',
      memorialInfo: 'Sitio oficial: findmadeleine.com',
      memorialUrl: 'https://www.findmadeleine.com/',

      biography: `Madeleine Beth McCann nacio el 12 de mayo de 2003 en Leicester, Reino Unido. Era la hija mayor de Kate y Gerry McCann, ambos medicos, y hermana mayor de los gemelos Sean y Amelie.

Sus padres la describieron como "una nina muy feliz con una personalidad extrovertida", "increiblemente brillante, divertida y energica". Era muy popular tanto entre ninos como adultos por su charla cautivadora. Kate la llamaba "mi pequena companera".

El 3 de mayo de 2007, durante unas vacaciones familiares en Praia da Luz, Portugal, Madeleine desaparecio de su habitacion mientras dormia. Tenia casi 4 anos. La busqueda que siguio se convirtio en una de las mas grandes de la historia.

A pesar de los anos transcurridos, su familia nunca ha dejado de buscarla. Kate sigue comprando regalos de cumpleanos para ella, guardados en su habitacion que permanece intacta.`,

      lifeSummary: 'Nina britanica de 3 anos, hija de medicos, hermana mayor de gemelos. Descrita como alegre, brillante y carinosa. Desaparecio de su habitacion en Portugal el 3 de mayo de 2007.',

      imageSource: 'FindMadeleine.com - Sitio oficial de la familia McCann'
    }
  })
  console.log(`   ✓ Madeleine McCann - ${madeleine.count} registro(s)`)
  totalUpdated += madeleine.count

  // ============================================================================
  // ELIZABETH SHORT (LA DALIA NEGRA)
  // ============================================================================
  console.log('📁 Caso: La Dalia Negra')

  const elizabeth = await prisma.victim.updateMany({
    where: { fullName: { contains: 'Elizabeth Short' } },
    data: {
      fullName: 'Elizabeth Short',
      aliases: JSON.stringify(['La Dalia Negra', 'Black Dahlia', 'Beth']),
      birthDate: new Date('1924-07-29'),
      birthPlace: 'Hyde Park, Boston, Massachusetts',
      nationality: 'Estadounidense',
      ageAtDeathOrMissing: 22,

      parents: 'Cleo Alvin Short Jr. (marinero, luego constructor de campos de minigolf) y Phoebe May Sawyer (contadora)',
      siblings: 'Tercera de cinco hermanas: Virginia May (1920-1985), Dorothea (1922-2012), Elnora (1925-2022), Muriel (1929-2023)',
      familyBackground: `Su padre abandono a la familia en 1930, dejando su auto en un puente para simular un suicidio. La madre tuvo que criar sola a cinco hijas durante la Gran Depresion, trabajando como contadora. Anos despues, en 1942, el padre reaparecio en California. Elizabeth intento reconectarse con el, pero la relacion fracaso tras una pelea.`,

      education: 'Educacion secundaria en Medford, Massachusetts. Abandono por problemas de salud.',
      educationDetails: 'Sufria de asma severa y bronquitis desde nina. A los 15 anos necesito cirugia pulmonar. Pasaba los inviernos en Miami por su salud.',

      occupation: 'Aspirante a actriz, camarera',
      workplaceInfo: 'Trabajo como camarera y en el post exchange de Camp Cooke. Los ultimos meses vivio en Los Angeles, trabajando como camarera y alquilando una habitacion detras del club nocturno Florentine Gardens en Hollywood Boulevard.',
      careerDreams: 'Sonaba con ser estrella de cine en Hollywood. No se le conocen creditos de actuacion, pero sus aspiraciones la llevaron a California.',

      personality: 'Joven que buscaba una vida mejor en Hollywood. Su historia refleja la de muchas jovenes de su epoca que llegaban a California con suenos de fama.',

      relationship: 'Estuvo comprometida con el Mayor Matthew Michael Gordon Jr., piloto del Army Air Force, quien murio en un accidente aereo en agosto de 1945 antes de poder casarse.',

      lastSeenDate: new Date('1947-01-09'),
      lastSeenPlace: 'Hotel Biltmore, Los Angeles',
      lastSeenDetails: 'Fue vista por ultima vez en el lobby del Hotel Biltmore el 9 de enero de 1947. Paso los siguientes seis dias en paradero desconocido antes de que su cuerpo fuera encontrado.',

      deathDate: new Date('1947-01-15'),
      causeOfDeath: 'Homicidio - cuerpo mutilado',
      status: 'DECEASED',

      legacy: 'Su caso se convirtio en uno de los misterios sin resolver mas famosos de Los Angeles. Ha inspirado numerosas peliculas, libros y series de television.',
      memorialInfo: 'El caso permanece abierto en los archivos del LAPD despues de mas de 75 anos.',

      biography: `Elizabeth Short nacio el 29 de julio de 1924 en Boston, Massachusetts. Era la tercera de cinco hermanas. Su infancia estuvo marcada por la tragedia: su padre abandono a la familia en 1930, simulando un suicidio, dejando a su madre sola para criar a cinco ninas durante la Gran Depresion.

Elizabeth sufria de asma y bronquitis severas desde nina. A los 15 anos necesito cirugia pulmonar, y pasaba los inviernos en Miami por su salud. Era una joven que sonaba con ser actriz de Hollywood.

En 1942, su padre reaparecio en California. Elizabeth intento reconectarse con el, pero la relacion fracaso. Se quedo en California, trabajando como camarera mientras perseguia su sueno de actuar.

Estuvo comprometida con el Mayor Matthew Gordon, un piloto que murio en un accidente antes de poder casarse. Los ultimos meses de su vida los paso en Los Angeles, alquilando una habitacion detras de un club nocturno.

El 15 de enero de 1947, su cuerpo fue encontrado en Leimert Park. Tenia 22 anos. El caso nunca fue resuelto. El apodo "La Dalia Negra" fue creado por los periodicos despues de su muerte.`,

      lifeSummary: 'Joven de 22 anos de Boston que llego a Hollywood con suenos de ser actriz. Tuvo una infancia dificil marcada por el abandono paterno, problemas de salud y la Gran Depresion. Su asesinato en 1947 se convirtio en uno de los misterios mas famosos de Los Angeles.',

      imageSource: 'FBI Vault - Dominio publico'
    }
  })
  console.log(`   ✓ Elizabeth Short - ${elizabeth.count} registro(s)`)
  totalUpdated += elizabeth.count

  // ============================================================================
  // JONBENET RAMSEY
  // ============================================================================
  console.log('📁 Caso: JonBenet Ramsey')

  const jonbenet = await prisma.victim.updateMany({
    where: { fullName: { contains: 'JonBen' } },
    data: {
      fullName: 'JonBenet Patricia Ramsey',
      birthDate: new Date('1990-08-06'),
      birthPlace: 'Atlanta, Georgia',
      nationality: 'Estadounidense',
      ageAtDeathOrMissing: 6,

      parents: 'John Bennett Ramsey (empresario, nacido 1943) y Patricia "Patsy" Ramsey (1956-2006, ex Miss West Virginia 1977)',
      parentsOccupation: 'John era presidente de Access Graphics, una empresa de tecnologia. Patsy fue Miss West Virginia en 1977.',
      siblings: 'Burke Ramsey (hermano, nacido 1987, tenia 9 anos cuando ella murio). Medios hermanos del primer matrimonio de John: Elizabeth (1969-1992, fallecida en accidente de auto), Melinda y John Andrew.',
      familyBackground: 'Familia acomodada de Boulder, Colorado. Su nombre fue creado combinando el nombre de su padre (John Bennett) con el de su madre (Patricia). Su media hermana Elizabeth murio en un accidente de auto 5 anos antes. JonBenet esta enterrada junto a ella en Georgia.',

      education: 'High Peaks Elementary School, Boulder, Colorado - Kindergarten',

      personality: 'Segun su familia: "JonBenet era la nina que mantenia la conversacion en la cena. Preguntaba a todos como les habia ido el dia. Era energica y divertida." Tenia un carisma natural y una personalidad brillante en el escenario.',
      hobbies: 'Concursos de belleza infantil, cantar, bailar',
      talents: 'Destacada concursante de concursos de belleza. Gano multiples titulos incluyendo Americas Royale Miss, Little Miss Charlevoix, Little Miss Colorado, Colorado State All-Star Kids Cover Girl y National Tiny Miss Beauty.',
      accomplishments: 'Ganadora de varios concursos de belleza infantil a nivel estatal y nacional.',

      socialLife: 'Era conocida por su personalidad encantadora y su presencia segura en el escenario.',

      lastSeenDate: new Date('1996-12-25'),
      lastSeenPlace: 'Casa familiar en Boulder, Colorado',
      lastSeenDetails: 'La familia celebro Navidad normalmente. Esa noche asistieron a una cena en casa de amigos. JonBenet fue puesta a dormir. A la manana siguiente, su madre encontro una nota de rescate de 3 paginas pidiendo $118,000.',
      lastKnownActivities: 'Cena de Navidad en casa de amigos de la familia, regreso a casa, acostada a dormir.',

      deathDate: new Date('1996-12-25'),
      causeOfDeath: 'Asfixia y traumatismo craneal',
      status: 'DECEASED',

      legacy: 'Su caso genero un debate nacional sobre los concursos de belleza infantil. En 2008, pruebas de ADN exoneraron a su familia. El caso sigue abierto y en 2022 la policia de Boulder anuncio nuevos analisis de ADN.',
      memorialInfo: 'Enterrada en St. James Episcopal Cemetery, Marietta, Georgia, junto a su media hermana Elizabeth.',

      biography: `JonBenet Patricia Ramsey nacio el 6 de agosto de 1990 en Atlanta, Georgia. Su nombre fue creado combinando el de su padre, John Bennett, con el de su madre, Patricia. Era la menor de los hijos de John y Patsy Ramsey.

Era una nina que iluminaba cualquier habitacion. Segun su familia, "era la que mantenia la conversacion en la cena, preguntando a todos como les habia ido el dia." Con solo 6 anos, ya habia ganado varios titulos en concursos de belleza infantil, incluyendo Little Miss Colorado.

La noche del 25 de diciembre de 1996, despues de celebrar Navidad con su familia, JonBenet fue puesta a dormir. A la manana siguiente, su madre encontro una extrana nota de rescate. Horas despues, su padre encontro su cuerpo en el sotano.

Su madre Patsy fallecio de cancer ovarico en 2006, sin ver resuelto el caso. Su hermano Burke, que tenia 9 anos cuando ella murio, ha elegido vivir alejado de los medios.`,

      lifeSummary: 'Nina de 6 anos de Boulder, Colorado. Pequena estrella de concursos de belleza, conocida por su personalidad brillante y encantadora. Asesinada la noche de Navidad de 1996 en su propia casa.',

      imageSource: 'Boulder Police Department / Archivos de prensa'
    }
  })
  console.log(`   ✓ JonBenet Ramsey - ${jonbenet.count} registro(s)`)
  totalUpdated += jonbenet.count

  // ============================================================================
  // PAULETTE GEBARA FARAH
  // ============================================================================
  console.log('📁 Caso: Paulette Gebara Farah')

  const paulette = await prisma.victim.updateMany({
    where: { fullName: { contains: 'Paulette' } },
    data: {
      fullName: 'Paulette Gebara Farah',
      aliases: JSON.stringify(['Po']),
      birthDate: new Date('2005-07-20'),
      birthPlace: 'Huixquilucan, Estado de Mexico',
      nationality: 'Mexicana',
      ageAtDeathOrMissing: 4,

      parents: 'Mauricio Gebara (empresario inmobiliario) y Lizette Farah (de familia libano-mexicana acomodada)',
      parentsOccupation: 'Mauricio se dedicaba a la compra, remodelacion y venta de inmuebles. Junto a sus hermanos fundo la Asociacion Civil ATM (Ayudame que yo tambien soy mexicano) para construir viviendas populares.',
      siblings: 'Lisette Gebara Farah "Chezz" (hermana mayor, nacida en 2002, tenia 7 anos)',
      familyBackground: 'Familia acomodada de origen libanes. Se casaron en 2001 y vivian en un departamento de dos plantas en un exclusivo fraccionamiento de Huixquilucan. Los padres se divorciaron en 2014.',

      education: 'Kinder Kri-Kri - con asistencia de una especialista diaria',
      educationDetails: 'A pesar de su discapacidad, estaba bien integrada socialmente en su escuela. Una especialista la asistia diariamente.',

      physicalDescription: 'Nacio extremadamente prematura a las 25 semanas de gestacion, pesando solo 800 gramos.',
      personality: 'Descrita como "muy entusiasta" y alguien que "hacia el mayor esfuerzo por hacer sus actividades ella misma". Debido a su dificultad para hablar, solo podia decir "Po" cuando le preguntaban su nombre, por lo que muchos la llamaban asi carinosamente.',

      hobbies: 'Equinoterapia (terapia con caballos para mejorar su motricidad)',
      talents: 'A pesar de que los medicos pronosticaban que dificilmente podria caminar, la equinoterapia le ayudo a mejorar significativamente su capacidad motriz.',

      lastSeenDate: new Date('2010-03-21'),
      lastSeenPlace: 'Su habitacion en Huixquilucan, Estado de Mexico',
      lastSeenDetails: 'Paulette regreso a casa de un viaje a Valle de Bravo. Antes de dormir, sus cuidadoras le colocaron cintas adhesivas en la boca para mantenerla cerrada mientras dormia (una practica habitual ya que dormia con la boca abierta).',
      lastKnownActivities: 'Viaje familiar a Valle de Bravo, regreso a casa, preparacion para dormir.',

      deathDate: new Date('2010-03-21'),
      causeOfDeath: 'Asfixia (version oficial: accidente)',
      status: 'DECEASED',

      legacy: 'El caso genero una crisis en la Procuraduria del Estado de Mexico. El procurador Alberto Bazbaz renuncio poco despues de declarar la muerte como accidental. El caso sigue siendo controversial.',

      biography: `Paulette Gebara Farah nacio el 20 de julio de 2005 en Huixquilucan, Estado de Mexico. Llego al mundo extremadamente prematura, a las 25 semanas de gestacion, pesando apenas 800 gramos.

Como consecuencia de su nacimiento prematuro, sufrio un derrame en el lado izquierdo de su cerebro que le causo deficiencia motriz y trastorno del lenguaje. Sin embargo, no tenia retraso mental. Los medicos pronosticaban que dificilmente podria caminar, pero gracias a la equinoterapia logro grandes avances en su motricidad.

Era una nina "muy entusiasta" que hacia el mayor esfuerzo por hacer las cosas ella misma. Debido a su dificultad para hablar, solo podia decir "Po" cuando le preguntaban su nombre, y asi la llamaban carinosamente. Asistia al kinder Kri-Kri donde estaba bien integrada socialmente.

El 22 de marzo de 2010, sus padres reportaron su desaparicion desde su habitacion. Nueve dias despues, su cuerpo fue encontrado en su propia cama, entre el colchon y la base.`,

      lifeSummary: 'Nina mexicana de 4 anos con discapacidad motriz y del lenguaje debido a su nacimiento prematuro. A pesar de sus dificultades, era entusiasta y luchadora. Desaparecio de su habitacion el 21 de marzo de 2010.',

      imageSource: 'Proceso / El Universal Mexico'
    }
  })
  console.log(`   ✓ Paulette Gebara Farah - ${paulette.count} registro(s)`)
  totalUpdated += paulette.count

  // ============================================================================
  // MARIA MARTA GARCIA BELSUNCE
  // ============================================================================
  console.log('📁 Caso: Maria Marta Garcia Belsunce')

  const mariaMarta = await prisma.victim.updateMany({
    where: { fullName: { contains: 'García Belsunce' } },
    data: {
      fullName: 'Maria Marta Garcia Belsunce',
      birthDate: new Date('1958-10-05'),
      birthPlace: 'Buenos Aires, Argentina',
      nationality: 'Argentina',
      ageAtDeathOrMissing: 44,

      parents: 'Horacio Adolfo Garcia Belsunce (reconocido jurista) y Luz Maria Blanca Luisa Galup',
      siblings: 'Maria Laura y Horacio (hermanos). Medios hermanos: Irene y John Hurtig (del segundo matrimonio de su madre con Constantino "Dino" Hurtig) y Hernan (del segundo matrimonio de su padre con Maria Luisa Lanusse Gras)',
      familyBackground: 'Sus padres se separaron. Ella fue la segunda de los hermanos Garcia Belsunce. A pesar de vivir en un country, llevaba una vida austera.',

      education: 'Sociologa',
      occupation: 'Sociologa, productora periodistica, activista solidaria',
      workplaceInfo: 'Trabajo como productora periodistica en el programa "De Frente" de su hermano Horacio Garcia Belsunce.',
      careerDreams: 'Dedicar su vida a ayudar a otros.',

      personality: 'Mujer muy sencilla en su manera de vestir y vivir. Aunque vivia en un country, tenia una vida austera, sin grandes gastos y con la mayor parte de su tiempo dedicada a los demas.',

      hobbies: 'Trabajo solidario, ayudar a otros',
      accomplishments: 'Cofundadora de Missing Children Argentina (junto a Susan Murray), llegando a ser vicepresidenta de la organizacion. Parte de Red Solidaria de Juan Carr. Miembro de la Asociacion Amigos del Pilar. Investigaba asuntos relacionados al trafico de menores en la provincia de Buenos Aires.',

      relationship: 'Casada durante 30 anos con Carlos Carrascosa. Se caso a los 19 anos. No tuvieron hijos.',

      lastSeenDate: new Date('2002-10-27'),
      lastSeenPlace: 'Casa en el country Carmel, Pilar, Buenos Aires',
      lastSeenDetails: 'Fue encontrada muerta en la banera de su casa. Inicialmente se creyo que fue un accidente domestico.',

      deathDate: new Date('2002-10-27'),
      causeOfDeath: 'Seis disparos en la cabeza',
      status: 'DECEASED',

      legacy: 'Su trabajo en Missing Children Argentina y Red Solidaria sigue siendo recordado. En 2024, Nicolas Pachelo fue finalmente condenado a prision perpetua por su asesinato, 22 anos despues de su muerte.',

      biography: `Maria Marta Garcia Belsunce nacio en Buenos Aires en 1958. Era hija del reconocido jurista Horacio Garcia Belsunce. A los 19 anos se caso con Carlos Carrascosa, un agente de bolsa con quien compartiria 30 anos de vida.

Era sociologa de profesion y trabajo como productora periodistica, pero su verdadera pasion era ayudar a otros. Durante los anos 90 hasta su muerte, se dedico intensamente al trabajo solidario. Fue cofundadora de Missing Children Argentina, donde llego a ser vicepresidenta, investigando casos de trafico de menores. Tambien fue parte de Red Solidaria de Juan Carr y de la Asociacion Amigos del Pilar.

A pesar de vivir en el exclusivo country Carmel de Pilar, era una mujer sencilla y austera. Dedicaba la mayor parte de su tiempo a ayudar a los demas.

El 27 de octubre de 2002, fue encontrada muerta en la banera de su casa. Inicialmente se creyo que fue un accidente. Un mes y medio despues se descubrio que habia sido asesinada con seis disparos en la cabeza. En 2024, Nicolas Pachelo, un vecino del country, fue finalmente condenado por su asesinato.`,

      lifeSummary: 'Sociologa argentina de 44 anos, dedicada al trabajo solidario. Vicepresidenta de Missing Children Argentina, investigaba el trafico de menores. Mujer sencilla y generosa que dedico su vida a ayudar a otros.',

      imageSource: 'La Nacion Argentina / Telam'
    }
  })
  console.log(`   ✓ Maria Marta Garcia Belsunce - ${mariaMarta.count} registro(s)`)
  totalUpdated += mariaMarta.count

  // ============================================================================
  // DIANA QUER LOPEZ
  // ============================================================================
  console.log('📁 Caso: Diana Quer')

  const diana = await prisma.victim.updateMany({
    where: { fullName: { contains: 'Diana Quer' } },
    data: {
      fullName: 'Diana Maria Quer Lopez-Pinel',
      birthDate: new Date('1998-01-24'),
      birthPlace: 'Madrid, Espana',
      nationality: 'Espanola',
      ageAtDeathOrMissing: 18,

      parents: 'Juan Carlos Quer (empresario inmobiliario) y Diana Lopez-Pinel',
      parentsOccupation: 'El padre es empresario del sector inmobiliario (alquiler, compra y venta de viviendas).',
      siblings: 'Valeria Quer (hermana menor, tenia 16 anos cuando Diana desaparecio)',
      familyBackground: 'Familia acomodada de Madrid, residente en Pozuelo de Alarcon. Los padres estaban separados al momento de la desaparicion, lo cual habia causado tension familiar. Diana veraneaba con su madre y hermana en A Pobra do Caraminal, Galicia.',

      personality: 'Segun sus redes sociales: le gustaba bailar, cuidaba mucho su imagen. Habia pasado por algunos momentos dificiles tras la separacion de sus padres.',
      hobbies: 'Bailar, redes sociales, cuidar su imagen',
      socialLife: 'Muy activa en redes sociales donde mostraba detalles de su vida personal. Tenia una relacion muy cercana con su hermana Valeria.',
      bestFriends: 'Su hermana Valeria, con quien era inseparable.',

      lastSeenDate: new Date('2016-08-22'),
      lastSeenPlace: 'A Pobra do Caraminal, La Coruna, Galicia',
      lastSeenDetails: 'Diana desaparecio cuando regresaba a casa tras las fiestas locales de A Pobra do Caraminal. Su telefono movil fue clave para rastrear sus ultimos movimientos.',
      lastKnownActivities: 'Asistir a las fiestas locales del pueblo, caminar de regreso a casa.',

      deathDate: new Date('2016-08-22'),
      causeOfDeath: 'Estrangulamiento',
      status: 'DECEASED',

      legacy: 'Su caso se convirtio en simbolo de la lucha contra la violencia de genero en Espana. Su padre Juan Carlos Quer se convirtio en activista por la prision permanente revisable.',
      memorialInfo: 'Su cuerpo fue encontrado 496 dias despues de su desaparicion, el 31 de diciembre de 2017, en un pozo en una nave abandonada de Rianxo.',

      biography: `Diana Maria Quer Lopez-Pinel nacio el 24 de enero de 1998 en Madrid. Vivia con su familia en Pozuelo de Alarcon y veraneaba en A Pobra do Caraminal, Galicia.

Era una joven a la que le gustaba bailar y cuidaba mucho su imagen. Tenia una relacion muy cercana con su hermana menor Valeria, con quien era inseparable. La separacion de sus padres le habia afectado, pero mantenia el vinculo con ambos.

El 22 de agosto de 2016, durante las fiestas locales de A Pobra do Caraminal, Diana desaparecio cuando regresaba a casa. Tenia 18 anos recien cumplidos.

Durante 496 dias, su familia y toda Espana la buscaron. El 31 de diciembre de 2017, su cuerpo fue encontrado en un pozo en Rianxo. Jose Enrique Abuin, "El Chicle", fue condenado a prision permanente revisable por su secuestro, agresion sexual y asesinato.`,

      lifeSummary: 'Joven madrilena de 18 anos que veraneaba en Galicia. Le gustaba bailar y era muy cercana a su hermana Valeria. Desaparecio durante las fiestas locales de A Pobra do Caraminal el 22 de agosto de 2016.',

      imageSource: 'Familia Quer via El Mundo'
    }
  })
  console.log(`   ✓ Diana Quer Lopez - ${diana.count} registro(s)`)
  totalUpdated += diana.count

  // ============================================================================
  // MARTA DEL CASTILLO
  // ============================================================================
  console.log('📁 Caso: Marta del Castillo')

  const marta = await prisma.victim.updateMany({
    where: { fullName: { contains: 'Marta del Castillo' } },
    data: {
      fullName: 'Marta del Castillo Casanueva',
      birthDate: new Date('1991-03-25'),
      birthPlace: 'Sevilla, Espana',
      nationality: 'Espanola',
      ageAtDeathOrMissing: 17,

      parents: 'Antonio del Castillo y Eva Casanueva',
      siblings: 'Monica y Lorena (hermanas menores gemelas)',
      familyBackground: 'Familia unida de Sevilla. Su abuelo materno, Jose Antonio Casanueva, ha sido uno de los rostros mas visibles en la busqueda de justicia, encabezando concentraciones y apariciones publicas.',

      familyQuotes: JSON.stringify([
        {
          quote: 'La ultima vez que la vi fue el mismo dia de su muerte. Pasaban unos minutos de la una de la tarde cuando Marta vino a mi casa a verme.',
          author: 'Jose Antonio Casanueva',
          relation: 'Abuelo materno'
        }
      ]),

      lastSeenDate: new Date('2009-01-24'),
      lastSeenPlace: 'Piso de Miguel Carcano, Leon XIII, Sevilla',
      lastSeenDetails: 'Marta habia quedado con su exnovio Miguel Carcano para aclarar asuntos pendientes. El la recogio en su moto sobre las 17:30 en el portal de su casa. Nunca regreso.',
      lastKnownActivities: 'Visita al abuelo materno a la una de la tarde, regreso a casa, salida a las 17:30 en la moto de su exnovio.',

      deathDate: new Date('2009-01-24'),
      causeOfDeath: 'Homicidio (cuerpo no recuperado)',
      status: 'DECEASED',

      legacy: 'El caso ha generado un debate nacional sobre la justicia y el derecho de las familias a recuperar los restos de sus seres queridos. Sus padres han luchado incansablemente durante anos para encontrar su cuerpo.',
      memorialInfo: 'El cuerpo de Marta nunca ha sido encontrado a pesar de multiples busquedas en el rio Guadalquivir, vertederos, zonas deshabitadas y fincas. Sus padres llegaron a ofrecer comprar el piso donde murio para darselo a Carcano si revelaba la ubicacion del cuerpo.',

      biography: `Marta del Castillo Casanueva nacio el 25 de marzo de 1991 en Sevilla. Era la mayor de tres hermanas, con Monica y Lorena, gemelas, como hermanas menores.

El 24 de enero de 2009, Marta, de 17 anos, quedo con su exnovio Miguel Carcano para aclarar asuntos pendientes entre ellos. El la recogio en su moto sobre las 17:30 en el portal de su casa. Nunca regreso.

Esa misma noche, su familia comenzo a buscarla. A las 2:10 de la madrugada pusieron la primera denuncia por desaparicion.

Miguel Carcano confeso el crimen pero ha cambiado su version hasta siete veces sobre que hizo con el cuerpo. A pesar de innumerables busquedas, el cuerpo de Marta nunca ha sido encontrado.

Su abuelo Jose Antonio recuerda que la ultima vez que la vio fue ese mismo dia, cuando ella paso a visitarlo a la una de la tarde. Sus hermanas gemelas crecieron sin su hermana mayor.`,

      lifeSummary: 'Joven sevillana de 17 anos, hermana mayor de gemelas, con una familia muy unida. Desaparecio el 24 de enero de 2009. Su cuerpo nunca ha sido encontrado.',

      imageSource: 'Familia Del Castillo via ABC Sevilla'
    }
  })
  console.log(`   ✓ Marta del Castillo - ${marta.count} registro(s)`)
  totalUpdated += marta.count

  // ============================================================================
  // ELISA LAM
  // ============================================================================
  console.log('📁 Caso: Elisa Lam')

  const elisa = await prisma.victim.updateMany({
    where: { fullName: { contains: 'Elisa Lam' } },
    data: {
      fullName: 'Elisa Lam',
      aliases: JSON.stringify(['Lam Ho Yi']),
      birthDate: new Date('1991-04-30'),
      birthPlace: 'Vancouver, Columbia Britanica, Canada',
      nationality: 'Canadiense (origen hongkones)',
      ageAtDeathOrMissing: 21,

      parents: 'David Lam y Yinna Lam (emigrantes de Hong Kong)',
      parentsOccupation: 'Propietarios de Pauls Restaurant en Burnaby, especializado en comida canadiense y china casera.',
      siblings: 'Sarah Lam (hermana)',
      familyBackground: 'Familia de inmigrantes de Hong Kong que se establecio en Vancouver. Sus padres la llamaban por su nombre cantones, Lam Ho Yi.',

      education: 'Universidad de British Columbia (UBC), Vancouver',
      educationDetails: 'Estudiante universitaria, aunque no estaba inscrita al momento de su muerte. En sus blogs revelo que estaba teniendo dificultades academicas, habia abandonado varias clases y se sentia "completamente desorientada y perdida".',

      personality: 'Segun Katie Orphan, gerente de The Last Bookstore que la vio ese dia: "Era extrovertida, muy vivaz, muy amigable" mientras compraba regalos para llevar a su familia.',
      hobbies: 'Blogging, lectura, psicologia, comedia, peliculas, viajar, videojuegos, pasar tiempo con personas cercanas',
      favoriteThings: 'Programas favoritos: Daily Show, Colbert Report, Downton Abbey. Pelicula favorita: Drive de Nicolas Winding Refn. Libro favorito: El Gran Gatsby de F. Scott Fitzgerald. Compartia con su hermana Sarah el interes por la moda.',

      socialLife: 'Mantenia dos blogs: "Ether Fields" en BlogSpot y "Nouvelle-Nouveau" en Tumblr donde publicaba fotos de moda y escribia sobre sus luchas con la salud mental.',

      lastSeenDate: new Date('2013-01-31'),
      lastSeenPlace: 'Hotel Cecil, Los Angeles',
      lastSeenDetails: 'El video de vigilancia del ascensor del hotel la mostro comportandose de manera extrana, lo que genero miles de teorias. Fue vista por ultima vez en The Last Bookstore comprando regalos para su familia.',
      lastKnownActivities: 'Visita a The Last Bookstore, regreso al Hotel Cecil.',

      deathDate: new Date('2013-02-01'),
      causeOfDeath: 'Ahogamiento accidental',
      status: 'DECEASED',

      legacy: 'Su caso inspiro el documental de Netflix "Crime Scene: The Vanishing at the Cecil Hotel". El video del ascensor se volvio viral y genero innumerables teorias. La autopsia determino que su trastorno bipolar fue un factor contribuyente en su muerte accidental.',

      biography: `Elisa Lam nacio el 30 de abril de 1991 en Vancouver, Canada. Sus padres, David y Yinna Lam, eran inmigrantes de Hong Kong que tenian un restaurante en Burnaby. La llamaban por su nombre cantones, Lam Ho Yi.

Era estudiante de la Universidad de British Columbia y una bloguera activa. Tenia muchos intereses: leia, amaba la psicologia, la comedia, las peliculas y los videojuegos. Su libro favorito era El Gran Gatsby. Compartia el amor por la moda con su hermana Sarah.

Elisa luchaba con el trastorno bipolar y la depresion. En sus blogs escribia abiertamente sobre sus dificultades con la salud mental y lo perdida que se sentia academicamente.

En enero de 2013, emprendio un viaje sola por California. El 31 de enero fue vista por ultima vez en The Last Bookstore de Los Angeles, comprando regalos para su familia. La gerente la recordo como "extrovertida, vivaz y amigable".

Su cuerpo fue encontrado el 19 de febrero de 2013 en un tanque de agua del Hotel Cecil. La autopsia determino que fue un ahogamiento accidental.`,

      lifeSummary: 'Estudiante canadiense de 21 anos, hija de inmigrantes hongkoneses. Bloguera activa, amante de la lectura y la moda. Luchaba abiertamente con el trastorno bipolar. Murio durante un viaje sola por California en 2013.',

      imageSource: 'Familia Lam via The Globe and Mail'
    }
  })
  console.log(`   ✓ Elisa Lam - ${elisa.count} registro(s)`)
  totalUpdated += elisa.count

  // ============================================================================
  // VICTIMAS DEL ZODIAC KILLER
  // ============================================================================
  console.log('📁 Caso: Zodiac Killer')

  const david = await prisma.victim.updateMany({
    where: { fullName: { contains: 'David Faraday' } },
    data: {
      fullName: 'David Arthur Faraday',
      birthDate: new Date('1951-10-25'),
      birthPlace: 'San Rafael, California',
      nationality: 'Estadounidense',
      ageAtDeathOrMissing: 17,

      parents: 'Padre empleado de Pacific Gas and Electric',

      education: 'Vallejo High School',
      educationDetails: 'Estudiante de secundaria, miembro del equipo de lucha libre de la escuela.',

      personality: 'Descrito como "tranquilo, estudioso, con poco tiempo para citas".',
      hobbies: 'Lucha libre, scouting',
      accomplishments: 'Eagle Scout (el rango mas alto de los Boy Scouts). Recipiente del "Gods Country Award", uno de los honores mas importantes de los Scouts por reverencia religiosa.',
      talents: 'Lucha libre escolar.',

      relationship: 'Betty Lou Jensen era su primera cita. Se habian conocido hacia solo dos semanas.',

      lastSeenDate: new Date('1968-12-20'),
      lastSeenPlace: 'Lake Herman Road, Vallejo, California',
      lastSeenDetails: 'Era su primera cita con Betty Lou Jensen. Esa noche asistieron a un concierto de musica navidena. Antes de la cita, David fue a casa de Betty Lou para conocer a sus padres, siguiendo el consejo de la hermana de ella.',
      lastKnownActivities: 'Concierto de musica navidena, viaje en auto a Lake Herman Road.',

      deathDate: new Date('1968-12-20'),
      causeOfDeath: 'Disparo en la cabeza a quemarropa',
      status: 'DECEASED',

      legacy: 'Primera victima confirmada del Zodiac Killer. Su caso sigue sin resolver despues de mas de 50 anos.',

      biography: `David Arthur Faraday nacio el 25 de octubre de 1951 en San Rafael, California. Era estudiante de Vallejo High School y miembro del equipo de lucha libre.

Era un joven ejemplar: Eagle Scout, el rango mas alto de los Boy Scouts, y recipiente del "Gods Country Award" por su reverencia religiosa. Su padre trabajaba para Pacific Gas and Electric.

Era descrito como tranquilo y estudioso, con poco tiempo para citas. Betty Lou Jensen fue su primera cita. Se habian conocido hacia apenas dos semanas cuando la invito a salir el 20 de diciembre de 1968.

Esa noche, David fue a casa de Betty Lou para conocer a sus padres. Luego asistieron a un concierto de musica navidena. Aproximadamente a las 11:15 p.m., fueron atacados en un area de estacionamiento en Lake Herman Road.

David tenia 17 anos. Su familia nunca pudo explicar lo que habia pasado.`,

      lifeSummary: 'Joven de 17 anos de Vallejo, California. Eagle Scout, estudiante estudioso, luchador escolar. Murio junto a Betty Lou Jensen en su primera cita, el 20 de diciembre de 1968.',

      imageSource: 'Archivos escolares via San Francisco Chronicle'
    }
  })
  console.log(`   ✓ David Faraday - ${david.count} registro(s)`)
  totalUpdated += david.count

  const betty = await prisma.victim.updateMany({
    where: { fullName: { contains: 'Betty Lou Jensen' } },
    data: {
      fullName: 'Betty Lou Jensen',
      birthDate: new Date('1952-04-21'),
      birthPlace: 'Colorado, Estados Unidos',
      nationality: 'Estadounidense',
      ageAtDeathOrMissing: 16,

      parents: 'Padre programador de la U.S. General Services Administration',

      education: 'Hogan High School - Junior (tercer ano)',
      educationDetails: 'Estudiante del cuadro de honor.',

      personality: 'Descrita como "tranquila, estudiosa, con poco tiempo para citas". Nunca habia tenido una cita antes.',
      accomplishments: 'Grand Royal Bride of the Prima Vere Council #132 Pythian Sunshine Girls. Miembro de la orden fraternal Pythian Sisters. Miembro de la Iglesia de la Ciencia Cristiana.',

      relationship: 'David Faraday fue su primera cita. Siguio el consejo de su hermana de invitarlo a conocer a sus padres antes de salir.',

      lastSeenDate: new Date('1968-12-20'),
      lastSeenPlace: 'Lake Herman Road, Vallejo, California',
      lastSeenDetails: 'Era su primera cita. Siguiendo el consejo de su hermana, invito a David a conocer a sus padres antes de salir. Asistieron a un concierto de musica navidena antes del ataque.',
      lastKnownActivities: 'Conocer a sus padres con David, concierto de musica navidena, viaje en auto.',

      deathDate: new Date('1968-12-20'),
      causeOfDeath: 'Cinco disparos en la espalda',
      status: 'DECEASED',

      legacy: 'Primera victima femenina confirmada del Zodiac Killer. Su caso sigue sin resolver.',

      biography: `Betty Lou Jensen nacio el 21 de abril de 1952 en Colorado. Era estudiante de tercer ano en Hogan High School y miembro del cuadro de honor.

Era una joven activa en su comunidad: Grand Royal Bride de las Pythian Sunshine Girls, miembro de la orden fraternal Pythian Sisters, y miembro de la Iglesia de la Ciencia Cristiana. Su padre trabajaba como programador para el gobierno federal.

Era descrita como tranquila y estudiosa. Nunca habia tenido una cita antes de conocer a David Faraday. Se conocieron dos semanas antes de aquella noche.

El 20 de diciembre de 1968, siguiendo el consejo de su hermana, Betty Lou invito a David a conocer a sus padres antes de salir. Asistieron a un concierto de musica navidena. Esa noche, fueron atacados en Lake Herman Road.

Betty Lou tenia 16 anos. Su familia quedo devastada.`,

      lifeSummary: 'Joven de 16 anos de Vallejo, estudiante de honor, activa en su comunidad e iglesia. Nunca habia tenido una cita antes. Murio junto a David Faraday el 20 de diciembre de 1968.',

      imageSource: 'Archivos escolares via San Francisco Chronicle'
    }
  })
  console.log(`   ✓ Betty Lou Jensen - ${betty.count} registro(s)`)
  totalUpdated += betty.count

  // ============================================================================
  // RESUMEN FINAL
  // ============================================================================
  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log('  RESUMEN FINAL')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`Total de registros actualizados: ${totalUpdated}`)
  console.log('\nVictimas actualizadas:')
  console.log('  1. Madeleine McCann (Reino Unido/Portugal)')
  console.log('  2. Elizabeth Short - La Dalia Negra (EEUU)')
  console.log('  3. JonBenet Ramsey (EEUU)')
  console.log('  4. Paulette Gebara Farah (Mexico)')
  console.log('  5. Maria Marta Garcia Belsunce (Argentina)')
  console.log('  6. Diana Quer Lopez (Espana)')
  console.log('  7. Marta del Castillo Casanueva (Espana)')
  console.log('  8. Elisa Lam (Canada/EEUU)')
  console.log('  9. David Faraday - Zodiac (EEUU)')
  console.log(' 10. Betty Lou Jensen - Zodiac (EEUU)')
  console.log('\n═══════════════════════════════════════════════════════════════')
}

updateAllVictims()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
