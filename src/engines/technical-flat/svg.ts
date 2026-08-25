export type SvgElement = { tag: 'path' | 'line' | 'circle' | 'text'; attrs: Record<string, string | number> }
export type FlatOptions = { bodyWidth?: number; bodyLength?: number; sleeveLength?: number }
export type ArtworkOverlay = { name: string; technique: string; placement: string; width: string; height: string; colors: string }

const path = (d: string, attrs: Record<string, string | number> = {}): SvgElement => ({ tag: 'path', attrs: { d, fill: 'none', stroke: '#111', 'stroke-width': 1.8, 'stroke-linejoin': 'round', ...attrs } })
const line = (x1:number,y1:number,x2:number,y2:number,attrs:Record<string,string|number>={}) => ({ tag:'line' as const, attrs:{x1,y1,x2,y2,stroke:'#111','stroke-width':1.4,...attrs} })
const text = (x:number,y:number,value:string,attrs:Record<string,string|number>={}) => ({ tag:'text' as const, attrs:{x,y,'font-family':'Arial, sans-serif','font-size':9,fill:'#111',...attrs,'data-text':value} })

function dimension(x1:number,y1:number,x2:number,y2:number,label:string,offset=14): SvgElement[] {
  const horizontal = y1 === y2
  const ox = horizontal ? 0 : offset
  const oy = horizontal ? offset : 0
  return [line(x1,y1,x2,y2,{'stroke-dasharray':'3 3','stroke-width':1}),line(x1,y1,x1+ox,y1+oy,{'stroke-width':0.8}),line(x2,y2,x2+ox,y2+oy,{'stroke-width':0.8}),text((x1+x2)/2+ox,(y1+y2)/2+oy-3,label,{'text-anchor':'middle','font-size':8})]
}

function artworkOverlay(artwork: ArtworkOverlay | undefined, cx: number, top: number, bodyWidth: number, bodyLength: number): SvgElement[] {
  if (!artwork) return []
  const placement = artwork.placement.toLowerCase()
  const centerFront = placement.includes('front') || placement.includes('center')
  const upper = placement.includes('chest') || placement.includes('upper')
  const x = centerFront ? cx : cx
  const y = upper ? top + 58 : top + Math.min(bodyLength * 0.48, bodyLength - 55)
  return [
    path(`M ${x-25} ${y-12} L ${x+25} ${y-12} L ${x+25} ${y+12} L ${x-25} ${y+12} Z`, {'stroke-dasharray':'3 3','stroke-width':1.2}),
    text(x, y-17, artwork.name, {'text-anchor':'middle','font-size':7,'font-weight':'700'}),
    text(x, y+4, artwork.technique.toUpperCase(), {'text-anchor':'middle','font-size':6}),
    text(x, y+30, `${artwork.width} × ${artwork.height} · ${artwork.colors}`, {'text-anchor':'middle','font-size':6}),
  ]
}

export function renderTshirtFlat(options: FlatOptions = {}, artwork?: ArtworkOverlay): SvgElement[] {
  const w = options.bodyWidth ?? 92, h = options.bodyLength ?? 220, sleeve = options.sleeveLength ?? 52
  const cx = 150, top = 72, left = cx - w / 2, right = cx + w / 2, hem = top + h
  return [path(`M ${left+22} ${top+18} L ${cx-20} ${top} L ${cx} ${top+18} L ${cx+20} ${top} L ${right-22} ${top+18} L ${right+sleeve} ${top+65} L ${right+22} ${top+85} L ${right} ${top+62} L ${right} ${hem} L ${left} ${hem} L ${left} ${top+62} L ${left-22} ${top+85} L ${left-sleeve} ${top+65} L ${left-22} ${top+18} Z`),path(`M ${cx-20} ${top} C ${cx-17} ${top+25}, ${cx+17} ${top+25}, ${cx+20} ${top}`, { 'stroke-width': 2 }),line(left, top+62, right, top+62, {'stroke-dasharray':'5 4','stroke-width':1}),line(left, hem, right, hem, {'stroke-width':2.4}),line(left-22, top+85, left+22, top+62, {'stroke-width':1}),line(right+22, top+85, right-22, top+62, {'stroke-width':1}),...dimension(left, hem, right, hem, `${w} cm`, 12),...dimension(right, top+62, right, hem, `${h} cm`, 22),...artworkOverlay(artwork,cx,top,w,h),text(cx, hem+38, 'FRONT', {'text-anchor':'middle','font-size':10,'font-weight':'700'})]
}

export function renderHoodieFlat(options: FlatOptions = {}, artwork?: ArtworkOverlay): SvgElement[] {
  const w = options.bodyWidth ?? 100, h = options.bodyLength ?? 230, sleeve = options.sleeveLength ?? 70
  const cx = 150, top = 82, left = cx-w/2, right = cx+w/2, hem = top+h
  return [path(`M ${left+22} ${top+18} L ${cx-28} ${top} L ${cx-20} ${top+42} L ${cx} ${top+58} L ${cx+20} ${top+42} L ${cx+28} ${top} L ${right-22} ${top+18} L ${right+sleeve} ${top+72} L ${right+20} ${top+94} L ${right} ${top+64} L ${right} ${hem} L ${left} ${hem} L ${left} ${top+64} L ${left-20} ${top+94} L ${left-sleeve} ${top+72} L ${left-22} ${top+18} Z`),path(`M ${cx-28} ${top} C ${cx-34} ${top-34}, ${cx+34} ${top-34}, ${cx+28} ${top}`, {'stroke-width':2}),path(`M ${cx-32} ${top+35} C ${cx-16} ${top+62}, ${cx+16} ${top+62}, ${cx+32} ${top+35}`),path(`M ${cx-34} ${top+118} L ${cx+34} ${top+118} L ${cx+28} ${top+158} L ${cx-28} ${top+158} Z`),line(left, hem, right, hem, {'stroke-width':2.4}),line(left-20, top+94, left+22, top+64, {'stroke-width':1}),line(right+20, top+94, right-22, top+64, {'stroke-width':1}),...dimension(left, hem, right, hem, `${w} cm`, 12),...dimension(right, top+64, right, hem, `${h} cm`, 22),...artworkOverlay(artwork,cx,top,w,h),text(cx, hem+38, 'FRONT', {'text-anchor':'middle','font-size':10,'font-weight':'700'})]
}

export function renderBackFlat(category: 'tshirt'|'hoodie', options: FlatOptions = {}): SvgElement[] { const elements = category === 'hoodie' ? renderHoodieFlat(options) : renderTshirtFlat(options); return elements.map(e => e.tag === 'text' ? {...e, attrs:{...e.attrs, 'data-text':'BACK'}} : e).concat(text(150, 330, 'BACK', {'text-anchor':'middle','font-size':10,'font-weight':'700'})) }

export function elementsToSvg(elements: SvgElement[], width=360, height=360): string { const body = elements.map(({tag, attrs}) => { const attrsCopy = {...attrs}; const value = attrsCopy['data-text']; delete attrsCopy['data-text']; const serialized = Object.entries(attrsCopy).map(([k,v])=>`${k}="${String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;')}"`).join(' '); return tag === 'text' ? `<text ${serialized}>${value ?? ''}</text>` : `<${tag} ${serialized} />` }).join(''); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><rect width="100%" height="100%" fill="white"/>${body}</svg>` }
export function renderTechnicalFlat(category: 'tshirt'|'hoodie', options?: FlatOptions, artwork?: ArtworkOverlay): string { const front = category === 'hoodie' ? renderHoodieFlat(options, artwork) : renderTshirtFlat(options, artwork); return elementsToSvg(front) }
