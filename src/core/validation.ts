import type { GarmentSpec } from './garment-spec'
import type { BOMItem } from './bom'
import type { ConstructionStep } from './construction'
import type { POM } from './pom'

export interface ValidationResult { valid: boolean; errors: string[]; warnings: string[] }

export function validateTechPack(spec: GarmentSpec, poms: POM[], bom: BOMItem[], construction: ConstructionStep[]): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  if (!spec.name.trim()) errors.push('Garment name is required.')
  if (poms.length === 0) errors.push('At least one measurement/POM is required.')
  if (bom.length === 0) errors.push('Bill of materials is required.')
  if (construction.length === 0) errors.push('Construction instructions are required.')
  if (spec.colorways.length === 0) errors.push('At least one colorway is required.')
  if (!bom.some(item => item.category === 'fabric')) errors.push('A main fabric must be specified.')
  if (!spec.artwork.length) warnings.push('No artwork or decoration has been specified.')
  return { valid: errors.length === 0, errors, warnings }
}
