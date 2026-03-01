import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface ImpactData {
  slug: string
  legislationName?: string
  legislationYear?: number
  legislationDesc?: string
  foundationName?: string
  foundationDesc?: string
  foundationUrl?: string
  communityImpact?: string
  awarenessEffect?: string
  mediaAdaptations?: Array<{
    title: string
    type: 'documentary' | 'movie' | 'book' | 'podcast' | 'series' | 'other'
    year?: number
    url?: string
  }>
  proceduralChanges?: string
}

const impactsData: ImpactData[] = [
  // ========== ALCÀSSER ==========
  {
    slug: 'crimen-alcasser',
    legislationName: 'Reforma del Codigo Penal Espanol - Prision Permanente Revisable',
    legislationYear: 2015,
    legislationDesc: 'Aunque la prision permanente revisable se aprobo anos despues, el caso de Alcasser fue uno de los crimenes que impulso el debate sobre penas mas duras para delitos graves contra menores. Tambien se reformaron los protocolos de busqueda de personas desaparecidas.',
    foundationName: 'No existe fundacion especifica',
    foundationDesc: 'Las familias de Myriam, Toni y Desiree optaron por mantener un perfil bajo. Sin embargo, el caso impulso la creacion de asociaciones de victimas en Espana y mayor atencion a los derechos de las victimas en procesos judiciales.',
    communityImpact: 'El caso marco un antes y despues en la sociedad espanola. Fue el primer crimen mediatico retransmitido en directo, con el hallazgo de los cuerpos emitido por television. Genero un trauma colectivo y cambio la percepcion de seguridad en pueblos pequenos. La comunidad de Alcasser quedo marcada para siempre.',
    awarenessEffect: 'El caso genero un debate nacional sobre la seguridad de los jovenes, el autoestop, y la vida nocturna. Tambien expuso los excesos del periodismo sensacionalista, especialmente el programa "De tú a tú" de Nieves Herrero, criticado por su cobertura durante el funeral.',
    mediaAdaptations: [
      { title: 'El Caso Alcasser', type: 'documentary', year: 2019, url: 'https://www.netflix.com/title/81083935' },
      { title: 'Las niñas de Alcasser', type: 'book', year: 2019 },
      { title: 'El Caso Alcasser: Las claves', type: 'documentary', year: 2020 },
      { title: '75 dias: El caso Alcasser', type: 'podcast', year: 2021 }
    ],
    proceduralChanges: 'Se reformaron los protocolos de busqueda de personas desaparecidas en Espana. Se establecieron plazos mas cortos para activar alertas. El caso tambien impulso cambios en como los medios pueden cubrir casos judiciales y se crearon codigos eticos para la cobertura de crimenes.'
  },

  // ========== TED BUNDY ==========
  {
    slug: 'ted-bundy',
    legislationName: 'Leyes de Registro de Agresores Sexuales',
    legislationYear: 1994,
    legislationDesc: 'Los crimenes de Bundy contribuyeron al desarrollo de las leyes de registro de agresores sexuales en Estados Unidos, incluyendo la Ley Megan y la Ley de Jacob Wetterling. Su caso demostro como los depredadores pueden moverse entre estados evadiendo la justicia.',
    foundationName: 'The Ted Bundy Victims Memorial Fund',
    foundationDesc: 'Iniciativas en memoria de las victimas de Bundy han recaudado fondos para organizaciones de apoyo a victimas de violencia y programas de prevencion.',
    communityImpact: 'El caso transformo la percepcion publica sobre los asesinos seriales. Bundy rompio el estereotipo del criminal "obvio" - era atractivo, educado y carismatico. Esto llevo a mayor conciencia sobre la manipulacion y el peligro de confiar en desconocidos.',
    awarenessEffect: 'El caso de Bundy se convirtio en material de estudio para el FBI y perfiladores criminales. Ayudo a desarrollar la ciencia del perfil criminal y la comprension de la psicopatia. Se usa en academias de policia como caso de estudio.',
    mediaAdaptations: [
      { title: 'Conversaciones con Asesinos: Las Cintas de Ted Bundy', type: 'documentary', year: 2019, url: 'https://www.netflix.com/title/80226612' },
      { title: 'Extremely Wicked, Shockingly Evil and Vile', type: 'movie', year: 2019 },
      { title: 'Ted Bundy: Falling for a Killer', type: 'documentary', year: 2020 },
      { title: 'The Stranger Beside Me (Ann Rule)', type: 'book', year: 1980 },
      { title: 'No Man of God', type: 'movie', year: 2021 }
    ],
    proceduralChanges: 'El caso impulso la creacion del VICAP (Violent Criminal Apprehension Program) del FBI, una base de datos para rastrear crimenes violentos entre estados. Tambien se mejoraron los protocolos de comunicacion entre departamentos de policia estatales.'
  },

  // ========== JONBENÉT RAMSEY ==========
  {
    slug: 'jonbenet-ramsey',
    legislationName: 'Leyes de Proteccion Infantil en Concursos de Belleza',
    legislationYear: 1997,
    legislationDesc: 'El caso genero debate sobre la sexualizacion de ninas en concursos de belleza infantiles. Varios estados consideraron legislacion para regular estos eventos, aunque pocas leyes concretas se aprobaron.',
    foundationName: 'No existe fundacion especifica',
    foundationDesc: 'La familia Ramsey establecio un fondo de recompensa para informacion sobre el caso. El dinero restante se dono a organizaciones de ninos desaparecidos tras el fallecimiento de Patsy Ramsey en 2006.',
    communityImpact: 'El caso dividio a la opinion publica entre quienes sospechaban de la familia y quienes creian en un intruso. Expuso las fallas del sistema de justicia cuando las familias adineradas son sospechosas. Boulder, Colorado, quedo marcada por el caso.',
    awarenessEffect: 'El caso genero un intenso debate sobre los concursos de belleza infantiles y la explotacion de ninos. Tambien mostro los peligros del juicio mediatico y como la cobertura puede contaminar una investigacion criminal.',
    mediaAdaptations: [
      { title: 'Casting JonBenet', type: 'documentary', year: 2017, url: 'https://www.netflix.com/title/80142316' },
      { title: 'The Case of: JonBenet Ramsey', type: 'documentary', year: 2016 },
      { title: 'JonBenet: An American Murder Mystery', type: 'documentary', year: 2016 },
      { title: 'Perfect Murder, Perfect Town', type: 'book', year: 1999 },
      { title: 'Who Killed JonBenet?', type: 'podcast', year: 2019 }
    ],
    proceduralChanges: 'El caso expuso graves deficiencias en la investigacion policial de Boulder. Se reformaron los protocolos para preservar escenas del crimen y se mejoro la capacitacion de detectives en casos de homicidio infantil.'
  },

  // ========== ZODIAC KILLER ==========
  {
    slug: 'zodiac-killer',
    legislationName: 'No hay legislacion especifica',
    legislationDesc: 'Aunque no se aprobo legislacion especifica, el caso del Zodiaco impulso mejoras en la coordinacion entre departamentos de policia en el Area de la Bahia de San Francisco y el desarrollo de tecnicas de descifrado de codigos en investigaciones criminales.',
    communityImpact: 'El Zodiaco aterrorizo el Area de la Bahia durante anos. Las parejas dejaron de ir a "lovers lanes" (lugares apartados para parejas). El miedo cambio los habitos sociales de toda una generacion en California.',
    awarenessEffect: 'El caso demostro como un criminal puede manipular a los medios y la policia. Las cartas del Zodiaco a los periodicos crearon un nuevo tipo de terrorismo mediatico. El caso sigue generando interes y teorias decadas despues.',
    mediaAdaptations: [
      { title: 'Zodiac', type: 'movie', year: 2007 },
      { title: 'This is the Zodiac Speaking', type: 'documentary', year: 2007 },
      { title: 'The Most Dangerous Animal of All', type: 'documentary', year: 2020 },
      { title: 'Zodiac (Robert Graysmith)', type: 'book', year: 1986 },
      { title: 'Monster: The Zodiac Killer', type: 'podcast', year: 2023 }
    ],
    proceduralChanges: 'El caso impulso la creacion de unidades especiales multi-jurisdiccionales para casos que cruzan limites de ciudades y condados. Tambien se desarrollaron nuevas tecnicas de analisis de documentos y criptografia forense.'
  },

  // ========== JOHN WAYNE GACY ==========
  {
    slug: 'john-wayne-gacy',
    legislationName: 'Leyes de Verificacion de Antecedentes para Trabajadores con Menores',
    legislationYear: 1980,
    legislationDesc: 'El caso de Gacy impulso leyes mas estrictas de verificacion de antecedentes para personas que trabajan con jovenes. Se fortalecieron los requisitos para voluntarios en organizaciones juveniles y eventos comunitarios.',
    foundationName: 'No existe fundacion especifica',
    foundationDesc: 'Las familias de las victimas formaron grupos de apoyo informales. Varias victimas fueron identificadas decadas despues gracias a avances en ADN, lo que impulso proyectos de identificacion de restos.',
    communityImpact: 'El caso destruyo la imagen del "buen vecino" en los suburbios estadounidenses. Gacy era un empresario respetado y payaso de fiestas infantiles. El caso genero desconfianza hacia figuras de autoridad comunitaria.',
    awarenessEffect: 'El caso es estudiado como ejemplo de como los psicopatas pueden integrarse en la sociedad. Gacy, como Bundy, rompio estereotipos. El caso tambien expuso la vulnerabilidad de jovenes homosexuales que no denunciaban por miedo.',
    mediaAdaptations: [
      { title: 'Conversations with a Killer: The John Wayne Gacy Tapes', type: 'documentary', year: 2022, url: 'https://www.netflix.com/title/81393561' },
      { title: 'Gacy: Serial Killer Next Door', type: 'documentary', year: 2024 },
      { title: 'To Catch a Killer', type: 'movie', year: 1992 },
      { title: 'Buried Dreams', type: 'book', year: 1986 },
      { title: 'The Last Victim', type: 'book', year: 1999 }
    ],
    proceduralChanges: 'El caso llevo a reformas en como la policia maneja reportes de personas desaparecidas, especialmente jovenes adultos. Se establecieron protocolos para tomar en serio las desapariciones de adolescentes y jovenes adultos masculinos.'
  },

  // ========== JACK EL DESTRIPADOR ==========
  {
    slug: 'jack-el-destripador',
    legislationName: 'Leyes de Vivienda y Condiciones Laborales (UK)',
    legislationYear: 1890,
    legislationDesc: 'Los crimenes del Destripador expusieron las terribles condiciones de vida en el East End de Londres. Esto impulso reformas sociales, mejoras en vivienda publica y mayor atencion a los barrios pobres.',
    communityImpact: 'El caso transformo Whitechapel y el East End. Genero un movimiento de reforma social y expuso la miseria de las clases trabajadoras victorianas. Las mujeres que trabajaban en la calle quedaron aun mas vulnerables.',
    awarenessEffect: 'Jack el Destripador creo el arquetipo del asesino serial en la cultura popular. El caso invento el concepto de "investigacion criminal moderna" y el uso de prensa para buscar informacion. Sigue siendo el caso sin resolver mas famoso de la historia.',
    mediaAdaptations: [
      { title: 'From Hell', type: 'movie', year: 2001 },
      { title: 'Jack the Ripper: The Definitive Story', type: 'documentary', year: 2011 },
      { title: 'The Complete Jack the Ripper', type: 'book', year: 1975 },
      { title: 'Ripperology', type: 'book', year: 2003 },
      { title: 'Jack the Ripper: The Case Reviewed', type: 'documentary', year: 2019 }
    ],
    proceduralChanges: 'El caso impulso la profesionalizacion de Scotland Yard y la policia metropolitana. Se desarrollaron nuevas tecnicas de investigacion, fotografia forense, y se establecio el concepto de "modus operandi" en crimenes seriales.'
  },

  // ========== CASO ASUNTA ==========
  {
    slug: 'caso-asunta-basterra',
    legislationName: 'Reforma de Proteccion de Menores en Espana',
    legislationYear: 2015,
    legislationDesc: 'El caso impulso reformas en los servicios de proteccion de menores y la obligacion de profesionales (medicos, profesores) de reportar sospechas de maltrato infantil. Se fortalecieron los protocolos de seguimiento en adopciones.',
    foundationName: 'No existe fundacion especifica',
    foundationDesc: 'El caso genero debate sobre el sistema de adopcion en Espana y la necesidad de mayor seguimiento post-adopcion. Organizaciones de derechos de la infancia usaron el caso para impulsar reformas.',
    communityImpact: 'El caso conmociono a Santiago de Compostela y toda Galicia. La imagen de una familia "perfecta" que asesina a su hija adoptiva destruyo muchas certezas sociales. Genero desconfianza hacia adopciones internacionales.',
    awarenessEffect: 'El caso expuso que el maltrato infantil puede ocurrir en cualquier entorno socioeconomico. Los Porto-Basterra eran una familia acomodada y culta. El caso tambien mostro los limites del sistema de proteccion infantil.',
    mediaAdaptations: [
      { title: 'El Caso Asunta', type: 'series', year: 2024, url: 'https://www.netflix.com/title/81588903' },
      { title: 'Muerte en Santiago', type: 'documentary', year: 2016 },
      { title: 'El Caso Asunta (libro)', type: 'book', year: 2016 },
      { title: 'Lo que la verdad esconde: El caso Asunta', type: 'podcast', year: 2020 }
    ],
    proceduralChanges: 'Se implementaron protocolos mas estrictos de seguimiento en adopciones. Los centros educativos recibieron formacion para detectar senales de alerta. Se mejoro la coordinacion entre servicios sociales y sistema judicial.'
  },

  // ========== DIANA QUER ==========
  {
    slug: 'caso-diana-quer',
    legislationName: 'Prision Permanente Revisable - Consolidacion',
    legislationYear: 2018,
    legislationDesc: 'El caso de Diana Quer fue clave para mantener la prision permanente revisable en Espana cuando se debatia su derogacion. Juan Carlos Quer, padre de Diana, se convirtio en activista por penas mas duras.',
    foundationName: 'Fundacion Diana Quer',
    foundationDesc: 'Fundacion creada por la familia para defender los derechos de las victimas y promover la prision permanente revisable. Tambien trabaja en prevencion y concienciacion sobre seguridad.',
    foundationUrl: 'https://www.fundaciondianaquergarcialozano.com',
    communityImpact: 'El caso paralizo Galicia durante 500 dias de busqueda. La comunidad de A Pobra do Caraminal participo masivamente en las busquedas. El hallazgo del cuerpo genero una oleada de indignacion nacional.',
    awarenessEffect: 'El caso revivio el debate sobre la prision permanente revisable y las penas para crimenes contra menores. Tambien genero conciencia sobre la importancia del telefono movil como herramienta de investigacion.',
    mediaAdaptations: [
      { title: 'El caso Diana Quer', type: 'documentary', year: 2022 },
      { title: 'Diana: 497 dias', type: 'book', year: 2018 },
      { title: 'Cronica de sucesos: Diana Quer', type: 'podcast', year: 2019 }
    ],
    proceduralChanges: 'Se mejoraron los protocolos de busqueda de personas desaparecidas y la coordinacion con companias telefonicas para rastrear moviles. El caso demostro la importancia de la tecnologia en investigaciones criminales.'
  },

  // ========== MARTA DEL CASTILLO ==========
  {
    slug: 'marta-del-castillo',
    legislationName: 'Ley de Proteccion de Victimas y Menores',
    legislationYear: 2015,
    legislationDesc: 'El caso impulso reformas para endurecer las penas por ocultacion de cadaver y no colaboracion con la justicia. Tambien se debatio sobre la responsabilidad penal de menores complices.',
    foundationName: 'Asociacion Marta del Castillo',
    foundationDesc: 'Asociacion creada por los padres de Marta para defender los derechos de las victimas y exigir que se encuentre el cuerpo. Luchan por reformas legales que obliguen a los condenados a revelar donde estan los restos.',
    communityImpact: 'Sevilla se volco con la familia Del Castillo. Las manifestaciones pidiendo justicia fueron multitudinarias. El caso genero frustracion social porque nunca se encontro el cuerpo de Marta.',
    awarenessEffect: 'El caso expuso las lagunas legales que permiten a los condenados no revelar donde esta el cuerpo. Genero debate sobre "el derecho a la verdad" de las familias y la necesidad de incentivos legales para que los criminales colaboren.',
    mediaAdaptations: [
      { title: 'El Caso Marta del Castillo', type: 'documentary', year: 2021 },
      { title: 'Marta: El crimen que cambio Espana', type: 'book', year: 2020 },
      { title: 'Desaparecida: El caso Marta del Castillo', type: 'podcast', year: 2021 }
    ],
    proceduralChanges: 'Se debatieron reformas para considerar la ocultacion del cadaver como agravante. Se mejoraron las tecnicas de busqueda de restos y la colaboracion entre fuerzas de seguridad para rastrillos masivos.'
  },

  // ========== GABRIEL CRUZ ==========
  {
    slug: 'caso-gabriel-cruz',
    legislationName: 'Ley de Proteccion Integral de la Infancia (Ley Rhodes)',
    legislationYear: 2021,
    legislationDesc: 'El caso del pequeno Gabriel impulso la aprobacion de la ley de proteccion integral de la infancia, que incluye medidas contra la violencia hacia menores en todos los ambitos.',
    foundationName: 'Fundacion Gabriel Cruz',
    foundationDesc: 'Fundacion "Buscando a Gabriel" creada por los padres para promover la proteccion de la infancia y ayudar a familias de ninos desaparecidos. Trabaja en prevencion y apoyo psicologico.',
    communityImpact: 'Almeria y toda Espana se volcaron en la busqueda de Gabriel. Miles de personas participaron en rastrillos. El pez hecho con las manos se convirtio en simbolo de esperanza. El descubrimiento del asesino (la pareja del padre) conmociono aun mas.',
    awarenessEffect: 'El caso expuso los peligros dentro del entorno familiar. La asesina, Ana Julia Quezada, era la pareja del padre. Genero debate sobre las relaciones con hijastros y la deteccion de personas peligrosas en el entorno cercano.',
    mediaAdaptations: [
      { title: 'El Caso Gabriel Cruz', type: 'documentary', year: 2022 },
      { title: 'El pez que nunca se apago', type: 'book', year: 2019 },
      { title: 'Buscando a Gabriel', type: 'podcast', year: 2020 }
    ],
    proceduralChanges: 'Se mejoraron los protocolos de busqueda de menores y la coordinacion con medios para evitar filtrar informacion sensible. El caso tambien impulso formacion para detectar comportamientos sospechosos de personas cercanas durante investigaciones.'
  },

  // ========== ANABEL SEGURA ==========
  {
    slug: 'anabel-segura',
    legislationName: 'Reforma del Codigo Penal sobre Secuestros',
    legislationYear: 1995,
    legislationDesc: 'El caso impulso reformas para endurecer las penas por secuestro con resultado de muerte. Se establecieron penas minimas mas altas y se elimino la posibilidad de beneficios penitenciarios en ciertos casos.',
    foundationName: 'No existe fundacion especifica',
    foundationDesc: 'La familia de Anabel mantuvo un perfil bajo. Sin embargo, el caso impulso la creacion de protocolos de actuacion ante secuestros y mayor atencion a la seguridad en urbanizaciones residenciales.',
    communityImpact: 'La Moraleja, una de las urbanizaciones mas exclusivas de Madrid, quedo marcada por el caso. Se reforzaron las medidas de seguridad privada y se genero un debate sobre la vulnerabilidad de las familias adineradas.',
    awarenessEffect: 'El caso fue pionero en el uso de medios de comunicacion durante un secuestro. La familia aparecio en television pidiendo la liberacion de Anabel. Esto genero debate sobre si la exposicion mediatica ayuda o perjudica a las victimas.',
    mediaAdaptations: [
      { title: 'El Caso Anabel Segura', type: 'documentary', year: 2018 },
      { title: '198 dias en poder del mal', type: 'book', year: 1996 }
    ],
    proceduralChanges: 'Se crearon unidades especiales de negociacion en secuestros. Se establecieron protocolos de comunicacion con los medios durante secuestros activos. Se mejoro la coordinacion entre fuerzas de seguridad.'
  },

  // ========== DELPHI MURDERS ==========
  {
    slug: 'delphi-murders',
    legislationName: 'No hay legislacion especifica aun',
    legislationDesc: 'El caso sigue abierto y en juicio. Ha generado debate sobre la proteccion de senderos publicos y la seguridad en areas rurales de Indiana.',
    communityImpact: 'Delphi, un pequeno pueblo de Indiana, quedo devastado. La comunidad se unio para buscar justicia. El caso genero desconfianza y cambio los habitos de paseo de los residentes.',
    awarenessEffect: 'El caso demostro el poder de las redes sociales para mantener viva una investigacion. La imagen y el audio del sospechoso fueron difundidos masivamente. Genero debate sobre true crime y su impacto en investigaciones activas.',
    mediaAdaptations: [
      { title: 'Down the Hill: The Delphi Murders', type: 'podcast', year: 2020 },
      { title: 'The Delphi Murders', type: 'documentary', year: 2023 },
      { title: 'Abby & Libby: The Delphi Murders', type: 'book', year: 2021 }
    ],
    proceduralChanges: 'El caso ha impulsado debate sobre como manejar evidencia de audio y video en investigaciones. Tambien ha generado discusion sobre la colaboracion entre policia y podcasters de true crime.'
  },

  // ========== NATALEE HOLLOWAY ==========
  {
    slug: 'natalee-holloway',
    legislationName: 'Ley Natalee Holloway (propuesta)',
    legislationYear: 2006,
    legislationDesc: 'Se propusieron leyes para mejorar la asistencia consular a ciudadanos estadounidenses en el extranjero y establecer un fondo para familias de victimas de crimenes en otros paises.',
    foundationName: 'Natalee Holloway Resource Center',
    foundationDesc: 'Centro creado para ayudar a familias de personas desaparecidas en el extranjero. Proporciona recursos, apoyo y asistencia legal para navegar sistemas judiciales internacionales.',
    communityImpact: 'Aruba sufrio un impacto economico por el boicot turistico que siguio al caso. La relacion entre Estados Unidos y los Paises Bajos se tenso. El caso expuso las dificultades de investigar crimenes en jurisdicciones extranjeras.',
    awarenessEffect: 'El caso genero conciencia sobre los peligros de los viajes de graduacion y el turismo juvenil. Tambien expuso los riesgos del consumo de alcohol en el extranjero y la vulnerabilidad de turistas jovenes.',
    mediaAdaptations: [
      { title: 'The Disappearance of Natalee Holloway', type: 'documentary', year: 2017 },
      { title: 'Natalee Holloway', type: 'movie', year: 2009 },
      { title: 'Aruba: The Tragic Untold Story of Natalee Holloway', type: 'book', year: 2006 },
      { title: 'Justice for Natalee Holloway', type: 'documentary', year: 2011 }
    ],
    proceduralChanges: 'Se mejoraron los protocolos del Departamento de Estado para asistir a ciudadanos en el extranjero. Se establecieron mejores canales de comunicacion con fuerzas policiales de otros paises.'
  },

  // ========== ELISA LAM ==========
  {
    slug: 'caso-elisa-lam',
    legislationName: 'No hay legislacion especifica',
    legislationDesc: 'El caso no genero legislacion directa, pero impulso mejoras en la seguridad de hoteles y el acceso a areas restringidas como azoteas y tanques de agua.',
    communityImpact: 'El Cecil Hotel, ya infame por su historia oscura, se convirtio en atraccion morbosa. El caso genero debate sobre la salud mental y como las redes sociales pueden especular irresponsablemente sobre casos reales.',
    awarenessEffect: 'El video del ascensor se volvio viral y genero teorias conspirativas. El caso es un ejemplo de como el internet puede distorsionar investigaciones y crear narrativas falsas que danan a las familias.',
    mediaAdaptations: [
      { title: 'Escena del Crimen: Desaparicion en el Hotel Cecil', type: 'documentary', year: 2021, url: 'https://www.netflix.com/title/81183727' },
      { title: 'The Elisa Lam Case', type: 'podcast', year: 2019 }
    ],
    proceduralChanges: 'Hoteles en Los Angeles mejoraron la seguridad de acceso a azoteas y areas de mantenimiento. Se debatieron protocolos para manejar el impacto de videos virales en investigaciones policiales.'
  },

  // ========== LACI PETERSON ==========
  {
    slug: 'laci-peterson',
    legislationName: 'Ley Laci y Conner (Unborn Victims of Violence Act)',
    legislationYear: 2004,
    legislationDesc: 'Esta ley federal reconoce al feto como victima separada cuando una mujer embarazada es atacada. El caso de Laci Peterson fue clave para su aprobacion. Ahora, matar a una mujer embarazada puede resultar en dos cargos de homicidio.',
    foundationName: 'Laci Peterson Foundation',
    foundationDesc: 'Fundacion que trabaja en concientizacion sobre violencia domestica y apoyo a victimas. Fue creada por la familia de Laci para honrar su memoria.',
    communityImpact: 'Modesto, California, quedo conmocionada. La imagen del marido "perfecto" que asesina a su esposa embarazada destruyo la ilusion del American Dream. El caso genero debate sobre violencia domestica.',
    awarenessEffect: 'El caso es usado como ejemplo de como los esposos pueden ser los perpetradores. Scott Peterson se convirtio en el arquetipo del esposo asesino. Aumento la conciencia sobre senales de alarma en relaciones.',
    mediaAdaptations: [
      { title: 'The Murder of Laci Peterson', type: 'documentary', year: 2017 },
      { title: 'Scott Peterson: An American Murder Mystery', type: 'documentary', year: 2017 },
      { title: 'A Deadly Game', type: 'book', year: 2005 },
      { title: 'For Laci', type: 'book', year: 2004 }
    ],
    proceduralChanges: 'Se mejoraron los protocolos para investigar a esposos y parejas como sospechosos principales. Se fortalecio la formacion policial en deteccion de violencia domestica.'
  },

  // ========== CAYLEE ANTHONY ==========
  {
    slug: 'caylee-anthony',
    legislationName: 'Ley Caylee (Caylee\'s Law)',
    legislationYear: 2011,
    legislationDesc: 'Leyes en varios estados que hacen obligatorio reportar la desaparicion de un menor en un plazo determinado (24-48 horas). El retraso de Casey Anthony en reportar a Caylee desaparecida impulso esta legislacion.',
    communityImpact: 'Orlando, Florida, quedo dividida por el caso. El veredicto de "no culpable" genero protestas masivas. El caso creo desconfianza en el sistema de justicia y debate sobre "justicia mediatica" vs justicia real.',
    awarenessEffect: 'El caso expuso como las madres tambien pueden ser perpetradoras. Casey Anthony se convirtio en la "madre mas odiada de America". Genero debate sobre la presuncion de inocencia y el juicio mediatico.',
    mediaAdaptations: [
      { title: 'Casey Anthony: An American Murder Mystery', type: 'documentary', year: 2017 },
      { title: 'Casey Anthony: Where the Truth Lies', type: 'documentary', year: 2022 },
      { title: 'Imperfect Justice', type: 'book', year: 2011 },
      { title: 'Presumed Guilty: Casey Anthony', type: 'book', year: 2012 }
    ],
    proceduralChanges: 'Se establecieron leyes que obligan a reportar desapariciones de menores rapidamente. Se mejoraron los protocolos de interrogatorio a familiares en casos de ninos desaparecidos.'
  },

  // ========== LA DALIA NEGRA ==========
  {
    slug: 'dalia-negra',
    legislationName: 'No hay legislacion especifica',
    legislationDesc: 'El caso, aunque no genero legislacion directa, impulso la profesionalizacion del LAPD y el desarrollo de tecnicas forenses mas avanzadas.',
    communityImpact: 'Hollywood y Los Angeles quedaron marcados por el caso. El contraste entre el glamour de Hollywood y la brutalidad del crimen expuso el lado oscuro de la ciudad de los suenos.',
    awarenessEffect: 'El caso creo el arquetipo del "crimen de Hollywood" - glamoroso, brutal y misterioso. Elizabeth Short se convirtio en simbolo de los suenos rotos de Hollywood y la explotacion de mujeres aspirantes a actrices.',
    mediaAdaptations: [
      { title: 'La Dalia Negra', type: 'movie', year: 2006 },
      { title: 'I Am the Night', type: 'series', year: 2019 },
      { title: 'Black Dahlia Avenger', type: 'book', year: 2003 },
      { title: 'Severed: The True Story of the Black Dahlia', type: 'book', year: 2006 }
    ],
    proceduralChanges: 'El caso impulso mejoras en la preservacion de evidencia fotografica y el desarrollo de archivos criminales mas sistematicos en el LAPD.'
  },

  // ========== MAURA MURRAY ==========
  {
    slug: 'maura-murray',
    legislationName: 'No hay legislacion especifica',
    legislationDesc: 'El caso no ha generado legislacion, pero ha impulsado debate sobre protocolos de busqueda en areas rurales y la colaboracion entre estados en casos de personas desaparecidas.',
    communityImpact: 'La pequena comunidad de Haverhill, New Hampshire, quedo dividida por teorias y sospechas. Residentes locales fueron acosados por investigadores aficionados, generando tension.',
    awarenessEffect: 'El caso se convirtio en un fenomeno de internet y podcasts. Es el ejemplo mas citado de como el true crime puede tanto ayudar como perjudicar investigaciones. La familia ha pedido respeto y privacidad.',
    mediaAdaptations: [
      { title: 'The Disappearance of Maura Murray', type: 'documentary', year: 2017 },
      { title: 'Missing Maura Murray', type: 'podcast', year: 2017 },
      { title: 'True Crime Addict', type: 'book', year: 2016 }
    ],
    proceduralChanges: 'El caso ha generado debate sobre como manejar investigaciones aficionadas y el impacto de podcasts en casos abiertos.'
  },

  // ========== MEREDITH KERCHER ==========
  {
    slug: 'meredith-kercher',
    legislationName: 'No hay legislacion especifica',
    legislationDesc: 'El caso genero debate internacional sobre el sistema judicial italiano y las diferencias con sistemas anglosajones. No se aprobo legislacion directa.',
    foundationName: 'Meredith Kercher Memorial Trust',
    foundationDesc: 'Fondo en memoria de Meredith para apoyar a estudiantes britanicos que estudian en el extranjero y promover la seguridad de estudiantes internacionales.',
    communityImpact: 'Perugia y la Universidad para Extranjeros quedaron marcadas. El caso daño temporalmente los programas de intercambio y genero preocupacion entre familias de estudiantes.',
    awarenessEffect: 'El caso expuso las diferencias entre sistemas judiciales y como la nacionalidad puede influir en la cobertura mediatica. Amanda Knox recibio mas atencion que la victima, Meredith.',
    mediaAdaptations: [
      { title: 'Amanda Knox', type: 'documentary', year: 2016, url: 'https://www.netflix.com/title/80081155' },
      { title: 'The Murder of Meredith Kercher', type: 'documentary', year: 2014 },
      { title: 'Angel Face', type: 'book', year: 2010 },
      { title: 'Waiting to Be Heard (Amanda Knox)', type: 'book', year: 2013 }
    ],
    proceduralChanges: 'Italia reviso algunos procedimientos judiciales tras las criticas internacionales. Se debatio sobre la filtracion de informacion a medios durante investigaciones activas.'
  },

  // ========== CASO PAULETTE ==========
  {
    slug: 'caso-paulette',
    legislationName: 'Ley General de los Derechos de Ninas, Ninos y Adolescentes (Mexico)',
    legislationYear: 2014,
    legislationDesc: 'El caso impulso reformas para mejorar la proteccion de menores en Mexico y fortalecer la Alerta Amber mexicana. Se establecieron protocolos mas claros para busqueda de menores.',
    communityImpact: 'Mexico quedo conmocionado cuando el cuerpo de Paulette aparecio en su propia cama, aparentemente sin que los investigadores lo notaran durante dias. El caso genero desconfianza total en las autoridades.',
    awarenessEffect: 'El caso expuso graves deficiencias en la investigacion policial mexicana y la posible complicidad de autoridades. Genero un debate nacional sobre corrupcion y negligencia en casos de menores.',
    mediaAdaptations: [
      { title: 'Paulette', type: 'documentary', year: 2020, url: 'https://www.netflix.com/title/81035902' },
      { title: 'El Caso Paulette', type: 'book', year: 2012 }
    ],
    proceduralChanges: 'Se reformaron los protocolos de busqueda de menores en Mexico. Se establecio la obligacion de revisar exhaustivamente los domicilios. Se mejoro la coordinacion entre ministerio publico y policias.'
  },

  // ========== MARIA MARTA GARCIA BELSUNCE ==========
  {
    slug: 'maria-marta-garcia-belsunce',
    legislationName: 'No hay legislacion especifica',
    legislationDesc: 'El caso no genero legislacion directa, pero impulso debate sobre la impunidad de las clases altas en Argentina y la influencia de las relaciones sociales en investigaciones.',
    communityImpact: 'El country Carmel y la zona norte del Gran Buenos Aires quedaron bajo escrutinio. El caso expuso las tensiones sociales y la posible impunidad de las elites argentinas.',
    awarenessEffect: 'El caso se convirtio en simbolo de como el poder y las conexiones pueden obstaculizar la justicia. Genero debate sobre encubrimiento familiar y la manipulacion de escenas del crimen.',
    mediaAdaptations: [
      { title: 'Carmel: Quien mato a Maria Marta?', type: 'documentary', year: 2020, url: 'https://www.netflix.com/title/81078579' },
      { title: 'El Caso Maria Marta', type: 'book', year: 2012 },
      { title: 'Carmel (pelicula)', type: 'movie', year: 2021 }
    ],
    proceduralChanges: 'El caso impulso debate sobre protocolos forenses en Argentina y la independencia de las autopsias del poder politico y social.'
  }
]

async function main() {
  console.log('Iniciando carga de impactos...\n')

  for (const data of impactsData) {
    const caso = await prisma.case.findUnique({
      where: { slug: data.slug },
    })

    if (!caso) {
      console.log(`❌ Caso no encontrado: ${data.slug}`)
      continue
    }

    await prisma.caseImpact.upsert({
      where: { caseId: caso.id },
      update: {
        legislationName: data.legislationName || null,
        legislationYear: data.legislationYear || null,
        legislationDesc: data.legislationDesc || null,
        foundationName: data.foundationName || null,
        foundationDesc: data.foundationDesc || null,
        foundationUrl: data.foundationUrl || null,
        communityImpact: data.communityImpact || null,
        awarenessEffect: data.awarenessEffect || null,
        mediaAdaptations: data.mediaAdaptations ? JSON.stringify(data.mediaAdaptations) : null,
        proceduralChanges: data.proceduralChanges || null,
      },
      create: {
        caseId: caso.id,
        legislationName: data.legislationName || null,
        legislationYear: data.legislationYear || null,
        legislationDesc: data.legislationDesc || null,
        foundationName: data.foundationName || null,
        foundationDesc: data.foundationDesc || null,
        foundationUrl: data.foundationUrl || null,
        communityImpact: data.communityImpact || null,
        awarenessEffect: data.awarenessEffect || null,
        mediaAdaptations: data.mediaAdaptations ? JSON.stringify(data.mediaAdaptations) : null,
        proceduralChanges: data.proceduralChanges || null,
      },
    })

    console.log(`✅ ${caso.title}`)
  }

  console.log('\n¡Completado!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
