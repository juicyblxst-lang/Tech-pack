import { readFileSync, writeFileSync } from 'node:fs'

const path = 'src/main.tsx'
const source = readFileSync(path, 'utf8')
const fixed = source.replaceAll('...current[c.id]:{...current[c.id],seam:', '...current,[c.id]:{...current[c.id],seam:').replaceAll('...current[c.id]:{...current[c.id],stitch:', '...current,[c.id]:{...current[c.id],stitch:')

if (fixed !== source) writeFileSync(path, fixed)
