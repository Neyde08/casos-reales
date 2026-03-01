'use client'

import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

interface SafeHTMLProps {
  html: string
  className?: string
  style?: React.CSSProperties
}

export default function SafeHTML({ html, className, style }: SafeHTMLProps) {
  const [sanitizedHTML, setSanitizedHTML] = useState('')

  useEffect(() => {
    // Format the content: convert newlines to <br> and ## to <h3>
    const formattedHTML = html
      .replace(/\n/g, '<br />')
      .replace(/## ([^\n<]+)/g, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')

    // Sanitize the HTML to prevent XSS attacks
    const clean = DOMPurify.sanitize(formattedHTML, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'blockquote', 'span', 'div'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
    })

    setSanitizedHTML(clean)
  }, [html])

  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  )
}
