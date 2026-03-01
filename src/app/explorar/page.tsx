import { Suspense } from 'react'
import prisma from '@/lib/prisma'
import CaseCard from '@/components/CaseCard'
import type { Case } from '@/lib/types'
import type { Metadata } from 'next'
import ExploreFilters from './ExploreFilters'

export const metadata: Metadata = {
  title: 'Explorar Casos',
  description: 'Explora nuestra coleccion completa de casos reales con filtros avanzados.',
}

interface SearchParams {
  status?: string
  type?: string
  country?: string
  year?: string
  sort?: string
  page?: string
}

async function getCases(searchParams: SearchParams) {
  const status = searchParams.status
  const type = searchParams.type
  const country = searchParams.country
  const year = searchParams.year ? parseInt(searchParams.year) : undefined
  const sortBy = searchParams.sort || 'recent'
  const page = parseInt(searchParams.page || '1')
  const limit = 12

  const where: {
    status?: string
    type?: string
    country?: { contains: string }
    year?: number
  } = {}

  if (status) where.status = status
  if (type) where.type = type
  if (country) where.country = { contains: country }
  if (year) where.year = year

  type OrderBy = { createdAt?: 'desc' | 'asc'; viewCount?: 'desc' | 'asc'; year?: 'desc' | 'asc'; title?: 'asc' | 'desc' }
  let orderBy: OrderBy = {}
  switch (sortBy) {
    case 'views':
      orderBy = { viewCount: 'desc' }
      break
    case 'year':
      orderBy = { year: 'desc' }
      break
    case 'alphabetical':
      orderBy = { title: 'asc' }
      break
    case 'recent':
    default:
      orderBy = { createdAt: 'desc' }
  }

  const [cases, total] = await Promise.all([
    prisma.case.findMany({
      where,
      include: { victims: true },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.case.count({ where }),
  ])

  return {
    cases: cases.map(c => ({
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
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

async function getFilterOptions() {
  const [countries, years] = await Promise.all([
    prisma.case.findMany({
      select: { country: true },
      distinct: ['country'],
      orderBy: { country: 'asc' },
    }),
    prisma.case.findMany({
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    }),
  ])

  return {
    countries: countries.map(c => c.country),
    years: years.map(y => y.year),
  }
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const [{ cases, total, page, totalPages }, filterOptions] = await Promise.all([
    getCases(params),
    getFilterOptions(),
  ])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-8 md:py-12" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Explorar Casos</h1>
          <p style={{ color: 'var(--muted)' }}>
            {total} casos encontrados
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Suspense fallback={<div className="skeleton h-96 rounded-xl" />}>
              <ExploreFilters
                currentParams={params}
                countries={filterOptions.countries}
                years={filterOptions.years}
              />
            </Suspense>
          </aside>

          {/* Cases grid */}
          <div className="flex-1">
            {cases.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cases.map((caseData) => (
                    <CaseCard key={caseData.id} caseData={caseData} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    {page > 1 && (
                      <a
                        href={`/explorar?${new URLSearchParams({ ...params, page: String(page - 1) }).toString()}`}
                        className="px-4 py-2 rounded-lg font-medium transition-colors"
                        style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                      >
                        Anterior
                      </a>
                    )}
                    <span className="px-4 py-2" style={{ color: 'var(--muted)' }}>
                      Pagina {page} de {totalPages}
                    </span>
                    {page < totalPages && (
                      <a
                        href={`/explorar?${new URLSearchParams({ ...params, page: String(page + 1) }).toString()}`}
                        className="px-4 py-2 rounded-lg font-medium transition-colors"
                        style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                      >
                        Siguiente
                      </a>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No se encontraron casos</h3>
                <p style={{ color: 'var(--muted)' }}>Intenta ajustar los filtros de busqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
