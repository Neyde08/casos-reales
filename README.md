# Casos Reales

Plataforma web para explorar casos reales (resueltos y sin resolver) con una experiencia atractiva y moderna tipo dossier.

## Caracteristicas

- **Catalogo de casos** con imagenes, titulos y estado (Resuelto / Sin resolver)
- **Buscador avanzado** con autocompletado y tolerancia a errores
- **Filtros** por estado, tipo, pais, ano y mas
- **Pagina de detalle tipo dossier** con:
  - Datos de la victima
  - Linea temporal del caso
  - Evidencias clave
  - Sospechosos / responsable
  - Fuentes y referencias
- **Modo oscuro/claro**
- **Diseno responsivo** (mobile first)

## Stack Tecnologico

- **Frontend**: Next.js 14 + React 19 + TypeScript
- **Estilos**: Tailwind CSS 4
- **Base de datos**: SQLite (via Prisma ORM)
- **Despliegue**: Compatible con Vercel, Render, etc.

## Requisitos

- Node.js 18+
- npm o yarn

## Instalacion

1. Clonar el repositorio:
```bash
cd casos-reales
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (opcional, ya configurado para desarrollo):
```bash
# El archivo .env ya existe con la configuracion por defecto
# DATABASE_URL="file:./dev.db"
```

4. Ejecutar migraciones y seed:
```bash
npm run db:migrate
npm run db:seed
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

6. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila la aplicacion para produccion |
| `npm run start` | Inicia el servidor de produccion |
| `npm run db:migrate` | Ejecuta las migraciones de Prisma |
| `npm run db:seed` | Puebla la base de datos con datos de ejemplo |
| `npm run db:reset` | Resetea la base de datos |

## Estructura del Proyecto

```
casos-reales/
├── prisma/
│   ├── schema.prisma      # Esquema de la base de datos
│   ├── seed.ts            # Datos de ejemplo
│   └── migrations/        # Migraciones SQL
├── src/
│   ├── app/
│   │   ├── page.tsx       # Pagina principal (Home)
│   │   ├── explorar/      # Listado de casos con filtros
│   │   ├── buscar/        # Buscador avanzado
│   │   ├── casos/[slug]/  # Detalle de caso (dossier)
│   │   └── api/           # API endpoints
│   ├── components/        # Componentes reutilizables
│   └── lib/
│       ├── prisma.ts      # Cliente de Prisma
│       └── types.ts       # Tipos TypeScript
└── public/                # Archivos estaticos
```

## Modelo de Datos

### Case (Caso)
- `id`, `slug`, `title`, `summary`
- `status`: SOLVED | UNSOLVED
- `type`: HOMICIDE | DISAPPEARANCE | SERIAL_KILLER | COLD_CASE | KIDNAPPING | OTHER
- `year`, `country`, `city`
- `content`: Narrativa completa del caso
- `viewCount`, `featured`

### Victim (Victima)
- Datos personales: nombre, fecha de nacimiento, lugar, familia
- Educacion, ocupacion
- Estado: DECEASED | MISSING | SURVIVED
- Ultima vez vista, causa de muerte

### TimelineEvent (Evento de Linea Temporal)
- Fecha, titulo, descripcion
- Ordenado cronologicamente

### Suspect (Sospechoso)
- Nombre, rol (SUSPECT | CONFIRMED_PERPETRATOR)
- Modus operandi, patron
- Condena y sentencia (si aplica)

### Evidence (Evidencia)
- Titulo, descripcion
- Tipo: PHYSICAL | TESTIMONIAL | DIGITAL | FORENSIC | DOCUMENTARY
- Puntuacion de credibilidad

### Source (Fuente)
- Titulo, URL, editorial
- Etiqueta de confiabilidad: HIGH | MEDIUM | LOW

## Anadir Nuevos Casos

1. Editar `prisma/seed.ts` o crear un nuevo archivo seed
2. Seguir la estructura de los casos existentes
3. Ejecutar `npm run db:seed`

Alternativamente, puedes crear una API de administracion para agregar casos desde una interfaz.

## API Endpoints

| Endpoint | Metodo | Descripcion |
|----------|--------|-------------|
| `/api/cases` | GET | Lista casos con filtros y paginacion |
| `/api/search/suggestions` | GET | Sugerencias de autocompletado |

### Parametros de `/api/cases`

- `q`: Busqueda por texto
- `status`: SOLVED | UNSOLVED
- `type`: Tipo de caso
- `country`: Pais
- `year`: Ano especifico
- `sort`: recent | views | year | alphabetical
- `page`: Numero de pagina
- `limit`: Resultados por pagina

## Despliegue

### Vercel (Recomendado)

1. Conectar el repositorio a Vercel
2. Configurar variables de entorno si es necesario
3. Desplegar

### Otros Proveedores

1. Ejecutar `npm run build`
2. Configurar `DATABASE_URL` para produccion
3. Ejecutar `npm start`

## Disclaimer

Este contenido es de caracter informativo basado en fuentes publicas. Puede contener errores o informacion incompleta. No se pretende difamar ni asegurar culpabilidad mas alla de lo establecido judicialmente.

## Licencia

MIT
