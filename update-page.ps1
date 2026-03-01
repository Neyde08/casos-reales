$filePath = "C:/Users/afretes/Desktop/Documentos Sanz Clima/Alexis_Personal/Página_web_Ney/casos-reales/src/app/casos/[slug]/page.tsx"
$content = Get-Content $filePath -Raw

# Agregar import
$oldImport = "import type { Metadata } from 'next'"
$newImport = "import type { Metadata } from 'next'`nimport VictimImage from './VictimImage'"
$content = $content -replace [regex]::Escape($oldImport), $newImport

# Reemplazar placeholder de imagen de victima
$oldVictimImage = @'
                        <div className="w-16 h-16 rounded-full image-placeholder flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 opacity-30" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
'@

$newVictimImage = '                        <VictimImage imageUrl={victim.imageUrl} fullName={victim.fullName} />'

$content = $content -replace [regex]::Escape($oldVictimImage), $newVictimImage

Set-Content $filePath -Value $content -NoNewline
Write-Host "Archivo actualizado exitosamente"
