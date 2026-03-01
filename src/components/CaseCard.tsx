import Link from 'next/link'
import type { Case } from '@/lib/types'

interface CaseCardProps {
  caseData: Case
  featured?: boolean
}

export default function CaseCard({ caseData, featured = false }: CaseCardProps) {
  const statusLabel = caseData.status === 'SOLVED' ? 'Resuelto' : 'Sin resolver'
  const statusClass = caseData.status === 'SOLVED' ? 'badge-solved' : 'badge-unsolved'

  const typeLabels: Record<string, string> = {
    HOMICIDE: 'Homicidio',
    DISAPPEARANCE: 'Desaparición',
    SERIAL_KILLER: 'Asesino Serial',
    COLD_CASE: 'Caso Frío',
    KIDNAPPING: 'Secuestro',
    OTHER: 'Otro'
  }

  const typeColors: Record<string, string> = {
    HOMICIDE: 'var(--accent)',
    DISAPPEARANCE: 'var(--warning)',
    SERIAL_KILLER: '#9333ea',
    COLD_CASE: '#3b82f6',
    KIDNAPPING: '#ec4899',
    OTHER: 'var(--muted)'
  }

  const victimNames = caseData.victims?.map(v => v.fullName).join(', ') || 'Desconocido'
  const hasImage = caseData.mainImageUrl && (caseData.mainImageUrl.startsWith('http') || caseData.mainImageUrl.startsWith('/'))

  return (
    <Link
      href={`/casos/${caseData.slug}`}
      className="block group perspective-1000 h-full focus-ring"
      aria-label={`Ver caso: ${caseData.title}. ${statusLabel}. ${caseData.year}, ${caseData.country}`}
    >
      <article
        className={`card-3d card-shine touch-ripple rounded-2xl overflow-hidden border h-full flex flex-col ${
          featured ? 'ring-2 ring-[var(--accent)] ring-opacity-30 glow-border' : ''
        }`}
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {hasImage ? (
            <img
              src={caseData.mainImageUrl!}
              alt={caseData.title}
              className="w-full h-full object-cover img-zoom-blur"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 image-placeholder">
              <svg className="w-20 h-20 opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}

          {/* Gradient overlay with animation */}
          <div
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)'
            }}
          />

          {/* Hover glow effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 100%, ${typeColors[caseData.type]}30 0%, transparent 60%)`
            }}
          />

          {/* Status badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className={`badge ${statusClass} transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
              {statusLabel}
            </span>
          </div>

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="badge transition-all duration-500 group-hover:scale-105" style={{ background: 'var(--gradient-accent)', color: 'white' }}>
                <svg className="w-3 h-3 mr-1 animate-heartbeat" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Destacado
              </span>
            </div>
          )}

          {/* Year & Location overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1.5 rounded-lg text-sm font-bold backdrop-blur-md transition-all duration-300 group-hover:scale-105"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white' }}
              >
                {caseData.year}
              </span>
              <span
                className="px-3 py-1.5 rounded-lg text-sm backdrop-blur-md flex items-center gap-1.5 transition-all duration-300 group-hover:scale-105"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white' }}
              >
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {caseData.country}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col relative">
          {/* Background decoration on hover */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-2xl pointer-events-none"
            style={{ backgroundColor: typeColors[caseData.type] }}
          />

          {/* Type badge */}
          <div className="mb-3 flex items-center gap-2">
            <span
              className="inline-flex items-center text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm"
              style={{
                backgroundColor: `${typeColors[caseData.type] || 'var(--muted)'}18`,
                color: typeColors[caseData.type] || 'var(--muted)'
              }}
            >
              <span
                className="w-2 h-2 rounded-full mr-2 transition-transform duration-500 group-hover:scale-125"
                style={{ backgroundColor: typeColors[caseData.type] || 'var(--muted)' }}
              />
              {typeLabels[caseData.type] || caseData.type}
            </span>
          </div>

          {/* Title - fixed height for 2 lines */}
          <h3 className="font-bold text-lg mb-3 line-clamp-2 min-h-[3.5rem] transition-all duration-300 group-hover:text-[var(--accent)]">
            {caseData.title}
          </h3>

          {/* Victim - fixed height */}
          <div className="flex items-start gap-2.5 mb-3 min-h-[1.75rem]">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white"
              style={{ backgroundColor: 'var(--input-bg)' }}
            >
              <svg className="w-4 h-4 transition-colors duration-300" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-sm line-clamp-1 font-medium transition-colors duration-300" style={{ color: 'var(--muted)' }}>
              {victimNames}
            </p>
          </div>

          {/* Summary - fixed height for 2 lines */}
          <p className="text-sm line-clamp-2 min-h-[2.75rem] leading-relaxed transition-colors duration-300" style={{ color: 'var(--muted)' }}>
            {caseData.summary}
          </p>

          {/* Spacer to push footer to bottom */}
          <div className="flex-1" />

          {/* Footer - always at bottom */}
          <div
            className="mt-4 pt-4 border-t flex items-center justify-between transition-all duration-300"
            style={{ borderColor: 'var(--card-border)' }}
          >
            <span className="flex items-center gap-1.5 text-xs transition-all duration-300 group-hover:text-[var(--foreground)]" style={{ color: 'var(--muted)' }}>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {caseData.viewCount.toLocaleString()}
            </span>
            <span
              className="flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
              style={{ color: 'var(--accent)' }}
            >
              Leer más
              <svg className="w-4 h-4 transition-all duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
