import type { GarmentCategory } from '../../core/garment-spec'

export function renderTechnicalFlat(category: GarmentCategory): string {
  const isHoodie = category === 'hoodie'
  const sleeve = isHoodie ? 'M165 95 L215 145 L195 160 L150 120 Z' : 'M165 95 L210 125 L195 145 L155 120 Z'
  const hood = isHoodie ? '<path d="M125 55 Q150 15 175 55 L170 85 Q150 65 130 85 Z" fill="none" stroke="currentColor" stroke-width="2"/>' : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 320" role="img" aria-label="${category} technical flat"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M100 75 L150 55 L200 75 L185 250 Q150 270 115 250 Z"/><path d="M100 75 L55 105 L80 145 L115 120"/><path d="M200 75 L245 105 L220 145 L185 120"/><path d="M115 250 Q150 265 185 250"/><path d="M125 75 Q150 95 175 75"/>${hood}<path d="${sleeve}"/></g></svg>`
}
