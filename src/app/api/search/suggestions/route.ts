import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeForSearch } from '@/lib/normalize'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.trim() || ''

  if (query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  // Normalizar busqueda (sin acentos, minusculas)
  const normalizedQuery = normalizeForSearch(query)

  try {
    // Search in cases usando campos normalizados
    const cases = await prisma.case.findMany({
      where: {
        OR: [
          { titleSearch: { contains: normalizedQuery } },
          { countrySearch: { contains: normalizedQuery } },
          { citySearch: { contains: normalizedQuery } },
          // Fallback a campos originales
          { title: { contains: query } },
          { country: { contains: query } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
      },
      take: 5,
    })

    // Search in victims usando campo normalizado
    const victims = await prisma.victim.findMany({
      where: {
        OR: [
          { fullNameSearch: { contains: normalizedQuery } },
          { fullName: { contains: query } },
          { aliases: { contains: query } },
        ],
      },
      select: {
        id: true,
        fullName: true,
        case: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
      take: 5,
    })

    const suggestions = [
      ...cases.map(c => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        type: 'case' as const,
      })),
      ...victims.map(v => ({
        id: v.id,
        slug: v.case.slug,
        title: v.case.title,
        victimName: v.fullName,
        type: 'victim' as const,
      })),
    ].slice(0, 8)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ suggestions: [], error: 'Error en la busqueda' }, { status: 500 })
  }
}
