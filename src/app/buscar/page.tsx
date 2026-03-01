import { Suspense } from 'react'
import prisma from '@/lib/prisma'
import CaseCard from '@/components/CaseCard'
import SearchBar from '@/components/SearchBar'
import { normalizeForSearch } from '@/lib/normalize'
import type { Case } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar',
  description: 'Busca casos por nombre de victima, ubicacion o palabras clave.',
}

interface SearchParams {
  q?: string
}

async function searchCases(query: string) {
  if (!query || query.length < 2) {
    return []
  }

  const normalizedQuery = normalizeForSearch(query)

  const cases = await prisma.case.findMany({
    where: {
      OR: [
        // Campos normalizados (sin acentos)
        { titleSearch: { contains: normalizedQuery } },
        { countrySearch: { contains: normalizedQuery } },
        { citySearch: { contains: normalizedQuery } },
        // Fallback a campos originales
        { title: { contains: query } },
        { summary: { contains: query.toLowerCase() } },
        {
          victims: {
            some: {
              OR: [
                { fullNameSearch: { contains: normalizedQuery } },
                { fullName: { contains: query } },
                { aliases: { contains: query } },
              ],
            },
          },
        },
      ],
    },
    include: {
      victims: true,
    },
    orderBy: { viewCount: 'desc' },
    take: 20,
  })

  return cases.map(c => ({
    ...c,
    gallery: c.gallery ? JSON.parse(c.gallery) : null,
    tags: c.tags ? JSON.parse(c.tags) : null,
    status: c.status as 'SOLVED' | 'UNSOLVED',
    type: c.type as Case['type'],
    victims: c.victims.map(v => ({
      ...v,
      aliases: v.aliases ? JSON.parse(v.aliases) : null,
      familyQuotes: v.familyQuotes ? JSON.parse(v.familyQuotes) : null,
      friendsQuotes: v.friendsQuotes ? JSON.parse(v.friendsQuotes) : null,
      additionalPhotos: v.additionalPhotos ? JSON.parse(v.additionalPhotos) : null,
      status: v.status as 'DECEASED' | 'MISSING' | 'SURVIVED',
    })),
  }))
}

async function getRecentSearches() {
  // Get most viewed cases as suggestions
  const cases = await prisma.case.findMany({
    select: {
      slug: true,
      title: true,
      victims: {
        select: { fullName: true },
        take: 1,
      },
    },
    orderBy: { viewCount: 'desc' },
    take: 5,
  })

  return cases
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const query = params.q || ''
  const results = await searchCases(query)
  const popularCases = await getRecentSearches()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-12 md:py-20" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Buscar Casos</h1>
          <p className="mb-8" style={{ color: 'var(--muted)' }}>
            Busca por nombre de victima, ubicacion o cualquier palabra clave
          </p>
          <SearchBar size="large" placeholder="Escribe para buscar..." />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {query ? (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold">
                {results.length} resultado{results.length !== 1 ? 's' : ''} para &quot;{query}&quot;
              </h2>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((caseData) => (
                  <CaseCard key={caseData.id} caseData={caseData} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
                <p style={{ color: 'var(--muted)' }}>
                  Intenta con otros terminos de busqueda o revisa la ortografia
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <svg className="w-20 h-20 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p style={{ color: 'var(--muted)' }}>
                Escribe en el buscador para encontrar casos
              </p>
            </div>

            {/* Popular searches */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <h3 className="font-semibold mb-4">Casos populares</h3>
              <div className="space-y-3">
                {popularCases.map((c) => (
                  <a
                    key={c.slug}
                    href={`/casos/${c.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{ backgroundColor: 'var(--input-bg)' }}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{c.title}</p>
                      {c.victims[0] && (
                        <p className="text-sm truncate" style={{ color: 'var(--muted)' }}>
                          Victima: {c.victims[0].fullName}
                        </p>
                      )}
                    </div>
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Search tips */}
            <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <h3 className="font-semibold mb-4">Consejos de busqueda</h3>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--muted)' }}>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Busca por el nombre completo o parcial de la victima
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Puedes buscar por pais o ciudad
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  El buscador tolera pequenos errores de escritura
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Usa palabras clave como &quot;desaparicion&quot;, &quot;secuestro&quot;, etc.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
