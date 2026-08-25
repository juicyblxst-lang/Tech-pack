import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { createTshirt } from './garments/tshirt'
import { createHoodie } from './garments/hoodie'
import { renderTechnicalFlat } from './engines/technical-flat/svg'
import { validateTechPack } from './core/validation'

function App() {
  const [category, setCategory] = useState<'tshirt' | 'hoodie'>('tshirt')
  const spec = useMemo(() => category === 'tshirt' ? createTshirt() : createHoodie(), [category])
  const validation = validateTechPack(spec, spec.measurements.map(m => ({ id: m.id, name: m.name, definition: m.definition, value: m.value, unit: m.unit, tolerance: m.tolerance })), spec.materials.map(m => ({ id: m.id, category: m.type === 'fabric' || m.type === 'trim' || m.type === 'thread' || m.type === 'label' || m.type === 'artwork' ? m.type : 'fabric', item: m.name, specification: m.notes ?? '', placement: undefined })), spec.construction.map((instruction, i) => ({ id: String(i), operation: instruction.split(':')[0], instruction })))
  const svg = renderTechnicalFlat(category)

  return <main className="app">
    <header><div className="brand">TECH PACK <span>STUDIO</span></div><div className="badge">ENGINE PREVIEW</div></header>
    <section className="hero"><p className="eyebrow">FROM IDEA TO FACTORY</p><h1>Build the garment.<br/><em>Generate the pack.</em></h1><p>Structured garment data now drives the technical flat, measurements, materials, construction and validation.</p></section>
    <section className="builder">
      <aside><p className="eyebrow">GARMENT</p><div className="switch"><button className={category === 'tshirt' ? 'active' : ''} onClick={() => setCategory('tshirt')}>T-shirt</button><button className={category === 'hoodie' ? 'active' : ''} onClick={() => setCategory('hoodie')}>Hoodie</button></div><h2>{spec.name}</h2><p className="muted">{spec.fit} fit · {spec.colorways.join(', ')}</p><div className="stats"><div><strong>{spec.measurements.length}</strong><span>POMs</span></div><div><strong>{spec.materials.length}</strong><span>BOM items</span></div><div><strong>{spec.construction.length}</strong><span>Construction</span></div></div><div className={validation.valid ? 'valid' : 'invalid'}>{validation.valid ? '✓ Ready for pack generation' : `${validation.errors.length} issues`}</div></aside>
      <div className="preview"><div className="preview-head"><span>TECHNICAL FLAT · FRONT</span><span>1:1</span></div><div className="flat" dangerouslySetInnerHTML={{ __html: svg }} /></div>
    </section>
  </main>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
