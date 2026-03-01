'use client'

interface VictimImageProps {
  imageUrl?: string | null
  fullName: string
}

export default function VictimImage({ imageUrl, fullName }: VictimImageProps) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={fullName}
        className="w-20 h-20 rounded-full object-cover flex-shrink-0"
        style={{ border: '2px solid var(--card-border)' }}
      />
    )
  }

  return (
    <div className="w-20 h-20 rounded-full image-placeholder flex items-center justify-center flex-shrink-0">
      <svg className="w-10 h-10 opacity-30" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  )
}
