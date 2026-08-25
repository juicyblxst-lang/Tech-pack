export type ArtworkTechnique = 'screen-print' | 'dtg' | 'embroidery' | 'heat-transfer' | 'applique' | 'label'
export type ArtworkPlacement = 'center-front' | 'left-chest' | 'right-chest' | 'center-back' | 'left-sleeve' | 'right-sleeve' | 'neck-label' | 'hem-label'
export interface ArtworkSpec { id:string; name:string; technique:ArtworkTechnique; placement:ArtworkPlacement; width:string; height:string; colors:string; notes?:string; assetName?:string; assetDataUrl?:string }
export const artworkPlacementLabels:Record<ArtworkPlacement,string>={ 'center-front':'Center front','left-chest':'Left chest','right-chest':'Right chest','center-back':'Center back','left-sleeve':'Left sleeve','right-sleeve':'Right sleeve','neck-label':'Neck label','hem-label':'Hem label' }
export const defaultArtwork:ArtworkSpec={id:'artwork-1',name:'Primary artwork',technique:'screen-print',placement:'center-front',width:'30 cm',height:'35 cm',colors:'1 color'}
