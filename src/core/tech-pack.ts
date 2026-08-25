export interface TechPackSection { title: string; items: string[] }

export interface TechPackDocument {
  title: string
  styleName: string
  category: 'tshirt' | 'hoodie'
  season?: string
  styleNumber?: string
  sections: TechPackSection[]
}

export function createTechPackDocument(category: 'tshirt' | 'hoodie'): TechPackDocument {
  return {
    title: category === 'hoodie' ? 'HOODIE TECH PACK' : 'T-SHIRT TECH PACK',
    styleName: category === 'hoodie' ? 'New Hoodie' : 'New T-shirt',
    category,
    sections: [
      { title: 'PRODUCT OVERVIEW', items: ['Style name', 'Category', 'Colorway', 'Fit'] },
      { title: 'MEASUREMENTS', items: ['POM code', 'Measurement definition', 'Spec', 'Tolerance'] },
      { title: 'BILL OF MATERIALS', items: ['Component', 'Material', 'Composition', 'Color', 'Supplier notes'] },
      { title: 'CONSTRUCTION', items: ['Operation', 'Seam', 'Stitch', 'Thread', 'Placement'] },
      { title: 'ARTWORK', items: ['Artwork name', 'Technique', 'Placement', 'Size', 'Color'] },
    ],
  }
}

export function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

export function renderTechPackSvg(doc: TechPackDocument): string {
  const sections = doc.sections.map((section, index) => {
    const y = 360 + index * 72
    const items = section.items.join('  •  ')
    return `<g><text x="42" y="${y}" font-family="Arial, sans-serif" font-size="12" font-weight="700">${escapeXml(section.title)}</text><line x1="42" y1="${y + 10}" x2="758" y2="${y + 10}" stroke="#111" stroke-width="1"/><text x="42" y="${y + 34}" font-family="Arial, sans-serif" font-size="10">${escapeXml(items)}</text></g>`
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 760"><rect width="800" height="760" fill="#fff"/><rect x="24" y="24" width="752" height="712" fill="none" stroke="#111"/><text x="42" y="66" font-family="Arial, sans-serif" font-size="24" font-weight="700">${escapeXml(doc.title)}</text><text x="42" y="94" font-family="Arial, sans-serif" font-size="12">${escapeXml(doc.styleName)}</text><text x="42" y="126" font-family="Arial, sans-serif" font-size="10">TECHNICAL SPECIFICATION / REV 01</text><rect x="42" y="150" width="716" height="180" fill="#fafafa" stroke="#111"/><text x="400" y="245" text-anchor="middle" font-family="Arial, sans-serif" font-size="12">TECHNICAL FLAT / FRONT + BACK</text>${sections}</svg>`
}
