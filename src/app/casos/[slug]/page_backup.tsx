import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import type { Case, Victim, TimelineEvent, Suspect, Evidence, Source } from '@/lib/types'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getCase(slug: string) {
  const caseData = await prisma.case.findUnique({
    where: { slug },
    include: {
      victims: true,
      timelineEvents: { orderBy: { order: 'asc' } },
      suspects: true,
      evidences: true,
      sources: true,
    },
  })

  if (!caseData) return null

  // Increment view count
  await prisma.case.update({
    where: { id: caseData.id },
    data: { viewCount: { increment: 1 } },
  })

  return {
    ...caseData,
    gallery: caseData.gallery ? JSON.parse(caseData.gallery) : null,
    tags: caseData.tags ? JSON.parse(caseData.tags) : null,
    status: caseData.status as 'SOLVED' | 'UNSOLVED',
    type: caseData.type as Case['type'],
    victims: caseData.victims.map(v => ({
      ...v,
      aliases: v.aliases ? JSON.parse(v.aliases) : null,
      status: v.status as 'DECEASED' | 'MISSING' | 'SURVIVED',
    })) as Victim[],
    timelineEvents: caseData.timelineEvents as TimelineEvent[],
    suspects: caseData.suspects.map(s => ({
      ...s,
      aliases: s.aliases ? JSON.parse(s.aliases) : null,
      role: s.role as 'SUSPECT' | 'CONFIRMED_PERPETRATOR' | 'PERSON_OF_INTEREST',
    })) as Suspect[],
    evidences: caseData.evidences.map(e => ({
      ...e,
      type: e.type as Evidence['type'],
    })) as Evidence[],
    sources: caseData.sources.map(s => ({
      ...s,
      reliabilityTag: s.reliabilityTag as Source['reliabilityTag'],
    })) as Source[],
  } as Case
}

async function getSimilarCases(caseData: Case) {
  return prisma.case.findMany({
    where: {
      OR: [
        { type: caseData.type },
        { country: caseData.country },
      ],
      NOT: { id: caseData.id },
    },
    include: { victims: true },
    take: 3,
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const caseData = await getCase(slug)

  if (!caseData) {
    return { title: 'Caso no encontrado' }
  }

  return {
    title: caseData.title,
    description: caseData.summary,
    openGraph: {
      title: caseData.title,
      description: caseData.summary,
      type: 'article',
    },
  }
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params
  const caseData = await getCase(slug)

  if (!caseData) {
    notFound()
  }

  const similarCases = await getSimilarCases(caseData)
  const statusLabel = caseData.status === 'SOLVED' ? 'Resuelto' : 'Sin resolver'
  const statusClass = caseData.status === 'SOLVED' ? 'badge-solved' : 'badge-unsolved'

  const typeLabels: Record<string, string> = {
    HOMICIDE: 'Homicidio',
    DISAPPEARANCE: 'Desaparicion',
    SERIAL_KILLER: 'Asesino Serial',
    COLD_CASE: 'Caso Frio',
    KIDNAPPING: 'Secuestro',
    OTHER: 'Otro',
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Desconocido'
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative py-12 md:py-20" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" style={{ color: 'var(--muted)' }}>
            <Link href="/" className="hover:opacity-70">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/explorar" className="hover:opacity-70">Explorar</Link>
            <span className="mx-2">/</span>
            <span>{caseData.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Main info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`badge ${statusClass}`}>{statusLabel}</span>
                <span
                  className="badge"
                  style={{ backgroundColor: 'var(--input-bg)', color: 'var(--foreground)' }}
                >
                  {typeLabels[caseData.type]}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{caseData.title}</h1>
              <p className="text-lg mb-6" style={{ color: 'var(--muted)' }}>
                {caseData.summary}
              </p>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--muted)' }}>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {caseData.year}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {caseData.city ? `${caseData.city}, ` : ''}{caseData.country}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {caseData.viewCount.toLocaleString()} vistas
                </span>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="w-full md:w-80 aspect-video md:aspect-square rounded-xl image-placeholder flex items-center justify-center">
              <svg className="w-20 h-20 opacity-30" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Narrative content */}
            {caseData.content && (
              <section className="dossier-section">
                <h2 className="text-2xl font-bold mb-4">Historia del Caso</h2>
                <div
                  className="prose prose-lg max-w-none"
                  style={{ color: 'var(--foreground)' }}
                  dangerouslySetInnerHTML={{ __html: caseData.content.replace(/\n/g, '<br />').replace(/## /g, '<h3>').replace(/<h3>([^<]+)/g, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>') }}
                />
              </section>
            )}

            {/* Timeline */}
            {caseData.timelineEvents && caseData.timelineEvents.length > 0 && (
              <section className="dossier-section mt-12">
                <h2 className="text-2xl font-bold mb-6">Linea Temporal</h2>
                <div className="relative pl-8">
                  <div className="timeline-line" />
                  {caseData.timelineEvents.map((event, index) => (
                    <div key={event.id} className="relative mb-8 last:mb-0">
                      <div className="timeline-dot" style={{ top: '4px' }} />
                      <div className="ml-4">
                        <time className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                          {formatDate(event.date)}
                        </time>
                        <h3 className="font-semibold mt-1">{event.title}</h3>
                        {event.description && (
                          <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Victims */}
            {caseData.victims && caseData.victims.length > 0 && (
              <section className="dossier-section mt-12">
                <h2 className="text-2xl font-bold mb-6">Victima(s)</h2>
                <div className="grid gap-6">
                  {caseData.victims.map((victim) => (
                    <div
                      key={victim.id}
                      className="p-6 rounded-xl"
                      style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full image-placeholder flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 opacity-30" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold">{victim.fullName}</h3>
                          {victim.aliases && victim.aliases.length > 0 && (
                            <p className="text-sm" style={{ color: 'var(--muted)' }}>
                              Alias: {victim.aliases.join(', ')}
                            </p>
                          )}
                          <span
                            className={`badge mt-2 ${
                              victim.status === 'DECEASED' ? 'badge-unsolved' :
                              victim.status === 'MISSING' ? 'badge-missing' : 'badge-solved'
                            }`}
                          >
                            {victim.status === 'DECEASED' ? 'Fallecido/a' :
                             victim.status === 'MISSING' ? 'Desaparecido/a' : 'Sobreviviente'}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
                        {victim.birthDate && (
                          <div>
                            <span style={{ color: 'var(--muted)' }}>Nacimiento</span>
                            <p className="font-medium">{formatDate(victim.birthDate)}</p>
                          </div>
                        )}
                        {victim.birthPlace && (
                          <div>
                            <span style={{ color: 'var(--muted)' }}>Lugar de nacimiento</span>
                            <p className="font-medium">{victim.birthPlace}</p>
                          </div>
                        )}
                        {victim.occupation && (
                          <div>
                            <span style={{ color: 'var(--muted)' }}>Ocupacion</span>
                            <p className="font-medium">{victim.occupation}</p>
                          </div>
                        )}
                        {victim.ageAtDeathOrMissing && (
                          <div>
                            <span style={{ color: 'var(--muted)' }}>Edad</span>
                            <p className="font-medium">{victim.ageAtDeathOrMissing} anos</p>
                          </div>
                        )}
                        {victim.lastSeenDate && (
                          <div>
                            <span style={{ color: 'var(--muted)' }}>Ultima vez visto/a</span>
                            <p className="font-medium">{formatDate(victim.lastSeenDate)}</p>
                          </div>
                        )}
                        {victim.causeOfDeath && (
                          <div>
                            <span style={{ color: 'var(--muted)' }}>Causa de muerte</span>
                            <p className="font-medium">{victim.causeOfDeath}</p>
                          </div>
                        )}
                      </div>
                      {victim.biography && (
                        <p className="mt-4" style={{ color: 'var(--muted)' }}>{victim.biography}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Suspects */}
            {caseData.suspects && caseData.suspects.length > 0 && (
              <section className="dossier-section mt-12">
                <h2 className="text-2xl font-bold mb-6">
                  {caseData.status === 'SOLVED' ? 'Responsable' : 'Sospechosos'}
                </h2>
                <div className="grid gap-6">
                  {caseData.suspects.map((suspect) => (
                    <div
                      key={suspect.id}
                      className="p-6 rounded-xl"
                      style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{suspect.fullName}</h3>
                          <span
                            className={`badge mt-2 ${suspect.isConfirmed ? 'badge-solved' : ''}`}
                            style={!suspect.isConfirmed ? { backgroundColor: 'var(--warning)', color: 'black' } : {}}
                          >
                            {suspect.role === 'CONFIRMED_PERPETRATOR' ? 'Culpable confirmado' :
                             suspect.role === 'SUSPECT' ? 'Sospechoso' : 'Persona de interes'}
                          </span>
                        </div>
                      </div>
                      {suspect.description && (
                        <p className="mt-4" style={{ color: 'var(--muted)' }}>{suspect.description}</p>
                      )}
                      <div className="grid gap-3 mt-4 text-sm">
                        {suspect.method && (
                          <div>
                            <span className="font-medium">Modus Operandi: </span>
                            <span style={{ color: 'var(--muted)' }}>{suspect.method}</span>
                          </div>
                        )}
                        {suspect.pattern && (
                          <div>
                            <span className="font-medium">Patron: </span>
                            <span style={{ color: 'var(--muted)' }}>{suspect.pattern}</span>
                          </div>
                        )}
                        {suspect.convictionDetails && (
                          <div>
                            <span className="font-medium">Condena: </span>
                            <span style={{ color: 'var(--muted)' }}>{suspect.convictionDetails}</span>
                          </div>
                        )}
                        {suspect.sentence && (
                          <div>
                            <span className="font-medium">Sentencia: </span>
                            <span style={{ color: 'var(--muted)' }}>{suspect.sentence}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Evidence */}
            {caseData.evidences && caseData.evidences.length > 0 && (
              <section className="dossier-section mt-12">
                <h2 className="text-2xl font-bold mb-6">Evidencias</h2>
                <div className="grid gap-4">
                  {caseData.evidences.map((evidence) => (
                    <div
                      key={evidence.id}
                      className="p-4 rounded-xl flex items-start gap-4"
                      style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--input-bg)' }}
                      >
                        <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{evidence.title}</h3>
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--muted)' }}
                          >
                            {evidence.type}
                          </span>
                        </div>
                        {evidence.description && (
                          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                            {evidence.description}
                          </p>
                        )}
                      </div>
                      {evidence.credibilityScore && (
                        <div className="text-right">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <span
                                key={i}
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: i <= evidence.credibilityScore!
                                    ? 'var(--accent)'
                                    : 'var(--card-border)',
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-xs" style={{ color: 'var(--muted)' }}>
                            Credibilidad
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Sources */}
            {caseData.sources && caseData.sources.length > 0 && (
              <section className="dossier-section mt-12">
                <h2 className="text-2xl font-bold mb-6">Fuentes y Referencias</h2>
                <div className="grid gap-3">
                  {caseData.sources.map((source) => (
                    <div
                      key={source.id}
                      className="p-4 rounded-xl flex items-center gap-4"
                      style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                    >
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{source.title}</p>
                        {source.publisher && (
                          <p className="text-sm" style={{ color: 'var(--muted)' }}>
                            {source.publisher}
                            {source.date && ` - ${formatDate(source.date)}`}
                          </p>
                        )}
                      </div>
                      {source.reliabilityTag && (
                        <span
                          className="text-xs px-2 py-1 rounded flex-shrink-0"
                          style={{
                            backgroundColor: source.reliabilityTag === 'HIGH' ? 'var(--success)' :
                              source.reliabilityTag === 'MEDIUM' ? 'var(--warning)' : 'var(--muted)',
                            color: source.reliabilityTag === 'MEDIUM' ? 'black' : 'white',
                          }}
                        >
                          {source.reliabilityTag === 'HIGH' ? 'Alta' :
                           source.reliabilityTag === 'MEDIUM' ? 'Media' : 'Baja'}
                        </span>
                      )}
                      {source.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 p-2 rounded-lg transition-colors"
                          style={{ backgroundColor: 'var(--input-bg)' }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div
              className="sticky top-24 p-6 rounded-xl"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
            >
              <h3 className="font-bold mb-4">Indice</h3>
              <nav className="space-y-2 text-sm">
                {caseData.content && (
                  <a href="#" className="block py-1 transition-colors hover:opacity-70">Historia del Caso</a>
                )}
                {caseData.timelineEvents && caseData.timelineEvents.length > 0 && (
                  <a href="#" className="block py-1 transition-colors hover:opacity-70">Linea Temporal</a>
                )}
                {caseData.victims && caseData.victims.length > 0 && (
                  <a href="#" className="block py-1 transition-colors hover:opacity-70">Victima(s)</a>
                )}
                {caseData.suspects && caseData.suspects.length > 0 && (
                  <a href="#" className="block py-1 transition-colors hover:opacity-70">
                    {caseData.status === 'SOLVED' ? 'Responsable' : 'Sospechosos'}
                  </a>
                )}
                {caseData.evidences && caseData.evidences.length > 0 && (
                  <a href="#" className="block py-1 transition-colors hover:opacity-70">Evidencias</a>
                )}
                {caseData.sources && caseData.sources.length > 0 && (
                  <a href="#" className="block py-1 transition-colors hover:opacity-70">Fuentes</a>
                )}
              </nav>

              <hr className="my-6" style={{ borderColor: 'var(--card-border)' }} />

              <div className="space-y-3">
                <Link
                  href="/explorar"
                  className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ backgroundColor: 'var(--input-bg)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver a explorar
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar cases */}
        {similarCases.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Casos Similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCases.map((c) => {
                const caseForCard = {
                  ...c,
                  gallery: c.gallery ? JSON.parse(c.gallery) : null,
                  tags: c.tags ? JSON.parse(c.tags) : null,
                  status: c.status as 'SOLVED' | 'UNSOLVED',
                  type: c.type as Case['type'],
                  victims: c.victims.map(v => ({
                    ...v,
                    aliases: v.aliases ? JSON.parse(v.aliases) : null,
                    status: v.status as 'DECEASED' | 'MISSING' | 'SURVIVED',
                  })),
                }
                return (
                  <Link
                    key={c.id}
                    href={`/casos/${c.slug}`}
                    className="p-4 rounded-xl card-hover flex items-center gap-4"
                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                  >
                    <div className="w-16 h-16 rounded-lg image-placeholder flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 opacity-30" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{c.title}</h3>
                      <p className="text-sm truncate" style={{ color: 'var(--muted)' }}>
                        {c.year} - {c.country}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
