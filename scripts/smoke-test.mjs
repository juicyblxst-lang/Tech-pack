import { existsSync, readFileSync } from 'node:fs'

const required = ['dist/index.html']
for (const file of required) {
  if (!existsSync(file)) throw new Error(`Missing build artifact: ${file}`)
}

const html = readFileSync('dist/index.html', 'utf8')
if (!html.includes('<script')) throw new Error('Built index is missing the application script.')

const sourceChecks = [
  ['src/core/validation.ts', 'validateTechPack'],
  ['src/core/build-preview.ts', 'buildTechPackPreview'],
  ['src/engines/technical-flat/svg.ts', 'renderTechnicalFlat'],
  ['src/core/artwork.ts', 'ArtworkPlacement'],
]
for (const [file, token] of sourceChecks) {
  const source = readFileSync(file, 'utf8')
  if (!source.includes(token)) throw new Error(`${file} is missing expected production symbol: ${token}`)
}

console.log('Smoke checks passed: build artifact and production modules are present.')
