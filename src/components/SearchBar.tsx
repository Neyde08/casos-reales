'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface SearchSuggestion {
  id: string
  slug: string
  title: string
  victimName?: string
  type: 'case' | 'victim'
}

interface SearchBarProps {
  size?: 'small' | 'large'
  placeholder?: string
}

export default function SearchBar({ size = 'small', placeholder = 'Buscar casos o victimas...' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setSuggestions(data.suggestions || [])
          setIsOpen(true)
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          router.push(`/casos/${suggestions[selectedIndex].slug}`)
          setIsOpen(false)
          setQuery('')
        } else if (query.length >= 2) {
          router.push(`/buscar?q=${encodeURIComponent(query)}`)
          setIsOpen(false)
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.length >= 2) {
      router.push(`/buscar?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  const isLarge = size === 'large'

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative group">
          {/* Search icon */}
          <div className={`absolute left-4 ${isLarge ? 'top-5' : 'top-3'} pointer-events-none`}>
            <svg
              className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'} transition-colors duration-300`}
              style={{ color: 'var(--muted)' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`
              w-full border-2 transition-all duration-300
              focus:ring-0 focus:border-[var(--accent)]
              ${isLarge ? 'pl-12 pr-14 py-4 text-lg rounded-2xl' : 'pl-10 pr-12 py-2.5 text-sm rounded-xl'}
            `}
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
              color: 'var(--foreground)',
              boxShadow: 'var(--shadow-sm)'
            }}
            aria-label="Buscar"
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-expanded={isOpen}
          />

          {/* Submit button */}
          <button
            type="submit"
            className={`
              absolute right-2 transition-all duration-300 rounded-xl
              hover:scale-105 active:scale-95
              ${isLarge ? 'top-2 p-3' : 'top-1.5 p-2'}
            `}
            style={{ background: 'var(--gradient-accent)', color: 'white', boxShadow: '0 2px 8px var(--accent-glow)' }}
            aria-label="Buscar"
          >
            {isLoading ? (
              <svg className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'} animate-spin`} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul
          id="search-suggestions"
          className="absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-50 max-h-80 overflow-auto animate-fade-in"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--shadow-xl)'
          }}
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.type}-${suggestion.id}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={`px-4 py-3.5 cursor-pointer transition-all duration-200 border-b last:border-b-0`}
              style={{
                borderColor: 'var(--card-border)',
                backgroundColor: index === selectedIndex ? 'var(--input-bg)' : 'transparent'
              }}
              onClick={() => {
                router.push(`/casos/${suggestion.slug}`)
                setIsOpen(false)
                setQuery('')
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: suggestion.type === 'victim' ? 'rgba(239, 68, 68, 0.1)' : 'var(--input-bg)',
                    color: suggestion.type === 'victim' ? 'var(--accent)' : 'var(--muted)'
                  }}
                >
                  {suggestion.type === 'victim' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{suggestion.title}</p>
                  {suggestion.victimName && (
                    <p className="text-sm truncate flex items-center gap-1" style={{ color: 'var(--muted)' }}>
                      <span>Victima:</span>
                      <span className="font-medium">{suggestion.victimName}</span>
                    </p>
                  )}
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-lg flex-shrink-0"
                  style={{
                    backgroundColor: suggestion.type === 'victim' ? 'rgba(239, 68, 68, 0.1)' : 'var(--input-bg)',
                    color: suggestion.type === 'victim' ? 'var(--accent)' : 'var(--muted)'
                  }}
                >
                  {suggestion.type === 'victim' ? 'Victima' : 'Caso'}
                </span>
              </div>
            </li>
          ))}

          {/* Search all link */}
          <li
            className="px-4 py-3 cursor-pointer transition-colors duration-200 border-t"
            style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--input-bg)' }}
            onClick={() => {
              router.push(`/buscar?q=${encodeURIComponent(query)}`)
              setIsOpen(false)
            }}
          >
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--accent)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-medium">Ver todos los resultados para "{query}"</span>
            </div>
          </li>
        </ul>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && suggestions.length === 0 && !isLoading && (
        <div
          className="absolute top-full left-0 right-0 mt-2 p-6 rounded-2xl border text-center animate-fade-in"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <svg className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium mb-1">No se encontraron resultados</p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Intenta con otros terminos de busqueda</p>
        </div>
      )}
    </div>
  )
}
