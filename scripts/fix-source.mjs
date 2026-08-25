import { readFileSync, writeFileSync } from 'node:fs'

const mainPath = 'src/main.tsx'
let source = readFileSync(mainPath, 'utf8')

source = source.replace("import { ProjectManager } from './components/ProjectManager'", "import { ProjectManager } from './components/ProjectManager'\nimport { tshirtBOM, hoodieBOM } from './core/bom'\nimport { tshirtConstruction, hoodieConstruction } from './core/construction'")
source = source.replace(/const editedBom=useMemo\(\(\)=>\{const base=category==='tshirt'\?createTshirt\(\):createHoodie\(\);return base\.bom\.map\(item=>\(\{\.\.\.item,\.\.\.bomEdits\[item\.id\]\}\)\)\},\[category,bomEdits\]\);/, "const editedBom=useMemo(()=>{const base=category==='tshirt'?tshirtBOM:hoodieBOM;return base.map(item=>({...item,...bomEdits[item.id]}))},[category,bomEdits]);")
source = source.replace(/const editedConstruction=useMemo\(\(\)=>\{const base=category==='tshirt'\?createTshirt\(\):createHoodie\(\);return base\.construction\.map\(item=>\(\{\.\.\.item,\.\.\.constructionEdits\[item\.id\]\}\)\)\},\[category,constructionEdits\]\);/, "const editedConstruction=useMemo(()=>{const base=category==='tshirt'?tshirtConstruction:hoodieConstruction;return base.map(item=>({...item,...constructionEdits[item.id]}))},[category,constructionEdits]);")
source = source.replace('...current[c.id]:{...current[c.id],seam:', '...current,[c.id]:{...current[c.id],seam:')
source = source.replace('...current[c.id]:{...current[c.id],stitch:', '...current,[c.id]:{...current[c.id],stitch:')
writeFileSync(mainPath, source)

const validationPath = 'src/core/validation.ts'
let validation = readFileSync(validationPath, 'utf8')
validation = validation.replace('artworks:ArtworkSpec[]=spec.artwork', 'artworks:ArtworkSpec[]=[]')
writeFileSync(validationPath, validation)

writeFileSync('src/vite-env.d.ts', '/// <reference types="vite/client" />\n')
