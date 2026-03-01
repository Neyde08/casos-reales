import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * ACTUALIZACION DE VICTIMAS - CASO ALCASSER
 *
 * Este script actualiza la informacion de las tres victimas del crimen de Alcasser
 * con datos verificados de fuentes confiables (Infobae, Oxygen, testimonios judiciales).
 *
 * Ejecutar con: npx tsx prisma/update-alcasser-victims.ts
 */

async function updateAlcasserVictims() {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  ACTUALIZANDO VICTIMAS - CASO ALCASSER')
  console.log('═══════════════════════════════════════════════════════════════\n')

  // ============================================================================
  // MIRIAM GARCIA IBORRA
  // ============================================================================

  const miriam = await prisma.victim.updateMany({
    where: {
      fullName: { contains: 'Miriam' }
    },
    data: {
      // Identidad
      fullName: 'Miriam García Iborra',
      birthDate: new Date('1978-07-28'),
      birthPlace: 'Valencia, España',
      nationality: 'Española',
      ageAtDeathOrMissing: 14,

      // Familia
      parents: 'Fernando García Mediano y Matilde Iborra',
      parentsOccupation: 'Clase trabajadora de Alcàsser',
      siblings: 'Martín y Fernando (dos hermanos menores)',
      familyBackground: `Fernando García se convirtió en el rostro más visible de las familias, apareciendo frecuentemente en medios exigiendo justicia. La madre, Matilde Iborra, falleció el 6 de febrero de 1998 en el Hospital La Fe de Valencia, a los 45 años, víctima de una larga enfermedad hepática. Su muerte ocurrió apenas un año después de concluir el juicio.`,

      // Educacion
      education: 'Instituto de Educación Secundaria de Alcàsser',
      educationDetails: 'Estudiante de secundaria',

      // Personalidad
      personality: 'Adolescente normal que disfrutaba pasar tiempo con sus amigas y escuchar música popular de la época.',
      socialLife: 'Formaba parte de un grupo de cuatro amigas inseparables (Miriam, Toñi, Desirée y Esther). Se reunían habitualmente en los Recreativos Zass, un local de ocio juvenil en Alcàsser.',
      bestFriends: 'Toñi Gómez, Desirée Hernández y Esther Díez - amigas "de toda la vida"',

      // Ultimo dia
      lastSeenDate: new Date('1992-11-13'),
      lastSeenPlace: 'Alcàsser, Valencia - saliendo de casa de su amiga Esther',
      lastSeenDetails: `Por la tarde visitó a su amiga Esther junto a Toñi y Desirée. Llamó a su padre Fernando para pedirle que las llevara a la discoteca Coolor, pero él tenía fiebre y no pudo. Sobre las 20:00 salieron de casa de Esther y decidieron hacer autostop. Entre las 20:00 y 20:20 fueron vistas pidiendo coche en dirección a Picassent.`,
      lastKnownActivities: 'Visita a casa de Esther, llamada telefónica a su padre, decisión de hacer autostop hacia la discoteca Coolor en Picassent',

      // Muerte
      deathDate: new Date('1992-11-13'),
      causeOfDeath: 'Homicidio',
      status: 'DECEASED',

      // Legado
      legacy: 'Su padre Fernando García se convirtió en símbolo de la lucha por la justicia. Las tres niñas están enterradas juntas en el cementerio de Alcàsser, donde un monumento las recuerda.',
      memorialInfo: 'Monumento conmemorativo en el cementerio de Alcàsser. El funeral congregó a 30.000 personas.',

      // Biografia
      biography: `Miriam García Iborra nació el 28 de julio de 1978 en Valencia. Tenía 14 años cuando desapareció. Era hija de Fernando García Mediano y Matilde Iborra, y tenía dos hermanos menores, Martín y Fernando.

Estudiaba en el Instituto de Educación Secundaria de Alcàsser y formaba parte de un grupo inseparable de cuatro amigas: ella, Toñi, Desirée y Esther. Las cuatro se conocían "de toda la vida" y se reunían habitualmente en los Recreativos Zass, un local de ocio juvenil del pueblo.

El viernes 13 de noviembre de 1992, Miriam y sus amigas visitaron a Esther antes de ir a una fiesta del instituto en la discoteca Coolor. Esther estaba enferma y no las acompañó. Miriam llamó a su padre para que las llevara, pero Fernando tenía fiebre. Las tres amigas decidieron hacer autostop. Nunca llegaron a la discoteca.`,

      lifeSummary: 'Adolescente de 14 años de Alcàsser, estudiante de secundaria, parte de un grupo inseparable de cuatro amigas. Desapareció junto a sus amigas Toñi y Desirée la noche del 13 de noviembre de 1992.',

      // Imagen
      imageSource: 'Archivo familiar vía El País / RTVE'
    }
  })

  console.log(`✓ Miriam García Iborra - ${miriam.count} registro(s) actualizado(s)`)

  // ============================================================================
  // ANTONIA "TOÑI" GOMEZ RODRIGUEZ
  // ============================================================================

  const toni = await prisma.victim.updateMany({
    where: {
      OR: [
        { fullName: { contains: 'Toñi' } },
        { fullName: { contains: 'Antonia' } }
      ]
    },
    data: {
      // Identidad
      fullName: 'Antonia "Toñi" Gómez Rodríguez',
      aliases: JSON.stringify(['Toñi']),
      birthDate: new Date('1977-05-25'),
      birthPlace: 'Valencia, España',
      nationality: 'Española',
      ageAtDeathOrMissing: 15,

      // Familia
      parents: 'Fernando Gómez y Luisa Moreno',
      parentsOccupation: 'Familia de clase trabajadora',
      siblings: 'Varios hermanos (al menos dos que posteriormente se casaron y tuvieron hijos)',
      familyBackground: `Los padres de Toñi fueron los más discretos de las tres familias. Designaron a otros para las apariciones televisivas, prefiriendo mantenerse alejados de los medios. Fernando Gómez rompió su silencio en 2013 cuando Miguel Ricart salió de prisión, declarando que era "una segunda condena para las familias". Los Gómez continúan viviendo en la Comunidad Valenciana, alejados del foco público.`,

      // Educacion
      education: 'Instituto de Educación Secundaria de Alcàsser',
      educationDetails: 'Estudiante de secundaria. Su familia tenía acceso limitado a transporte privado, razón por la cual las niñas solían usar autostop.',

      // Personalidad
      personality: 'Adolescente alegre que dedicaba canciones en la radio a sus amigos.',
      hobbies: 'Escuchar música, ir a fiestas de instituto, pasar tiempo con amigas',
      socialLife: 'Parte del grupo de cuatro amigas inseparables. Frecuentaba los Recreativos Zass.',
      bestFriends: 'Miriam García, Desirée Hernández y Esther Díez',

      // Detalles especiales
      favoriteThings: 'El día antes de desaparecer había dedicado una canción en la radio a un amigo que planeaba ver al día siguiente.',

      // Ultimo dia
      lastSeenDate: new Date('1992-11-13'),
      lastSeenPlace: 'Alcàsser, Valencia - saliendo de casa de Esther',
      lastSeenDetails: 'Visitó junto a Miriam y Desirée a su amiga Esther por la tarde. Sobre las 20:00 salieron hacia la discoteca Coolor haciendo autostop.',
      lastKnownActivities: 'Visita a Esther, decisión de ir a la discoteca Coolor',

      // Muerte
      deathDate: new Date('1992-11-13'),
      causeOfDeath: 'Homicidio',
      status: 'DECEASED',

      // Legado
      legacy: 'Sus padres han preferido recordarla en privado, dedicándose a sus otros hijos y nietos. Si hubiera sobrevivido, hoy tendría más de 40 años.',
      memorialInfo: 'Enterrada junto a sus amigas en el cementerio de Alcàsser.',

      // Biografia
      biography: `Antonia "Toñi" Gómez Rodríguez nació el 25 de mayo de 1977 en Valencia. Era la mayor de las tres, con 15 años al momento de su desaparición. Sus padres eran Fernando Gómez y Luisa Moreno, una familia de clase trabajadora de Alcàsser.

Toñi estudiaba en el Instituto de Educación Secundaria de Alcàsser junto a sus amigas. Era una adolescente alegre; el día antes de desaparecer había dedicado una canción en la radio a un amigo que planeaba ver al día siguiente.

Formaba parte del grupo inseparable de cuatro amigas que se reunían en los Recreativos Zass. El viernes 13 de noviembre de 1992 salió junto a Miriam y Desirée hacia una fiesta en la discoteca Coolor. Nunca llegaron.`,

      lifeSummary: 'Adolescente de 15 años de Alcàsser, la mayor del grupo de amigas. Alegre y sociable, dedicaba canciones en la radio a sus amigos. Desapareció junto a Miriam y Desirée el 13 de noviembre de 1992.',

      // Imagen
      imageSource: 'Archivo familiar vía El País / RTVE'
    }
  })

  console.log(`✓ Toñi Gómez Rodríguez - ${toni.count} registro(s) actualizado(s)`)

  // ============================================================================
  // DESIREE HERNANDEZ FOLCH
  // ============================================================================

  const desiree = await prisma.victim.updateMany({
    where: {
      fullName: { contains: 'Desirée' }
    },
    data: {
      // Identidad
      fullName: 'Desirée Hernández Folch',
      aliases: JSON.stringify(['Desi', 'María Deseada']),
      birthDate: new Date('1978-01-05'), // Fecha aproximada basada en que tenía 14 años
      birthPlace: 'Valencia, España',
      nationality: 'Española',
      ageAtDeathOrMissing: 14,

      // Familia
      parents: 'Vicente Hernández y Rosa Folch',
      siblings: 'Una hermana mayor',
      familyBackground: `Rosa Folch enfrentó un doble drama: perdió a su hija Desirée y enviudó apenas dos años después cuando Vicente falleció en el verano de 1994, antes de que concluyera el proceso judicial. Rosa tuvo que enfrentarse sola, junto a su hija mayor, a todo el juicio. Eligió la discreción y el silencio dignificado. Demandó exitosamente a Juan Ignacio Blanco por publicar fotografías de su hija. Hoy reside en la Comunidad Valenciana y ocasionalmente visita el cementerio.`,

      // Citas familiares
      familyQuotes: JSON.stringify([
        {
          quote: "Cuando alguien habla del caso, nos vuelven a llamar. Y eso duele. No hay aniversario que cure.",
          author: "Rosa Folch",
          relation: "Madre"
        }
      ]),

      // Educacion
      education: 'Instituto de Educación Secundaria de Alcàsser',
      educationDetails: 'Estudiante de secundaria',

      // Personalidad
      personality: 'Adolescente activa con planes y proyectos.',
      hobbies: 'Patinaje, pasar tiempo con amigas, ir a fiestas de instituto',
      socialLife: 'Parte del grupo de cuatro amigas inseparables. Frecuentaba los Recreativos Zass.',
      bestFriends: 'Miriam García, Toñi Gómez y Esther Díez',

      // Detalles especiales - muy importante para humanizarla
      dreams: 'La noche de su desaparición tenía preparada una bolsa deportiva para ir a patinar a la mañana siguiente.',

      // Ultimo dia
      lastSeenDate: new Date('1992-11-13'),
      lastSeenPlace: 'Alcàsser, Valencia - saliendo de casa de Esther',
      lastSeenDetails: 'Visitó a Esther junto a Miriam y Toñi por la tarde. Había preparado su bolsa para ir a patinar al día siguiente. Sobre las 20:00 salieron hacia la discoteca Coolor.',
      lastKnownActivities: 'Preparar bolsa de patinaje para el día siguiente, visita a Esther, decisión de ir a la discoteca',

      // Muerte
      deathDate: new Date('1992-11-13'),
      causeOfDeath: 'Homicidio',
      status: 'DECEASED',

      // Legado
      legacy: 'Su madre Rosa Folch representa el dolor silencioso y la dignidad en el duelo. Ha elegido recordar a su hija en privado, lejos del ruido mediático.',
      memorialInfo: 'Enterrada junto a sus amigas en el cementerio de Alcàsser.',

      // Biografia
      biography: `María Deseada "Desirée" Hernández Folch nació en 1978 en Valencia. Tenía 14 años cuando desapareció. Era hija de Vicente Hernández y Rosa Folch, y tenía una hermana mayor.

Estudiaba en el Instituto de Educación Secundaria de Alcàsser y era parte del grupo inseparable de cuatro amigas. Era una adolescente activa; la noche de su desaparición tenía preparada una bolsa deportiva para ir a patinar a la mañana siguiente.

El viernes 13 de noviembre de 1992, Desirée y sus amigas visitaron a Esther antes de ir a la discoteca Coolor. Esther estaba enferma y no las acompañó. Las tres amigas decidieron hacer autostop. Nunca llegaron a su destino.

Su padre Vicente falleció en 1994, sin ver el final del juicio. Su madre Rosa ha mantenido una dignidad silenciosa, eligiendo recordar a su hija en privado.`,

      lifeSummary: 'Adolescente de 14 años de Alcàsser, activa y con planes de futuro. La noche que desapareció tenía preparada la bolsa para ir a patinar al día siguiente. Su madre Rosa Folch es símbolo del duelo digno y silencioso.',

      // Imagen
      imageSource: 'Archivo familiar vía El País / RTVE'
    }
  })

  console.log(`✓ Desirée Hernández Folch - ${desiree.count} registro(s) actualizado(s)`)

  // ============================================================================
  // RESUMEN
  // ============================================================================

  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log('  RESUMEN')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`Total de registros actualizados: ${miriam.count + toni.count + desiree.count}`)
  console.log('\nCampos actualizados por víctima:')
  console.log('  - Información básica (nombre, fecha nacimiento, lugar)')
  console.log('  - Familia (padres, hermanos, contexto familiar)')
  console.log('  - Educación (instituto, detalles)')
  console.log('  - Personalidad (carácter, hobbies, vida social)')
  console.log('  - Último día (cronología detallada)')
  console.log('  - Legado (cómo las recuerdan, memorial)')
  console.log('  - Biografía completa para la web')
  console.log('\n═══════════════════════════════════════════════════════════════')
}

updateAlcasserVictims()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
