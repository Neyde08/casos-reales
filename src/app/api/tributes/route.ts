import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST - Crear un nuevo tributo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { victimId, name, message, country, candle } = body

    if (!victimId) {
      return NextResponse.json(
        { error: 'victimId es requerido' },
        { status: 400 }
      )
    }

    // Verificar que la víctima existe
    const victim = await prisma.victim.findUnique({
      where: { id: victimId },
    })

    if (!victim) {
      return NextResponse.json(
        { error: 'Victima no encontrada' },
        { status: 404 }
      )
    }

    // Crear el tributo
    const tribute = await prisma.tribute.create({
      data: {
        victimId,
        name: name || null,
        message: message || null,
        country: country || null,
        candle: candle ?? true,
      },
    })

    // Incrementar el contador de tributos en la víctima
    await prisma.victim.update({
      where: { id: victimId },
      data: { tributeCount: { increment: 1 } },
    })

    return NextResponse.json(tribute, { status: 201 })
  } catch (error) {
    console.error('Error al crear tributo:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// GET - Obtener tributos de una víctima
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const victimId = searchParams.get('victimId')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!victimId) {
      return NextResponse.json(
        { error: 'victimId es requerido' },
        { status: 400 }
      )
    }

    const [tributes, total] = await Promise.all([
      prisma.tribute.findMany({
        where: { victimId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.tribute.count({
        where: { victimId },
      }),
    ])

    return NextResponse.json({
      tributes,
      total,
      hasMore: offset + tributes.length < total,
    })
  } catch (error) {
    console.error('Error al obtener tributos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
