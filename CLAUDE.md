# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Casos Reales** is a Spanish-language web platform for exploring real criminal cases (solved and unsolved) with a "dossier" style experience. The project prioritizes **victim dignity** over sensationalism - victims are the focus, not criminals.

## Development Commands

```bash
# Start development server (runs on port 3002)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Database operations
npm run db:migrate          # Run Prisma migrations
npm run db:seed             # Seed all data (runs seed.ts, seed-part2.ts, seed-part3.ts)
npm run db:seed:part1       # Seed only part 1
npm run db:seed:part2       # Seed only part 2
npm run db:seed:part3       # Seed only part 3
npm run db:reset            # Reset database (force)
npm run db:images           # Update victim images
npm run db:images:guide     # Update images with guide

# Run individual Prisma scripts
npx tsx prisma/<script-name>.ts

# Open Prisma Studio (database browser)
npx prisma studio

# Regenerate Prisma client after schema changes
npx prisma generate

# Push schema changes to database
npx prisma db push
```

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **React**: 19.2.3
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4
- **Database**: SQLite via Prisma ORM 5.22.0
- **Path alias**: `@/*` maps to `./src/*`

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── explorar/           # Browse cases with filters
│   ├── buscar/             # Advanced search
│   ├── casos/[slug]/       # Case detail (dossier view)
│   │   ├── page.tsx        # Main case page
│   │   ├── VictimProfile.tsx
│   │   ├── VictimImage.tsx
│   │   ├── TributeSection.tsx
│   │   └── CaseImpactSection.tsx
│   └── api/
│       ├── cases/route.ts           # GET /api/cases (list with filters)
│       ├── tributes/route.ts        # Tribute endpoints
│       └── search/suggestions/      # Autocomplete suggestions
├── components/             # Shared components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CaseCard.tsx
│   ├── SearchBar.tsx
│   └── SafeHTML.tsx
└── lib/
    ├── prisma.ts           # Prisma client singleton
    ├── types.ts            # TypeScript types
    └── normalize.ts        # Search normalization (removes accents)
```

## Data Model (Prisma)

**Core entities:**
- `Case` - Main case record (slug, title, status, type, year, country, content)
- `Victim` - Detailed victim profiles with biography, family, personality, legacy
- `TimelineEvent` - Chronological case events
- `Suspect` - Suspects/perpetrators with role (SUSPECT/CONFIRMED_PERPETRATOR)
- `Evidence` - Case evidence (PHYSICAL/TESTIMONIAL/DIGITAL/FORENSIC/DOCUMENTARY)
- `Source` - References with reliability tags (HIGH/MEDIUM/LOW)
- `CaseImpact` - Legislation, foundations, media adaptations created
- `Tribute` - Virtual candles/messages from visitors

**Key enums (stored as strings):**
- Case status: `SOLVED`, `UNSOLVED`
- Case type: `HOMICIDE`, `DISAPPEARANCE`, `SERIAL_KILLER`, `COLD_CASE`, `KIDNAPPING`, `OTHER`
- Victim status: `DECEASED`, `MISSING`, `SURVIVED`

## Search Implementation

All searchable fields have normalized versions (`*Search`) without accents for accent-insensitive searching:
- `titleSearch`, `countrySearch`, `citySearch`, `fullNameSearch`

Normalize function in `src/lib/normalize.ts`:
```typescript
function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // Remove accents
    .replace(/[^\w\s]/g, '')
    .trim()
}
```

## Content Guidelines

1. **Victim-centered**: Focus on who victims were as people, not crime details
2. **Use correct Spanish accents**: niña (not nina), año (not ano), día (not dia)
3. **Inclusive language**: Use neutral terms like "las víctimas" instead of gendered terms
4. **No sensationalist content**: No crime scene photos, respectful placeholders when needed
5. **All content in Spanish**: UI, content, and messages

## API Endpoints

| Endpoint | Params |
|----------|--------|
| `GET /api/cases` | `q`, `status`, `type`, `country`, `year`, `sort`, `page`, `limit` |
| `GET /api/search/suggestions` | `q` (autocomplete) |
| `POST /api/tributes` | Virtual candle/message for victim |

## Image Conventions

- Case images: `/public/images/cases/{slug}.jpg` (640x400px)
- Victim images: `/public/images/victims/{name}.jpg` (200x200px)
- Placeholders: `placeholder-{type}.svg` (case, female, male, child, mystery, etc.)

## Adding New Cases

1. Create seed script in `prisma/` or add to existing seed file
2. Include: case data, victims (with detailed biography), timeline events, evidence, sources
3. Run `npx tsx prisma/your-script.ts`
4. Run `npx tsx prisma/populate-search-fields.ts` to update search indexes

## Utility Scripts in prisma/

- `check-impacts.ts` - View which cases have/lack impact data
- `check-all-victims.ts` - View victim completeness
- `fix-ortografia.ts` - Fix accents across database
- `populate-search-fields.ts` - Regenerate search-normalized fields
- `list-cases.ts` - List all cases in the database
- `list-victims.ts` - List all victims
- `check-db.ts` - Check database status

## Environment

- Default SQLite database: `prisma/dev.db`
- DATABASE_URL set in `.env` file
- Development server runs on port 3002 (not default 3000)

## JSON Array Handling

SQLite stores JSON arrays as stringified JSON. When reading from the database, parse these fields:
```typescript
// In API routes, parse JSON fields after fetching:
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
```

When writing to the database, stringify arrays:
```typescript
await prisma.case.create({
  data: {
    // ...
    gallery: JSON.stringify(['url1.jpg', 'url2.jpg']),
    tags: JSON.stringify(['tag1', 'tag2']),
  }
})
```

**Fields requiring JSON handling:**
- Case: `gallery`, `tags`
- Victim: `aliases`, `friendsQuotes`, `familyQuotes`, `additionalPhotos`
- CaseImpact: `mediaAdaptations`
- Suspect: `aliases`

## Notes

- No test framework configured yet
- ESLint uses Next.js recommended config with core-web-vitals and TypeScript rules
