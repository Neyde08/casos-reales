// Type definitions for the application

export type CaseStatus = 'SOLVED' | 'UNSOLVED'
export type CaseType = 'HOMICIDE' | 'DISAPPEARANCE' | 'SERIAL_KILLER' | 'COLD_CASE' | 'KIDNAPPING' | 'OTHER'
export type VictimStatus = 'DECEASED' | 'MISSING' | 'SURVIVED'
export type SuspectRole = 'SUSPECT' | 'CONFIRMED_PERPETRATOR' | 'PERSON_OF_INTEREST'
export type EvidenceType = 'PHYSICAL' | 'TESTIMONIAL' | 'DIGITAL' | 'FORENSIC' | 'DOCUMENTARY'
export type ReliabilityTag = 'HIGH' | 'MEDIUM' | 'LOW'

export interface Case {
  id: string
  slug: string
  title: string
  summary: string
  status: CaseStatus
  type: CaseType
  year: number
  country: string
  city: string | null
  mainImageUrl: string | null
  gallery: string[] | null
  tags: string[] | null
  content: string | null
  viewCount: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
  victims?: Victim[]
  timelineEvents?: TimelineEvent[]
  suspects?: Suspect[]
  evidences?: Evidence[]
  sources?: Source[]
  impact?: CaseImpact | null
}

export interface Victim {
  id: string
  caseId: string

  // Identidad basica
  fullName: string
  aliases: string[] | null
  birthDate: Date | null
  birthPlace: string | null
  nationality: string | null

  // Familia
  parents: string | null
  parentsOccupation: string | null
  siblings: string | null
  familyInfo: string | null
  familyBackground: string | null

  // Educacion y trabajo
  education: string | null
  educationDetails: string | null
  occupation: string | null
  workplaceInfo: string | null
  careerDreams: string | null

  // Personalidad y vida
  personality: string | null
  physicalDescription: string | null
  hobbies: string | null
  talents: string | null
  favoriteThings: string | null
  dreams: string | null
  accomplishments: string | null

  // Vida social
  socialLife: string | null
  bestFriends: string | null
  relationship: string | null
  pets: string | null

  // Citas y testimonios
  friendsQuotes: { quote: string; author: string; relation?: string }[] | null
  familyQuotes: { quote: string; author: string; relation?: string }[] | null
  teacherQuotes: string | null

  // Ultimo dia
  lastSeenDate: Date | null
  lastSeenPlace: string | null
  lastSeenDetails: string | null
  lastSeenWearing: string | null
  lastKnownActivities: string | null

  // Muerte / Estado
  ageAtDeathOrMissing: number | null
  deathDate: Date | null
  causeOfDeath: string | null
  status: VictimStatus

  // Legado
  legacy: string | null
  memorialInfo: string | null
  memorialUrl: string | null
  tributeCount: number

  // Narrativa
  biography: string | null
  lifeSummary: string | null

  // Imagen
  imageUrl: string | null
  imageSource: string | null
  additionalPhotos: string[] | null

  // Tributos
  tributes?: Tribute[]
}

export interface TimelineEvent {
  id: string
  caseId: string
  date: Date
  title: string
  description: string | null
  order: number
}

export interface Suspect {
  id: string
  caseId: string
  fullName: string
  aliases: string[] | null
  role: SuspectRole
  description: string | null
  method: string | null
  pattern: string | null
  evidenceAgainst: string | null
  convictionDetails: string | null
  sentence: string | null
  imageUrl: string | null
  isConfirmed: boolean
}

export interface Evidence {
  id: string
  caseId: string
  title: string
  description: string | null
  type: EvidenceType
  credibilityScore: number | null
  imageUrl: string | null
}

export interface Source {
  id: string
  caseId: string
  title: string
  url: string | null
  publisher: string | null
  date: Date | null
  reliabilityTag: ReliabilityTag | null
}

export interface Tribute {
  id: string
  victimId: string
  message: string | null
  candle: boolean
  name: string | null
  country: string | null
  createdAt: Date
}

export interface CaseImpact {
  id: string
  caseId: string
  // Impacto legislativo
  legislationName: string | null
  legislationYear: number | null
  legislationDesc: string | null
  // Fundaciones
  foundationName: string | null
  foundationUrl: string | null
  foundationDesc: string | null
  // Impacto comunitario
  communityImpact: string | null
  awarenessEffect: string | null
  // Adaptaciones mediáticas
  mediaAdaptations: MediaAdaptation[] | null
  // Cambios procedimentales
  proceduralChanges: string | null
}

export interface MediaAdaptation {
  title: string
  type: 'documentary' | 'movie' | 'book' | 'podcast' | 'series' | 'other'
  year?: number
  url?: string
}

export interface SearchFilters {
  query?: string
  status?: CaseStatus
  type?: CaseType
  year?: number
  yearFrom?: number
  yearTo?: number
  country?: string
  sortBy?: 'recent' | 'views' | 'year' | 'alphabetical'
  page?: number
  limit?: number
}

export interface SearchResult {
  cases: Case[]
  total: number
  page: number
  totalPages: number
}
