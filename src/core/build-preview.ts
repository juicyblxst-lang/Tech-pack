import type { GarmentSpec } from './garment-spec'
import { hoodiePOMs, tshirtPOMs } from './pom'
import { hoodieBOM, tshirtBOM } from './bom'
import { hoodieConstruction, tshirtConstruction } from './construction'
import { renderHoodieFlat, renderTshirtFlat, elementsToSvg } from '../engines/technical-flat/svg'
import { createTechPackDocument, renderTechPackSvg } from './tech-pack'

export function buildTechPackPreview(spec: GarmentSpec) {
  const isHoodie = spec.category === 'hoodie'
  const poms = isHoodie ? hoodiePOMs : tshirtPOMs
  const bom = isHoodie ? hoodieBOM : tshirtBOM
  const construction = isHoodie ? hoodieConstruction : tshirtConstruction
  const flat = isHoodie ? renderHoodieFlat() : renderTshirtFlat()
  const document = createTechPackDocument(spec.category)
  document.styleName = spec.name
  return {
    spec,
    pom: poms,
    bom,
    construction,
    flatSvg: elementsToSvg(flat),
    sheetSvg: renderTechPackSvg(document),
  }
}
