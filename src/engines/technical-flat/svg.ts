export type Point = { x: number; y: number }
export type SvgElement = { tag: 'path' | 'line' | 'circle'; attrs: Record<string, string | number> }

const path = (d: string, attrs: Record<string, string | number> = {}): SvgElement => ({ tag: 'path', attrs: { d, fill: 'none', stroke: '#111', 'stroke-width': 2, ...attrs } })
const line = (x1:number,y1:number,x2:number,y2:number,attrs:Record<string,string|number>={}) => ({ tag:'line' as const, attrs:{x1,y1,x2,y2,stroke:'#111','stroke-width':2,...attrs} })

export function renderTshirtFlat(): SvgElement[] {
  return [
    path('M 90 70 L 150 40 L 210 70 L 235 125 L 205 145 L 185 105 L 185 300 L 115 300 L 115 105 L 95 145 L 65 125 Z'),
    path('M 150 40 C 132 40 128 58 150 65 C 172 58 168 40 150 40'),
    line(115,105,185,105,{ 'stroke-dasharray':'6 5', 'stroke-width':1 }),
    line(115,300,185,300,{ 'stroke-width':3 }),
    line(65,125,95,145,{ 'stroke-width':1 }),
    line(205,145,235,125,{ 'stroke-width':1 }),
  ]
}

export function renderHoodieFlat(): SvgElement[] {
  return [
    path('M 105 82 L 150 50 L 195 82 L 225 125 L 205 145 L 185 120 L 185 310 L 115 310 L 115 120 L 95 145 L 75 125 Z'),
    path('M 120 58 C 118 35 182 35 180 58 L 170 90 L 150 105 L 130 90 Z'),
    path('M 125 190 L 175 190 L 185 225 L 115 225 Z'),
    line(115,310,185,310,{ 'stroke-width':3 }),
    line(115,120,185,120,{ 'stroke-dasharray':'6 5', 'stroke-width':1 }),
    line(75,125,95,145,{ 'stroke-width':1 }),
    line(205,145,225,125,{ 'stroke-width':1 }),
  ]
}

export function elementsToSvg(elements: SvgElement[], width=360, height=360): string {
  const body = elements.map(({tag, attrs}) => `<${tag} ${Object.entries(attrs).map(([k,v])=>`${k}="${v}"`).join(' ')} />`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><rect width="100%" height="100%" fill="white"/>${body}</svg>`
}
