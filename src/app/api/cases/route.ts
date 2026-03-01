import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const query = searchParams.get('q')?.toLowerCase().trim()
  const status = searchParams.get('status')
  const type = searchParams.get('type')
  const country = searchParams.get('country')
  const year = searchParams.get('year')
  const yearFrom = searchParams.get('yearFrom')
  const yearTo = searchParams.get('yearTo')
  const sortBy = searchParams.get('sort') || 'recent'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')

  try {
    const where: Prisma.CaseWhereInput = {}

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { summary: { contains: query } },
        { country: { contains: query } },
        { city: { contains: query } },
        {
          victims: {
            some: {
              OR: [
                { fullName: { contains: query } },
                { aliases: { contains: query } },
              ],
            },
          },
        },
      ]
    }

    if (status) {
      where.status = status
    }

    if (type) {
      where.type = type
    }

    if (country) {
      where.country = { contains: country }
    }

    if (year) {
      where.year = parseInt(year)
    } else {
      if (yearFrom) {
        where.year = { ...((where.year as object) || {}), gte: parseInt(yearFrom) }
      }
      if (yearTo) {
        where.year = { ...((where.year as object) || {}), lte: parseInt(yearTo) }
      }
    }

    let orderBy: Prisma.CaseOrderByWithRelationInput = {}
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
        include: {
          victims: true,
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.case.count({ where }),
    ])

    const parsedCases = cases.map(c => ({
      ...c,
      gallery: c.gallery ? JSON.parse(c.gallery) : null,
      tags: c.tags ? JSON.parse(c.tags) : null,
      victims: c.victims.map(v => ({
        ...v,
        aliases: v.aliases ? JSON.parse(v.aliases) : null,
        familyQuotes: v.familyQuotes ? JSON.parse(v.familyQuotes) : null,
        friendsQuotes: v.friendsQuotes ? JSON.parse(v.friendsQuotes) : null,
        additionalPhotos: v.additionalPhotos ? JSON.parse(v.additionalPhotos) : null,
      })),
    }))

    return NextResponse.json({
      cases: parsedCases,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Cases API error:', error)
    return NextResponse.json({ error: 'Error al obtener casos' }, { status: 500 })
  }
}
