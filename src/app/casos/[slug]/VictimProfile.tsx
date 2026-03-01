import type { Victim } from '@/lib/types'

interface VictimProfileProps {
  victim: Victim
}

const monthNames = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

function formatDate(date: Date | string | null): string {
  if (!date) return 'Desconocido'
  // Usar string ISO para evitar problemas de hidratación
  const dateStr = typeof date === 'string' ? date : date.toISOString()
  const [yearStr, monthStr, dayStr] = dateStr.split('T')[0].split('-')
  const day = parseInt(dayStr, 10)
  const monthIndex = parseInt(monthStr, 10) - 1
  const year = parseInt(yearStr, 10)
  return `${day} de ${monthNames[monthIndex]} de ${year}`
}

export default function VictimProfile({ victim }: VictimProfileProps) {
  // Verificar si hay informacion expandida disponible
  const hasExpandedInfo = !!(
    victim.parents ||
    victim.siblings ||
    victim.familyBackground ||
    victim.education ||
    victim.personality ||
    victim.hobbies ||
    victim.lastSeenDetails ||
    victim.legacy ||
    victim.lifeSummary
  )

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
    >
      {/* Cabecera con info basica */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar / Imagen */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full image-placeholder flex items-center justify-center flex-shrink-0 overflow-hidden">
            {victim.imageUrl ? (
              <img
                src={victim.imageUrl}
                alt={victim.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg className="w-10 h-10 opacity-30" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>

          {/* Nombre y estado */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-2xl font-bold">{victim.fullName}</h3>
            {victim.aliases && victim.aliases.length > 0 && (
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                Conocido/a como: {victim.aliases.join(', ')}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              <span
                className={`badge ${
                  victim.status === 'DECEASED' ? 'badge-unsolved' :
                  victim.status === 'MISSING' ? 'badge-missing' : 'badge-solved'
                }`}
              >
                {victim.status === 'DECEASED' ? 'Fallecido/a' :
                 victim.status === 'MISSING' ? 'Desaparecido/a' : 'Sobreviviente'}
              </span>
              {victim.ageAtDeathOrMissing && (
                <span className="badge" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--foreground)' }}>
                  {victim.ageAtDeathOrMissing} anos
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Datos basicos en grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
          {victim.birthDate && (
            <div>
              <span className="block text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>Nacimiento</span>
              <p className="font-medium">{formatDate(victim.birthDate)}</p>
            </div>
          )}
          {victim.birthPlace && (
            <div>
              <span className="block text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>Lugar</span>
              <p className="font-medium">{victim.birthPlace}</p>
            </div>
          )}
          {victim.occupation && (
            <div>
              <span className="block text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>Ocupacion</span>
              <p className="font-medium">{victim.occupation}</p>
            </div>
          )}
          {victim.lastSeenDate && (
            <div>
              <span className="block text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>Ultima vez visto/a</span>
              <p className="font-medium">{formatDate(victim.lastSeenDate)}</p>
            </div>
          )}
        </div>

        {/* Resumen de vida */}
        {victim.lifeSummary && (
          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            {victim.lifeSummary}
          </p>
        )}
      </div>

      {/* Contenido completo - siempre visible */}
      {hasExpandedInfo && (
        <div
          className="border-t px-6 py-6 space-y-8"
          style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--background)' }}
        >
          {/* QUIEN ERA - Personalidad */}
          {(victim.personality || victim.hobbies || victim.talents || victim.accomplishments) && (
            <section>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
                Quien era
              </h4>
              <div className="space-y-4">
                {victim.personality && (
                  <div>
                    <p className="text-sm leading-relaxed">{victim.personality}</p>
                  </div>
                )}
                {victim.hobbies && (
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--muted)' }}>Pasatiempos:</span>
                    <p className="text-sm">{victim.hobbies}</p>
                  </div>
                )}
                {victim.talents && (
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--muted)' }}>Talentos:</span>
                    <p className="text-sm">{victim.talents}</p>
                  </div>
                )}
                {victim.accomplishments && (
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--muted)' }}>Logros:</span>
                    <p className="text-sm">{victim.accomplishments}</p>
                  </div>
                )}
                {victim.dreams && (
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--muted)' }}>Suenos:</span>
                    <p className="text-sm">{victim.dreams}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* FAMILIA */}
          {(victim.parents || victim.siblings || victim.familyBackground) && (
            <section>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                Familia
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {victim.parents && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Padres</span>
                    <p className="text-sm mt-1">{victim.parents}</p>
                    {victim.parentsOccupation && (
                      <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{victim.parentsOccupation}</p>
                    )}
                  </div>
                )}
                {victim.siblings && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Hermanos</span>
                    <p className="text-sm mt-1">{victim.siblings}</p>
                  </div>
                )}
              </div>
              {victim.familyBackground && (
                <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {victim.familyBackground}
                </p>
              )}
            </section>
          )}

          {/* EDUCACION Y TRABAJO */}
          {(victim.education || victim.educationDetails || victim.careerDreams) && (
            <section>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </span>
                Educacion
              </h4>
              <div className="space-y-3">
                {victim.education && (
                  <p className="text-sm"><span className="font-medium">Estudios:</span> {victim.education}</p>
                )}
                {victim.educationDetails && (
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>{victim.educationDetails}</p>
                )}
                {victim.careerDreams && (
                  <p className="text-sm"><span className="font-medium">Aspiraciones:</span> {victim.careerDreams}</p>
                )}
              </div>
            </section>
          )}

          {/* VIDA SOCIAL */}
          {(victim.socialLife || victim.bestFriends || victim.relationship) && (
            <section>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                Vida Social
              </h4>
              <div className="space-y-3">
                {victim.socialLife && (
                  <p className="text-sm">{victim.socialLife}</p>
                )}
                {victim.bestFriends && (
                  <p className="text-sm"><span className="font-medium">Amigos cercanos:</span> {victim.bestFriends}</p>
                )}
                {victim.relationship && (
                  <p className="text-sm"><span className="font-medium">Relacion:</span> {victim.relationship}</p>
                )}
              </div>
            </section>
          )}

          {/* EL ULTIMO DIA */}
          {(victim.lastSeenDetails || victim.lastKnownActivities || victim.lastSeenWearing) && (
            <section>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--warning)', color: 'black' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                El ultimo dia
              </h4>
              <div
                className="p-4 rounded-lg space-y-3"
                style={{ backgroundColor: 'var(--card-bg)', borderLeft: '3px solid var(--warning)' }}
              >
                {victim.lastSeenPlace && (
                  <p className="text-sm">
                    <span className="font-medium">Lugar:</span> {victim.lastSeenPlace}
                  </p>
                )}
                {victim.lastSeenWearing && (
                  <p className="text-sm">
                    <span className="font-medium">Vestimenta:</span> {victim.lastSeenWearing}
                  </p>
                )}
                {victim.lastSeenDetails && (
                  <p className="text-sm leading-relaxed">{victim.lastSeenDetails}</p>
                )}
                {victim.lastKnownActivities && (
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>Actividades:</span> {victim.lastKnownActivities}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* TESTIMONIOS */}
          {(victim.familyQuotes && victim.familyQuotes.length > 0) && (
            <section>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
                Lo que dicen de el/ella
              </h4>
              <div className="space-y-4">
                {victim.familyQuotes.map((quote, index) => (
                  <blockquote
                    key={index}
                    className="p-4 rounded-lg italic"
                    style={{ backgroundColor: 'var(--card-bg)', borderLeft: '3px solid var(--accent)' }}
                  >
                    <p className="text-sm">"{quote.quote}"</p>
                    <footer className="mt-2 text-xs" style={{ color: 'var(--muted)' }}>
                      - {quote.author}{quote.relation && `, ${quote.relation}`}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          )}

          {/* LEGADO */}
          {(victim.legacy || victim.memorialInfo) && (
            <section>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--success)', color: 'white' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </span>
                Legado
              </h4>
              <div className="space-y-3">
                {victim.legacy && (
                  <p className="text-sm leading-relaxed">{victim.legacy}</p>
                )}
                {victim.memorialInfo && (
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>{victim.memorialInfo}</p>
                )}
                {victim.memorialUrl && (
                  <a
                    href={victim.memorialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: 'var(--accent)' }}
                  >
                    Visitar memorial
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </section>
          )}

          {/* BIOGRAFIA COMPLETA */}
          {victim.biography && (
            <section>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                Historia de vida
              </h4>
              <div
                className="prose prose-sm max-w-none"
                style={{ color: 'var(--foreground)' }}
              >
                {victim.biography.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-sm leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Fuente de imagen */}
          {victim.imageSource && (
            <p className="text-xs pt-4 border-t" style={{ color: 'var(--muted)', borderColor: 'var(--card-border)' }}>
              Fuente de imagen: {victim.imageSource}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
