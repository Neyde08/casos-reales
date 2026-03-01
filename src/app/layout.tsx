import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: {
    default: "Casos Reales - Explorando la Verdad",
    template: "%s | Casos Reales"
  },
  description: "Explora casos reales resueltos y sin resolver. Una plataforma dedicada a documentar la verdad con respeto y rigor.",
  keywords: ["casos reales", "true crime", "misterios", "casos sin resolver", "crimenes"],
  authors: [{ name: "Casos Reales" }],
  openGraph: {
    title: "Casos Reales - Explorando la Verdad",
    description: "Explora casos reales resueltos y sin resolver.",
    type: "website",
    locale: "es_ES",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
