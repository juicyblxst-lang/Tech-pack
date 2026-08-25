import type { GarmentSpec } from './garment-spec'
import type { BOMItem } from './bom'
import type { ConstructionStep } from './construction'
import type { POM } from './pom'
import type { ArtworkSpec } from './artwork'

export interface ValidationResult { valid:boolean; errors:string[]; warnings:string[] }

export function validateTechPack(spec:GarmentSpec,poms:POM[],bom:BOMItem[],construction:ConstructionStep[],artworks:ArtworkSpec[]=spec.artwork):ValidationResult{
 const errors:string[]=[];const warnings:string[]=[]
 if(!spec.name.trim())errors.push('Garment name is required.')
 if(poms.length===0)errors.push('At least one measurement/POM is required.')
 if(bom.length===0)errors.push('Bill of materials is required.')
 if(construction.length===0)errors.push('Construction instructions are required.')
 if(spec.colorways.length===0||spec.colorways.some(c=>!c.trim()))errors.push('At least one valid colorway is required.')
 if(!bom.some(item=>item.category==='fabric'&&item.specification.trim()))errors.push('A main fabric specification must be specified.')
 const missingMeasurements=poms.filter(p=>p.required&&(p.value==null&&!spec.measurements.some(m=>m.id===p.id&&m.value!=null))).map(p=>p.code);if(missingMeasurements.length)errors.push(`Required measurements missing: ${missingMeasurements.join(', ')}.`)
 const incompleteBom=bom.filter(item=>!item.specification.trim()).map(item=>item.item);if(incompleteBom.length)errors.push(`BOM specifications missing: ${incompleteBom.join(', ')}.`)
 const incompleteConstruction=construction.filter(step=>!step.operation.trim()).map(step=>step.title);if(incompleteConstruction.length)errors.push(`Construction operations missing: ${incompleteConstruction.join(', ')}.`)
 const seen=new Set<string>();const duplicateArtworkNames:string[]=[];for(const artwork of artworks){if(!artwork.name.trim())errors.push(`Artwork ${artwork.id} needs a name.`);if(!artwork.placement)errors.push(`Artwork ${artwork.name||artwork.id} needs a placement.`);if(!artwork.width.trim()||!artwork.height.trim())errors.push(`Artwork ${artwork.name||artwork.id} needs dimensions.`);const key=artwork.name.trim().toLowerCase();if(key&&seen.has(key))duplicateArtworkNames.push(artwork.name);if(key)seen.add(key)}if(duplicateArtworkNames.length)warnings.push(`Artwork names are duplicated: ${duplicateArtworkNames.join(', ')}.`)
 if(!artworks.length)warnings.push('No artwork or decoration has been specified.')
 if(spec.category==='hoodie'&&bom.some(item=>item.item.toLowerCase().includes('hood')&&item.specification.trim()===''))warnings.push('Review hoodie-specific BOM specifications.')
 return{valid:errors.length===0,errors,warnings}
}
