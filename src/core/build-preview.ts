import type { GarmentSpec } from './garment-spec'
import { hoodiePOMs, tshirtPOMs } from './pom'
import { hoodieBOM, tshirtBOM } from './bom'
import { hoodieConstruction, tshirtConstruction } from './construction'
import { renderHoodieFlat, renderTshirtFlat, renderBackFlat, elementsToSvg } from '../engines/technical-flat/svg'
import { createTechPackDocument, renderTechPackSvg } from './tech-pack'
import type { ArtworkSpec } from './artwork'

function valueFor(spec: GarmentSpec, id: string, fallback: number) { return spec.measurements.find(item => item.id === id)?.value ?? fallback }
function geometryFor(spec: GarmentSpec) { return { bodyWidth:valueFor(spec,'chest',spec.category==='hoodie'?100:92), bodyLength:valueFor(spec,'body-length',spec.category==='hoodie'?230:220), sleeveLength:valueFor(spec,'sleeve',spec.category==='hoodie'?70:52) } }

export function buildTechPackPreview(spec: GarmentSpec, artworks: ArtworkSpec[] = []) {
  const isHoodie = spec.category === 'hoodie'
  const poms = isHoodie ? hoodiePOMs : tshirtPOMs
  const bom = isHoodie ? hoodieBOM : tshirtBOM
  const construction = isHoodie ? hoodieConstruction : tshirtConstruction
  const geometry = geometryFor(spec)
  const overlays = artworks.map(artwork => ({ id:artwork.id, name:artwork.name, technique:artwork.technique, placement:artwork.placement, width:artwork.width, height:artwork.height, colors:artwork.colors, notes:artwork.notes, assetDataUrl:artwork.assetDataUrl }))
  const backPlacements = new Set(['center-back','neck-label','hem-label'])
  const frontArtworks = overlays.filter(a => !backPlacements.has(a.placement))
  const backArtworks = overlays.filter(a => backPlacements.has(a.placement))
  const frontElements = isHoodie ? renderHoodieFlat(geometry, frontArtworks) : renderTshirtFlat(geometry, frontArtworks)
  const backElements = renderBackFlat(spec.category, geometry, backArtworks).map(e => ({ ...e, attrs:{ ...e.attrs, transform:`translate(360 0) ${e.attrs.transform ?? ''}` } }))
  const flatSvg = elementsToSvg([...frontElements, ...backElements], 740, 360)
  const document = createTechPackDocument(spec.category)
  document.styleName = spec.name
  document.sections = document.sections.map(section => {
    if (section.title === 'PRODUCT OVERVIEW') return { ...section, items:[`Style: ${spec.name}`,`Category: ${isHoodie?'Hoodie':'T-shirt'}`,`Fit: ${spec.fit}`,`Colorway: ${spec.colorways.join(', ') || 'TBD'}`] }
    if (section.title === 'MEASUREMENTS') return { ...section, items:poms.map(p => `${p.code} · ${p.name} · ${spec.measurements.find(m=>m.id===p.id)?.value ?? 'TBD'} ${p.unit} · ±${spec.measurements.find(m=>m.id===p.id)?.tolerance ?? p.tolerance ?? '—'}`) }
    if (section.title === 'BILL OF MATERIALS') return { ...section, items:bom.map(item => `${item.item} · ${item.specification}${item.quantity ? ` · Qty ${item.quantity}` : ''}${item.placement ? ` · ${item.placement}` : ''}`) }
    if (section.title === 'CONSTRUCTION') return { ...section, items:construction.map(step => `${step.title} · ${step.operation}${step.seam ? ` · ${step.seam}` : ''}${step.stitch ? ` · ${step.stitch}` : ''}${step.notes ? ` · ${step.notes}` : ''}`) }
    if (section.title === 'ARTWORK') return { ...section, items:overlays.length ? overlays.flatMap((a,i) => [`#${String(i+1).padStart(2,'0')} · ${a.name} · ${a.technique}`,`${a.placement} · ${a.width} × ${a.height}`,`Colors: ${a.colors || 'TBD'}`,...(a.notes ? [`Notes: ${a.notes}`] : [])]) : ['No artwork specified'] }
    return section
  })
  return { spec, artworks, pom:poms.map(item=>({...item,value:spec.measurements.find(m=>m.id===item.id)?.value??item.value})), bom, construction, flatSvg, sheetSvg:renderTechPackSvg(document,flatSvg) }
}
