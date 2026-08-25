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
      { title: 'PRODUCT OVERVIEW', items: [] },
      { title: 'MEASUREMENTS', items: [] },
      { title: 'BILL OF MATERIALS', items: [] },
      { title: 'CONSTRUCTION', items: [] },
      { title: 'ARTWORK', items: [] },
    ],
  }
}

export function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

function text(x: number, y: number, value: string, size = 9, weight = '400', anchor = 'start') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}">${escapeXml(value)}</text>`
}

function sectionBlock(section: TechPackSection, y: number): string {
  const rows = section.items.slice(0, 7)
  const height = Math.max(58, 32 + rows.length * 18)
  return `<g><rect x="42" y="${y}" width="716" height="${height}" fill="#fff" stroke="#111"/><rect x="42" y="${y}" width="716" height="26" fill="#f1f1f1"/><text x="54" y="${y + 18}" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700">${escapeXml(section.title)}</text>${rows.map((item, i) => text(54, y + 48 + i * 18, item, 8)).join('')}</g>`
}

export function renderTechPackSvg(doc: TechPackDocument, flatSvg?: string): string {
  const flat = flatSvg
    ? flatSvg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/<rect[^>]*\/>/, '')
    : text(400, 245, 'TECHNICAL FLAT / FRONT + BACK', 12, '400', 'middle')

  const sections = doc.sections.map((section, index) => sectionBlock(section, 492 + index * 78)).join('')
  const footerY = 492 + doc.sections.length * 78 + 20

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 920"><rect width="800" height="920" fill="#fff"/><rect x="24" y="24" width="752" height="872" fill="none" stroke="#111"/><rect x="24" y="24" width="752" height="112" fill="#111"/><text x="42" y="65" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#fff">${escapeXml(doc.title)}</text><text x="42" y="91" font-family="Arial, Helvetica, sans-serif" font-size="12" fill="#fff">${escapeXml(doc.styleName)}</text><text x="758" y="91" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#fff">REV 01 · TECHNICAL SPECIFICATION</text><rect x="42" y="154" width="716" height="304" fill="#fafafa" stroke="#111"/><g transform="translate(218 154) scale(1.15)">${flat}</g>${sections}<line x1="42" y1="${footerY}" x2="758" y2="${footerY}" stroke="#111"/>${text(42, footerY + 18, 'Generated technical specification · Verify all production measurements against approved sample.', 7)}${text(758, footerY + 18, 'PAGE 01', 7, '400', 'end')}</svg>`
}
