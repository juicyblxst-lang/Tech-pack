import { createStarterSpec, type GarmentSpec } from '../core/garment-spec'
import { hoodiePOMs } from '../core/pom'
import { hoodieBOM } from '../core/bom'
import { hoodieConstruction } from '../core/construction'

export function createHoodie(): GarmentSpec {
  return {
    ...createStarterSpec('hoodie'),
    name: 'Oversized Hoodie',
    measurements: hoodiePOMs.map(p => ({ id: p.id, name: p.name, value: p.value, unit: p.unit, tolerance: p.tolerance, definition: p.definition })),
    materials: hoodieBOM.map(item => ({ id: item.id, name: item.item, type: item.category, color: 'Black', notes: item.specification })),
    construction: hoodieConstruction.map(step => `${step.operation}: ${step.instruction}`),
  }
}
