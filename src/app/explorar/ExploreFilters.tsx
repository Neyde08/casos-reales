'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

interface ExploreFiltersProps {
  currentParams: {
    status?: string
    type?: string
    country?: string
    year?: string
    sort?: string
  }
  countries: string[]
  years: number[]
}

export default function ExploreFilters({ currentParams, countries, years }: ExploreFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const statusOptions = [
    { value: '', label: 'Todos' },
    { value: 'SOLVED', label: 'Resueltos' },
    { value: 'UNSOLVED', label: 'Sin resolver' },
  ]

  const typeOptions = [
    { value: '', label: 'Todos' },
    { value: 'HOMICIDE', label: 'Homicidio' },
    { value: 'DISAPPEARANCE', label: 'Desaparicion' },
    { value: 'SERIAL_KILLER', label: 'Asesino Serial' },
    { value: 'COLD_CASE', label: 'Caso Frio' },
    { value: 'KIDNAPPING', label: 'Secuestro' },
    { value: 'OTHER', label: 'Otro' },
  ]

  const sortOptions = [
    { value: 'recent', label: 'Mas recientes' },
    { value: 'views', label: 'Mas vistos' },
    { value: 'year', label: 'Por ano' },
    { value: 'alphabetical', label: 'Alfabetico' },
  ]

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams()

    Object.entries(currentParams).forEach(([k, v]) => {
      if (v && k !== key && k !== 'page') {
        params.set(k, v)
      }
    })

    if (value) {
      params.set(key, value)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push(pathname)
  }

  const hasFilters = currentParams.status || currentParams.type || currentParams.country || currentParams.year

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Status filter */}
      <div>
        <h3 className="font-semibold mb-3">Estado</h3>
        <div className="space-y-2">
          {statusOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value={option.value}
                checked={(currentParams.status || '') === option.value}
                onChange={(e) => updateFilter('status', e.target.value)}
                className="w-4 h-4"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type filter */}
      <div>
        <h3 className="font-semibold mb-3">Tipo</h3>
        <div className="space-y-2">
          {typeOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={option.value}
                checked={(currentParams.type || '') === option.value}
                onChange={(e) => updateFilter('type', e.target.value)}
                className="w-4 h-4"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Country filter */}
      <div>
        <h3 className="font-semibold mb-3">Pais</h3>
        <select
          value={currentParams.country || ''}
          onChange={(e) => updateFilter('country', e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm border"
          style={{
            backgroundColor: 'var(--input-bg)',
            borderColor: 'var(--input-border)',
            color: 'var(--foreground)',
          }}
        >
          <option value="">Todos los paises</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Year filter */}
      <div>
        <h3 className="font-semibold mb-3">Ano</h3>
        <select
          value={currentParams.year || ''}
          onChange={(e) => updateFilter('year', e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm border"
          style={{
            backgroundColor: 'var(--input-bg)',
            borderColor: 'var(--input-border)',
            color: 'var(--foreground)',
          }}
        >
          <option value="">Todos los anos</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold mb-3">Ordenar por</h3>
        <select
          value={currentParams.sort || 'recent'}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm border"
          style={{
            backgroundColor: 'var(--input-bg)',
            borderColor: 'var(--input-border)',
            color: 'var(--foreground)',
          }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'white',
          }}
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile filter button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 px-4 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium"
        style={{ backgroundColor: 'var(--accent)', color: 'white' }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
      </button>

      {/* Mobile filter modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-auto rounded-t-2xl p-6"
            style={{ backgroundColor: 'var(--card-bg)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Filtros</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full"
                style={{ backgroundColor: 'var(--input-bg)' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        className="hidden lg:block p-6 rounded-xl sticky top-24"
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
        }}
      >
        <h2 className="text-xl font-bold mb-6">Filtros</h2>
        <FilterContent />
      </div>
    </>
  )
}
