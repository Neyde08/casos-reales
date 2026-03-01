import type { CaseImpact } from '@/lib/types'
import type { ReactNode } from 'react'

interface CaseImpactSectionProps {
  impact: CaseImpact
}

export default function CaseImpactSection({ impact }: CaseImpactSectionProps) {
  // Verificar si hay contenido para mostrar
  const hasLegislation = impact.legislationName || impact.legislationDesc
  const hasFoundation = impact.foundationName || impact.foundationDesc
  const hasCommunityImpact = impact.communityImpact || impact.awarenessEffect
  const hasMedia = impact.mediaAdaptations && impact.mediaAdaptations.length > 0
  const hasProceduralChanges = impact.proceduralChanges

  const hasAnyContent = hasLegislation || hasFoundation || hasCommunityImpact || hasMedia || hasProceduralChanges

  if (!hasAnyContent) return null

  const mediaTypeLabels: Record<string, string> = {
    documentary: 'Documental',
    movie: 'Pelicula',
    book: 'Libro',
    podcast: 'Podcast',
    series: 'Serie',
    other: 'Otro',
  }

  const mediaTypeIcons: Record<string, ReactNode> = {
    documentary: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    movie: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
    book: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    podcast: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    series: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    other: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  return (
    <section className="dossier-section mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--success)' }}
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Legado e Impacto</h2>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            El cambio positivo que genero este caso
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Legislacion */}
        {hasLegislation && (
          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)' }}
              >
                <svg className="w-6 h-6" style={{ color: 'var(--success)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">Cambio Legislativo</h3>
                  {impact.legislationYear && (
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: 'var(--success)', color: 'white' }}
                    >
                      {impact.legislationYear}
                    </span>
                  )}
                </div>
                {impact.legislationName && (
                  <p className="font-medium text-lg mb-2" style={{ color: 'var(--accent)' }}>
                    {impact.legislationName}
                  </p>
                )}
                {impact.legislationDesc && (
                  <p style={{ color: 'var(--muted)' }}>{impact.legislationDesc}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Fundacion */}
        {hasFoundation && (
          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              >
                <svg className="w-6 h-6" style={{ color: '#3b82f6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Fundacion en su Memoria</h3>
                {impact.foundationName && (
                  <p className="font-medium text-lg mb-2" style={{ color: '#3b82f6' }}>
                    {impact.foundationName}
                  </p>
                )}
                {impact.foundationDesc && (
                  <p className="mb-3" style={{ color: 'var(--muted)' }}>{impact.foundationDesc}</p>
                )}
                {impact.foundationUrl && (
                  <a
                    href={impact.foundationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ color: '#3b82f6' }}
                  >
                    Visitar sitio web
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Impacto comunitario */}
        {hasCommunityImpact && (
          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
              >
                <svg className="w-6 h-6" style={{ color: '#a855f7' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Impacto en la Comunidad</h3>
                {impact.communityImpact && (
                  <p className="mb-3" style={{ color: 'var(--muted)' }}>{impact.communityImpact}</p>
                )}
                {impact.awarenessEffect && (
                  <div
                    className="p-4 rounded-lg mt-3"
                    style={{ backgroundColor: 'var(--input-bg)' }}
                  >
                    <p className="text-sm font-medium mb-1">Concientizacion</p>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>{impact.awarenessEffect}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cambios procedimentales */}
        {hasProceduralChanges && (
          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
              >
                <svg className="w-6 h-6" style={{ color: '#f59e0b' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Cambios en Protocolos</h3>
                <p style={{ color: 'var(--muted)' }}>{impact.proceduralChanges}</p>
              </div>
            </div>
          </div>
        )}

        {/* Adaptaciones mediaticas */}
        {hasMedia && (
          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
              >
                <svg className="w-6 h-6" style={{ color: '#ec4899' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Adaptaciones Mediaticas</h3>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  Documentales, peliculas y libros sobre el caso
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {impact.mediaAdaptations!.map((media, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--input-bg)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ color: '#ec4899' }}
                  >
                    {mediaTypeIcons[media.type] || mediaTypeIcons.other}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{media.title}</p>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                      <span>{mediaTypeLabels[media.type] || 'Otro'}</span>
                      {media.year && (
                        <>
                          <span>-</span>
                          <span>{media.year}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {media.url && (
                    <a
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-colors flex-shrink-0"
                      style={{ backgroundColor: 'var(--card-bg)' }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
