export interface ConstructionStep {
  id: string
  title: string
  operation: string
  seam?: string
  stitch?: string
  notes?: string
}

export const hoodieConstruction: ConstructionStep[] = [
  { id: 'hood', title: 'Hood Assembly', operation: 'Join hood panels at center seam, press seam, then attach hood to neckline.', seam: 'Overlock', stitch: '4-thread overlock' },
  { id: 'shoulder', title: 'Shoulder Seams', operation: 'Join front and back shoulders and stabilize seam.', seam: 'Overlock', stitch: '4-thread overlock' },
  { id: 'sleeve', title: 'Sleeve Attachment', operation: 'Attach sleeves to armholes, matching notches.', seam: 'Overlock', stitch: '4-thread overlock' },
  { id: 'pocket', title: 'Kangaroo Pocket', operation: 'Turn pocket opening, topstitch, position on front body and secure perimeter.', seam: 'Turn and topstitch', stitch: 'Single needle topstitch' },
  { id: 'cuff', title: 'Cuffs and Hem', operation: 'Join rib rings, attach to sleeve and body openings with even stretch.', seam: 'Overlock', stitch: '4-thread overlock' },
]

export const tshirtConstruction: ConstructionStep[] = [
  { id: 'shoulder', title: 'Shoulder Seams', operation: 'Join front and back shoulders and stabilize seam.', seam: 'Overlock', stitch: '4-thread overlock' },
  { id: 'neck', title: 'Neck Rib', operation: 'Join rib ring, attach evenly around neckline and coverstitch.', seam: 'Overlock + coverstitch', stitch: 'Coverstitch' },
  { id: 'sleeve', title: 'Sleeve Attachment', operation: 'Attach sleeves to armholes, matching notches.', seam: 'Overlock', stitch: '4-thread overlock' },
  { id: 'side', title: 'Side Seams', operation: 'Close body from sleeve opening through hem.', seam: 'Overlock', stitch: '4-thread overlock' },
  { id: 'hem', title: 'Bottom Hem', operation: 'Turn hem evenly and secure with coverstitch.', seam: 'Turn and coverstitch', stitch: 'Coverstitch' },
]
