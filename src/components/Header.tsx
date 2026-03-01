'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isDark, setIsDark] = useState<boolean | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('/')

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    setIsDark(shouldBeDark)

    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Set active link based on current path
    setActiveLink(window.location.pathname)

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  const navLinks = [
    { href: '/', label: 'Inicio', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { href: '/explorar', label: 'Explorar Casos', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )},
    { href: '/buscar', label: 'Buscar', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )},
  ]

  return (
    <>
      {/* Skip Link para accesibilidad */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:text-white"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        Saltar al contenido principal
      </a>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-0'
        }`}
      style={{
        backgroundColor: isScrolled ? 'var(--header-bg)' : 'transparent',
        borderBottom: isScrolled ? '1px solid var(--card-border)' : 'none',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
      }}
    >
      {/* Progress bar on scroll */}
      <div
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
        style={{
          background: 'var(--gradient-accent)',
          width: isScrolled ? '100%' : '0%',
          opacity: isScrolled ? 0.5 : 0
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="logo-animated w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rounded-2xl relative overflow-hidden"
              style={{ background: 'var(--gradient-accent)' }}
            >
              {/* Shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)'
                }}
              />
              <svg className="w-5 h-5 text-white relative z-10 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="overflow-hidden">
              <span className="text-xl font-bold tracking-tight block transition-transform duration-300 group-hover:translate-x-1">
                Casos Reales
              </span>
              <span
                className="block text-xs transition-all duration-300 transform group-hover:translate-x-1"
                style={{ color: 'var(--muted)' }}
              >
                Explorando la verdad
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 p-1.5 rounded-2xl"
            style={{ backgroundColor: 'var(--input-bg)' }}
            aria-label="Navegación principal"
          >
            {navLinks.map((link) => {
              const isActive = activeLink === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl flex items-center gap-2 group ${
                    isActive ? 'text-white' : 'hover:bg-[var(--card-bg)]'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                  }}
                >
                  <span className={`transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`}>
                    {link.icon}
                  </span>
                  <span className="relative z-10">{link.label}</span>
                  {!isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-1/2"
                      style={{ background: 'var(--gradient-accent)' }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-3 rounded-xl transition-all duration-500 hover:scale-110 overflow-hidden group"
              style={{ backgroundColor: 'var(--input-bg)' }}
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                style={{
                  background: isDark
                    ? 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)'
                }}
              />

              {isDark === null ? (
                <div className="w-5 h-5" />
              ) : (
                <div className="relative w-5 h-5">
                  {/* Sun icon */}
                  <svg
                    className={`absolute inset-0 w-5 h-5 transition-all duration-700 ${
                      isDark ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: 'var(--warning)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {/* Moon icon */}
                  <svg
                    className={`absolute inset-0 w-5 h-5 transition-all duration-700 ${
                      isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: 'var(--accent)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl transition-all duration-300 relative overflow-hidden focus-ring"
              style={{ backgroundColor: 'var(--input-bg)' }}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-5 h-5 relative flex flex-col justify-center items-center">
                <span
                  className={`absolute w-5 h-0.5 rounded-full transition-all duration-500 ease-out ${
                    isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}
                  style={{ backgroundColor: 'var(--foreground)' }}
                />
                <span
                  className={`absolute w-5 h-0.5 rounded-full transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                  style={{ backgroundColor: 'var(--foreground)' }}
                />
                <span
                  className={`absolute w-5 h-0.5 rounded-full transition-all duration-500 ease-out ${
                    isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}
                  style={{ backgroundColor: 'var(--foreground)' }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <nav
            className="py-4 border-t"
            style={{ borderColor: 'var(--card-border)' }}
            aria-label="Navegación móvil"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const isActive = activeLink === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 animate-fade-in-up ${
                      isActive
                        ? 'text-white'
                        : 'hover:bg-[var(--input-bg)]'
                    }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      backgroundColor: isActive ? 'var(--accent)' : 'transparent'
                    }}
                    onClick={() => {
                      setActiveLink(link.href)
                      setIsMenuOpen(false)
                    }}
                  >
                    <span className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive ? 'bg-white/20' : ''
                    }`} style={{ backgroundColor: isActive ? undefined : 'var(--input-bg)' }}>
                      {link.icon}
                    </span>
                    {link.label}
                    <svg
                      className="w-4 h-4 ml-auto transition-transform duration-300"
                      style={{ color: isActive ? 'white' : 'var(--muted)' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
    </>
  )
}
