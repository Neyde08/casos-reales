interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4 border',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-2',
}

export default function LoadingSpinner({ size = 'md', text, className = '' }: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`${sizeClasses[size]} rounded-full animate-spin`}
        style={{
          borderColor: 'var(--card-border)',
          borderTopColor: 'var(--accent)',
        }}
      />
      {text && (
        <span className="text-sm" style={{ color: 'var(--muted)' }}>
          {text}
        </span>
      )}
      <span className="sr-only">{text || 'Cargando...'}</span>
    </div>
  )
}

export function LoadingDots({ className = '' }: { className?: string }) {
  return (
    <div className={`loading-dots ${className}`} role="status" aria-live="polite">
      <span />
      <span />
      <span />
      <span className="sr-only">Cargando...</span>
    </div>
  )
}

export function LoadingOverlay({ text = 'Cargando...' }: { text?: string }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      role="dialog"
      aria-modal="true"
      aria-label={text}
    >
      <div
        className="rounded-2xl p-8 flex flex-col items-center gap-4"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        <LoadingSpinner size="lg" />
        <span className="font-medium">{text}</span>
      </div>
    </div>
  )
}
