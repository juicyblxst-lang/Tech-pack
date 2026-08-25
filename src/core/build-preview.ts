import type { GarmentSpec } from './garment-spec'
import { hoodiePOMs, tshirtPOMs } from './pom'
import { hoodieBOM, tshirtBOM } from './bom'
import { hoodieConstruction, tshirtConstruction } from './construction'
import { renderHoodieFlat, renderTshirtFlat, renderBackFlat, elementsToSvg } from '../engines/technical-flat/svg'
import { createTechPackDocument, renderTechPackSvg } from './tech-pack'

function valueFor(spec: GarmentSpec, id: string, fallback: number): number {
  const measurement = spec.measurements.find(item => item.id === id)
  return measurement?.value ?? fallback
}

function geometryFor(spec: GarmentSpec) {
  return {
    bodyWidth: valueFor(spec, 'chest', spec.category === 'hoodie' ? 100 : 92),
    bodyLength: valueFor(spec, 'body-length', spec.category === 'hoodie' ? 230 : 220),
    sleeveLength: valueFor(spec, 'sleeve', spec.category === 'hoodie' ? 70 : 52),
  }
}

export function buildTechPackPreview(spec: GarmentSpec) {
  const isHoodie = spec.category === 'hoodie'
  const poms = isHoodie ? hoodiePOMs : tshirtPOMs
  const bom = isHoodie ? hoodieBOM : tshirtBOM
  const construction = isHoodie ? hoodieConstruction : tshirtConstruction
  const geometry = geometryFor(spec)
  const frontElements = isHoodie ? renderHoodieFlat(geometry) : renderTshirtFlat(geometry)
  const backElements = renderBackFlat(spec.category, geometry)
  const flatSvg = elementsToSvg([...frontElements, ...backElements.map(e => ({ ...e, attrs: { ...e.attrs, transform: `translate(190 0) ${e.attrs.transform ?? ''}` } }))])
  const document = createTechPackDocument(spec.category)
  document.styleName = spec.name
  document.sections = document.sections.map(section => section.title === 'MEASUREMENTS'
    ? { ...section, items: poms.map(p => `${p.code}: ${p.name} — ${spec.measurements.find(m => m.id === p.id)?.value ?? 'TBD'} ${p.unit}`) }
    : section)
  return {
    spec,
    pom: poms.map(item => ({ ...item, value: spec.measurements.find(m => m.id === item.id)?.value ?? item.value })),
    bom,
    construction,
    flatSvg,
    sheetSvg: renderTechPackSvg(document, flatSvg),
  }
}
