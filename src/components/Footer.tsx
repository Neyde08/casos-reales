import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const categories = [
    { label: 'Casos Resueltos', href: '/explorar?status=SOLVED' },
    { label: 'Sin Resolver', href: '/explorar?status=UNSOLVED' },
    { label: 'Desapariciones', href: '/explorar?type=DISAPPEARANCE' },
    { label: 'Casos Frios', href: '/explorar?type=COLD_CASE' },
    { label: 'Asesinos Seriales', href: '/explorar?type=SERIAL_KILLER' },
  ]

  const navigation = [
    { label: 'Inicio', href: '/' },
    { label: 'Explorar Casos', href: '/explorar' },
    { label: 'Buscar', href: '/buscar' },
  ]

  return (
    <footer className="relative border-t mt-auto overflow-hidden" style={{
      backgroundColor: 'var(--card-bg)',
      borderColor: 'var(--card-border)'
    }}>
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-accent)' }} />

      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ background: 'var(--accent)' }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-5 blur-3xl" style={{ background: 'var(--accent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'var(--gradient-accent)' }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold">Casos Reales</span>
                <span className="block text-xs font-medium" style={{ color: 'var(--muted)' }}>
                  Explorando la verdad
                </span>
              </div>
            </div>

            <p className="text-base mb-8 max-w-md leading-relaxed" style={{ color: 'var(--muted)' }}>
              Documentamos casos reales con respeto y rigor, dando prioridad a las historias
              de las victimas. Creemos que merecen ser recordadas por quienes fueron,
              no por lo que les hicieron.
            </p>

            {/* Quote */}
            <div className="relative pl-5 py-1 mb-8" style={{ borderLeft: '3px solid var(--accent)' }}>
              <p className="italic text-lg" style={{ color: 'var(--foreground)' }}>
                "No son casos. Son personas."
              </p>
            </div>

            {/* Mini Stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>100+</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Casos</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: 'var(--success)' }}>50+</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Resueltos</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>200+</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Victimas</div>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              Navegacion
            </h3>
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                    style={{ color: 'var(--muted)' }}
                  >
                    <svg className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="group-hover:text-[var(--foreground)] transition-colors">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              Categorias
            </h3>
            <ul className="space-y-4">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                    style={{ color: 'var(--muted)' }}
                  >
                    <svg className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="group-hover:text-[var(--foreground)] transition-colors">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer Column */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--warning)' }} />
              Aviso Legal
            </h3>

            <div
              className="p-5 rounded-2xl text-sm leading-relaxed"
              style={{
                backgroundColor: 'var(--input-bg)',
                border: '1px solid var(--card-border)'
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(217, 119, 6, 0.15)' }}>
                  <svg className="w-5 h-5" style={{ color: 'var(--warning)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <strong className="block mb-2 text-base">Disclaimer</strong>
                  <span style={{ color: 'var(--muted)' }}>
                    Contenido informativo basado en fuentes publicas.
                    No se pretende difamar ni asegurar culpabilidad
                    mas alla de lo establecido judicialmente.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, var(--card-border), transparent)' }} />

        {/* Bottom bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              &copy; {currentYear} Casos Reales. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm flex items-center gap-2" style={{ color: 'var(--muted)' }}>
              <span className="inline-block">Hecho con</span>
              <svg className="w-4 h-4" style={{ color: 'var(--accent)' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>por las victimas</span>
            </span>

            {/* Memorial candle */}
            <div className="candle" style={{ transform: 'scale(0.35)', marginTop: '-25px', marginBottom: '-25px' }}>
              <div className="candle-flame" />
              <div className="candle-body" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
