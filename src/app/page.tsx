import Link from 'next/link'
import prisma from '@/lib/prisma'
import CaseCard from '@/components/CaseCard'
import SearchBar from '@/components/SearchBar'
import type { Case } from '@/lib/types'

async function getFeaturedCases(): Promise<Case[]> {
  const cases = await prisma.case.findMany({
    where: { featured: true },
    include: {
      victims: true,
    },
    orderBy: { viewCount: 'desc' },
    take: 4,
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

async function getRecentCases(): Promise<Case[]> {
  const cases = await prisma.case.findMany({
    include: {
      victims: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 4,
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

async function getStats() {
  const [totalCases, solvedCases, totalVictims] = await Promise.all([
    prisma.case.count(),
    prisma.case.count({ where: { status: 'SOLVED' } }),
    prisma.victim.count(),
  ])
  return { totalCases, solvedCases, totalVictims }
}

export default async function HomePage() {
  const [featuredCases, recentCases, stats] = await Promise.all([
    getFeaturedCases(),
    getRecentCases(),
    getStats(),
  ])

  const quickFilters = [
    { label: 'Resueltos', href: '/explorar?status=SOLVED', color: 'var(--success)' },
    { label: 'Sin Resolver', href: '/explorar?status=UNSOLVED', color: 'var(--accent)' },
    { label: 'Desapariciones', href: '/explorar?type=DISAPPEARANCE', color: 'var(--warning)' },
    { label: 'Casos Frios', href: '/explorar?type=COLD_CASE', color: '#3b82f6' },
    { label: 'Asesinos Seriales', href: '/explorar?type=SERIAL_KILLER', color: '#9333ea' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center hero-gradient overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Animated decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full opacity-30 blur-3xl animate-float-slow" style={{ background: 'var(--accent-glow)' }} />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float-slow" style={{ background: 'var(--accent-glow)', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl animate-float-slow" style={{ background: 'var(--accent-glow)', animationDelay: '4s' }} />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full opacity-40 animate-float-slow" style={{ background: 'var(--accent)', animationDuration: '6s' }} />
          <div className="absolute top-40 right-1/3 w-1.5 h-1.5 rounded-full opacity-30 animate-float-slow" style={{ background: 'var(--accent)', animationDuration: '8s', animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/5 w-2 h-2 rounded-full opacity-35 animate-float-slow" style={{ background: 'var(--accent)', animationDuration: '7s', animationDelay: '3s' }} />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full opacity-50 animate-float-slow" style={{ background: 'var(--accent)', animationDuration: '5s', animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge with pulse effect */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 animate-fade-in-up backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: 'rgba(var(--card-bg-rgb, 255, 255, 255), 0.8)', border: '1px solid var(--card-border)' }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: 'var(--accent)' }} />
              </span>
              <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {stats.totalCases} casos documentados
              </span>
            </div>

            {/* Title with text reveal animation */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
              <span className="animate-text-reveal block hero-title" style={{ animationDelay: '0.1s' }}>Explorando la</span>
              <span className="animate-text-reveal block animate-gradient-text" style={{ animationDelay: '0.3s' }}>Verdad</span>
            </h1>

            {/* Subtitle with fade effect */}
            <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-2" style={{ color: 'var(--muted)' }}>
              Descubre casos reales documentados con rigor y respeto.
              <br className="hidden md:block" />
              <span className="font-medium" style={{ color: 'var(--foreground)' }}>Historias que merecen ser contadas y recordadas.</span>
            </p>

            {/* Search Bar with glow effect */}
            <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up stagger-3 relative">
              <div className="absolute -inset-1 rounded-2xl opacity-30 blur-lg transition-opacity duration-500 hover:opacity-50" style={{ background: 'var(--gradient-accent)' }} />
              <div className="relative">
                <SearchBar size="large" placeholder="Buscar por nombre de victima, caso o ubicacion..." />
              </div>
            </div>

            {/* Quick filters with enhanced hover */}
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up stagger-4">
              {quickFilters.map((filter, index) => (
                <Link
                  key={filter.label}
                  href={filter.href}
                  className="chip group ripple-effect transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <span className="chip-dot transition-all duration-300 group-hover:scale-150" style={{ backgroundColor: filter.color }} />
                  <span className="transition-all duration-300 group-hover:font-semibold">{filter.label}</span>
                </Link>
              ))}
            </div>

            {/* Stats with counter animation */}
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto">
              <div className="text-center group">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2 animate-count-up transition-all duration-300 group-hover:scale-110"
                  style={{ color: 'var(--foreground)', animationDelay: '0.5s' }}
                >
                  {stats.totalCases}
                </div>
                <div className="text-sm uppercase tracking-wider font-medium transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>Casos</div>
                <div className="w-0 h-0.5 mx-auto mt-2 rounded-full transition-all duration-500 group-hover:w-full" style={{ background: 'var(--gradient-accent)' }} />
              </div>
              <div className="text-center group">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2 animate-count-up transition-all duration-300 group-hover:scale-110"
                  style={{ color: 'var(--success)', animationDelay: '0.7s' }}
                >
                  {stats.solvedCases}
                </div>
                <div className="text-sm uppercase tracking-wider font-medium transition-colors duration-300 group-hover:text-[var(--success)]" style={{ color: 'var(--muted)' }}>Resueltos</div>
                <div className="w-0 h-0.5 mx-auto mt-2 rounded-full transition-all duration-500 group-hover:w-full" style={{ background: 'linear-gradient(90deg, var(--success), var(--success-light))' }} />
              </div>
              <div className="text-center group">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2 animate-count-up transition-all duration-300 group-hover:scale-110"
                  style={{ color: 'var(--foreground)', animationDelay: '0.9s' }}
                >
                  {stats.totalVictims}
                </div>
                <div className="text-sm uppercase tracking-wider font-medium transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>Victimas</div>
                <div className="w-0 h-0.5 mx-auto mt-2 rounded-full transition-all duration-500 group-hover:w-full" style={{ background: 'var(--gradient-accent)' }} />
              </div>
            </div>
          </div>

          {/* Enhanced scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--muted)' }}>Explorar</span>
            <div className="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style={{ borderColor: 'var(--muted)' }}>
              <div className="w-1.5 h-3 rounded-full animate-scroll-indicator" style={{ background: 'var(--accent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                DESTACADOS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Casos Destacados</h2>
              <p style={{ color: 'var(--muted)' }}>Los casos mas impactantes de nuestra coleccion</p>
            </div>
            <Link
              href="/explorar"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
              style={{ color: 'var(--accent)' }}
            >
              Ver todos los casos
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {featuredCases.map((caseData, index) => (
              <div key={caseData.id} className="animate-fade-in-up h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                <CaseCard caseData={caseData} featured />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Cases */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 animate-fade-in" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--muted)' }}>
                RECIENTES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Ultimas Adiciones</h2>
              <p style={{ color: 'var(--muted)' }}>Los casos mas recientes en nuestra base de datos</p>
            </div>
            <Link
              href="/explorar?sort=recent"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-500 hover:gap-3 group"
              style={{ color: 'var(--accent)' }}
            >
              Ver mas recientes
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {recentCases.map((caseData) => (
              <CaseCard key={caseData.id} caseData={caseData} />
            ))}
          </div>
        </div>
      </section>

      {/* In Memoriam Section */}
      <section className="memorial-section py-24 md:py-32 w-full">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center">
          {/* Animated Candle */}
          <div className="candle mx-auto mb-10">
            <div className="candle-flame" />
            <div className="candle-body" />
          </div>

          <h2 className="text-3xl md:text-5xl font-light mb-8 tracking-widest w-full" style={{ color: 'var(--foreground)' }}>
            In Memoriam
          </h2>

          <div className="flex flex-col items-center justify-center space-y-6 mb-10 w-full">
            <p className="text-xl md:text-2xl leading-relaxed font-light text-center w-full" style={{ color: 'var(--foreground)' }}>
              Merecen ser recordados por quienes fueron,
              <br />
              <span className="font-medium" style={{ color: 'var(--accent)' }}>no por lo que les hicieron.</span>
            </p>

            <p className="text-base md:text-lg leading-relaxed max-w-xl text-center w-full mx-auto" style={{ color: 'var(--muted)' }}>
              Eran parte de una familia, tenían amigos que los querían.
              Tenían sueños, risas y una vida por delante.
            </p>

            <p className="text-sm md:text-base leading-relaxed max-w-lg text-center w-full mx-auto" style={{ color: 'var(--muted)' }}>
              En este espacio no los definimos por su final,
              sino por la luz que trajeron al mundo.
            </p>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--card-border)' }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--card-border)' }} />
          </div>

          {/* Quote - centered */}
          <p className="text-xl md:text-2xl italic font-light mb-10" style={{ color: 'var(--foreground)' }}>
            "No son casos. Son personas."
          </p>

          {/* CTA */}
          <Link
            href="/explorar"
            className="btn-primary inline-flex items-center gap-2 text-base"
          >
            Explorar sus historias
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Categories Section - Rediseñado */}
      <section className="py-24 md:py-32 categories-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Categorias
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explora por{' '}
              <span className="hero-title-accent">Tipo de Caso</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
              Navega por nuestra base de datos organizada por categorias de investigacion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                label: 'Homicidios',
                type: 'HOMICIDE',
                color: '#ef4444',
                gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                description: 'Casos de asesinato y homicidio',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )
              },
              {
                label: 'Desapariciones',
                type: 'DISAPPEARANCE',
                color: '#f59e0b',
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                description: 'Personas desaparecidas sin resolver',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                label: 'Asesinos Seriales',
                type: 'SERIAL_KILLER',
                color: '#9333ea',
                gradient: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                description: 'Crimenes en serie documentados',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )
              },
              {
                label: 'Casos Frios',
                type: 'COLD_CASE',
                color: '#3b82f6',
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                description: 'Investigaciones archivadas sin resolver',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )
              },
              {
                label: 'Secuestros',
                type: 'KIDNAPPING',
                color: '#ec4899',
                gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                description: 'Casos de secuestro y extorsion',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                )
              },
              {
                label: 'Otros Casos',
                type: 'OTHER',
                color: '#6b7280',
                gradient: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                description: 'Crimenes de otras categorias',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                )
              },
            ].map((cat) => (
              <Link
                key={cat.type}
                href={`/explorar?type=${cat.type}`}
                className="category-card group relative p-8 rounded-2xl border overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                }}
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${cat.color}08 0%, ${cat.color}15 100%)`,
                  }}
                />

                {/* Decorative corner accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${cat.color}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex items-start gap-5">
                  {/* Icon container */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      background: cat.gradient,
                      boxShadow: `0 4px 20px ${cat.color}40`,
                      color: 'white'
                    }}
                  >
                    {cat.icon}
                  </div>

                  {/* Text content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {cat.label}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {cat.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="self-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5" style={{ color: cat.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA to explore all */}
          <div className="text-center mt-12">
            <Link
              href="/explorar"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '2px solid var(--card-border)',
              }}
            >
              <span>Ver todos los casos</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32 mission-section relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'var(--accent)' }} />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: 'var(--accent)' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - Text */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Nuestra Mision
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Dando voz a quienes
                <br />
                <span className="hero-title-accent">ya no pueden hablar</span>
              </h2>

              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                Cada caso que documentamos representa una vida, una familia, un futuro truncado.
                Nos comprometemos a contar estas historias con el respeto y la dignidad que merecen.
              </p>

              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
                Creemos que recordar a las victimas por quienes fueron —sus suenos,
                sus risas, su humanidad— es la forma mas poderosa de honrar su memoria.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/explorar" className="btn-primary inline-flex items-center gap-2">
                  Explorar casos
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right side - Feature cards */}
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Informacion verificada',
                  description: 'Cada dato proviene de fuentes publicas confiables y documentacion oficial'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                  title: 'Enfoque en las victimas',
                  description: 'Priorizamos contar la historia de quienes sufrieron, no de quienes causaron el dano'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                  title: 'Narrativa respetuosa',
                  description: 'Evitamos el sensacionalismo y tratamos cada caso con la seriedad que merece'
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="feature-card group flex items-start gap-5 p-6 rounded-2xl transition-all duration-300 hover:-translate-x-2"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--accent)',
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 md:py-32 cta-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-90" style={{ background: 'var(--gradient-accent)' }} />

        {/* Animated decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-white/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-10 w-56 h-56 rounded-full bg-white/10 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-text-reveal">
            Cada historia merece ser contada
          </h2>
          <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explora nuestra base de datos y descubre las historias detras de cada caso.
            <span className="block mt-2 font-medium text-white">Juntos podemos mantener viva la memoria de quienes ya no estan.</span>
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/explorar"
              className="btn-magnetic group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg"
              style={{
                backgroundColor: 'white',
                color: 'var(--accent)',
              }}
            >
              <span>Comenzar a explorar</span>
              <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/buscar"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 hover:-translate-y-2 hover:bg-white/25 backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.4)',
              }}
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Buscar victima</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
