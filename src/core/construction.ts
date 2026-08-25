export interface ConstructionStep { id: string; operation: string; instruction: string }

export const tshirtConstruction: ConstructionStep[] = [
  { id: 'neck', operation: 'Neckband', instruction: 'Attach self-fabric or rib neckband with clean finish and consistent topstitch.' },
  { id: 'shoulder', operation: 'Shoulder seams', instruction: 'Join front and back shoulder seams; reinforce seam where required.' },
  { id: 'sleeve', operation: 'Sleeves', instruction: 'Set sleeves into armholes and maintain smooth sleeve cap.' },
  { id: 'side', operation: 'Side seams', instruction: 'Close side seams and finish seam allowance consistently.' },
  { id: 'hem', operation: 'Bottom hem', instruction: 'Turn hem evenly and secure with coverstitch or specified stitch.' },
]

export const hoodieConstruction: ConstructionStep[] = [
  { id: 'hood', operation: 'Hood', instruction: 'Join hood panels, finish opening, and insert drawcord where specified.' },
  { id: 'shoulder', operation: 'Shoulders', instruction: 'Join body shoulders and reinforce seam according to construction standard.' },
  { id: 'sleeve', operation: 'Sleeves', instruction: 'Attach sleeves and close underarm seams.' },
  { id: 'pocket', operation: 'Kangaroo pocket', instruction: 'Turn and topstitch pocket opening, then attach symmetrically to front body.' },
  { id: 'cuff', operation: 'Cuffs and hem', instruction: 'Attach 2x2 rib cuffs and hem band with controlled stretch.' },
]
