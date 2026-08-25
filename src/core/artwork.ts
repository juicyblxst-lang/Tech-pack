export type ArtworkTechnique = 'screen-print' | 'dtg' | 'embroidery' | 'heat-transfer' | 'applique' | 'label'

export interface ArtworkSpec {
  id: string
  name: string
  technique: ArtworkTechnique
  placement: string
  width: string
  height: string
  colors: string
  notes?: string
  assetName?: string
  assetDataUrl?: string
}

export const defaultArtwork: ArtworkSpec = {
  id: 'primary-artwork',
  name: 'Primary artwork',
  technique: 'screen-print',
  placement: 'Center front',
  width: '30 cm',
  height: '35 cm',
  colors: '1 color',
}
