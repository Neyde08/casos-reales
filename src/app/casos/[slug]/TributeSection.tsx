'use client'

import { useState, useEffect } from 'react'
import type { Tribute } from '@/lib/types'

interface TributeSectionProps {
  victimId: string
  victimName: string
  initialTributes: Tribute[]
  initialCount: number
}

export default function TributeSection({
  victimId,
  victimName,
  initialTributes,
  initialCount,
}: TributeSectionProps) {
  const [tributes, setTributes] = useState<Tribute[]>(initialTributes)
  const [totalCount, setTotalCount] = useState(initialCount)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    country: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/tributes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          victimId,
          name: formData.name || null,
          message: formData.message || null,
          country: formData.country || null,
          candle: true,
        }),
      })

      if (response.ok) {
        const newTribute = await response.json()
        setTributes([newTribute, ...tributes])
        setTotalCount(totalCount + 1)
        setSubmitted(true)
        setFormData({ name: '', message: '', country: '' })
        setTimeout(() => {
          setIsOpen(false)
          setSubmitted(false)
        }, 3000)
      }
    } catch (error) {
      console.error('Error al enviar tributo:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hoy'
    if (diffDays === 1) return 'Ayer'
    if (diffDays < 7) return `Hace ${diffDays} dias`
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div>
      {/* Header con contador */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
          >
            {/* Candle icon */}
            <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c.5 2.5-1.5 4-1.5 6 0 1.5 1 2.5 1.5 2.5s1.5-1 1.5-2.5c0-2-2-3.5-1.5-6z" />
              <path d="M10 10.5c0 1.5 1 2.5 2 2.5s2-1 2-2.5" opacity="0.7" />
              <rect x="10" y="13" width="4" height="9" rx="1" opacity="0.9" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">En su memoria</h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {totalCount === 0 ? 'Se el primero en dejar un tributo' :
               totalCount === 1 ? '1 persona ha honrado su memoria' :
               `${totalCount} personas han honrado su memoria`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
          style={{ backgroundColor: 'var(--accent)', color: 'white' }}
        >
          Encender vela
        </button>
      </div>

      {/* Lista de tributos con mensajes */}
      {tributes.filter(t => t.message).length > 0 && (
        <div className="space-y-3 mb-6">
          {tributes.filter(t => t.message).slice(0, 3).map((tribute) => (
            <div
              key={tribute.id}
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--input-bg)' }}
            >
              <p className="text-sm italic" style={{ color: 'var(--foreground)' }}>
                "{tribute.message}"
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: 'var(--muted)' }}>
                <span>{tribute.name || 'Anonimo'}</span>
                {tribute.country && (
                  <>
                    <span>-</span>
                    <span>{tribute.country}</span>
                  </>
                )}
                <span>-</span>
                <span>{formatDate(tribute.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Velas encendidas visuales */}
      {totalCount > 0 && (
        <div className="flex items-center gap-1 flex-wrap">
          {Array.from({ length: Math.min(totalCount, 20) }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 flex items-center justify-center animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <svg className="w-4 h-4" style={{ color: '#f59e0b' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c.5 2.5-1.5 4-1.5 6 0 1.5 1 2.5 1.5 2.5s1.5-1 1.5-2.5c0-2-2-3.5-1.5-6z" />
                <rect x="11" y="11" width="2" height="5" rx="0.5" opacity="0.6" />
              </svg>
            </div>
          ))}
          {totalCount > 20 && (
            <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>
              +{totalCount - 20} mas
            </span>
          )}
        </div>
      )}

      {/* Modal para dejar tributo */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => !isSubmitting && setIsOpen(false)}
          />

          {/* Modal content */}
          <div
            className="relative w-full max-w-md rounded-xl p-6 shadow-2xl"
            style={{ backgroundColor: 'var(--card-bg)' }}
          >
            {submitted ? (
              /* Success message */
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--success)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gracias por tu tributo</h3>
                <p style={{ color: 'var(--muted)' }}>
                  Tu vela ha sido encendida en memoria de {victimName}
                </p>
              </div>
            ) : (
              /* Form */
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Dejar un tributo</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg transition-colors"
                    style={{ backgroundColor: 'var(--input-bg)' }}
                    disabled={isSubmitting}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                  Enciende una vela virtual en memoria de <strong>{victimName}</strong>.
                  Puedes dejar un mensaje opcional.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Tu nombre <span style={{ color: 'var(--muted)' }}>(opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Anonimo"
                      className="w-full px-3 py-2 rounded-lg text-sm"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--card-border)',
                      }}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Mensaje <span style={{ color: 'var(--muted)' }}>(opcional)</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Escribe unas palabras en su memoria..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--card-border)',
                      }}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Pais <span style={{ color: 'var(--muted)' }}>(opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Ej: Argentina, Mexico, Espana..."
                      className="w-full px-3 py-2 rounded-lg text-sm"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--card-border)',
                      }}
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2c.5 2.5-1.5 4-1.5 6 0 1.5 1 2.5 1.5 2.5s1.5-1 1.5-2.5c0-2-2-3.5-1.5-6z" />
                          <rect x="10" y="11" width="4" height="7" rx="1" />
                        </svg>
                        Encender vela
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
