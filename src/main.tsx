import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { createTshirt } from './garments/tshirt'
import { createHoodie } from './garments/hoodie'
import { validateTechPack } from './core/validation'
import { buildTechPackPreview } from './core/build-preview'

function App() {
  const [category, setCategory] = useState<'tshirt' | 'hoodie'>('tshirt')
  const [tab, setTab] = useState<'flat' | 'measurements' | 'bom' | 'construction'>('flat')
  const [showSheet, setShowSheet] = useState(false)
  const [measurements, setMeasurements] = useState<Record<string, number>>({})
  const spec = useMemo(() => {
    const base = category === 'tshirt' ? createTshirt() : createHoodie()
    base.measurements = base.measurements.map(m => ({ ...m, value: measurements[m.id] ?? m.value }))
    return base
  }, [category, measurements])
  const preview = useMemo(() => buildTechPackPreview(spec), [spec])
  const validation = validateTechPack(spec, preview.pom.map(m => ({ id: m.id, name: m.name, definition: m.definition, value: m.value, unit: m.unit, tolerance: m.tolerance })), preview.bom.map(m => ({ id: m.id, category: m.category === 'trim' || m.category === 'thread' || m.category === 'label' || m.category === 'fabric' || m.category === 'artwork' ? m.category : 'fabric', item: m.item, specification: m.specification, placement: m.placement })), preview.construction.map((c, i) => ({ id: String(i), operation: c.operation, instruction: c.instruction })))

  const editMeasurement = (id: string, raw: string) => {
    const value = Number(raw)
    setMeasurements(current => ({ ...current, [id]: Number.isFinite(value) ? value : current[id] }))
  }

  return <main className="app">
    <header className="topbar"><div className="brand">TECH PACK <span>STUDIO</span></div><div className="top-actions"><span className="status-dot">● DRAFT</span><button onClick={() => setShowSheet(true)}>Preview pack</button></div></header>
    <section className="workspace">
      <aside className="sidebar">
        <p className="eyebrow">01 · GARMENT</p>
        <div className="switch"><button className={category === 'tshirt' ? 'active' : ''} onClick={() => { setCategory('tshirt'); setMeasurements({}) }}>T-shirt</button><button className={category === 'hoodie' ? 'active' : ''} onClick={() => { setCategory('hoodie'); setMeasurements({}) }}>Hoodie</button></div>
        <label>Style name<input defaultValue={spec.name}/></label>
        <label>Fit<select defaultValue={spec.fit}><option>regular</option><option>relaxed</option><option>oversized</option><option>cropped</option></select></label>
        <label>Colorway<input defaultValue={spec.colorways[0]}/></label>
        <div className={validation.valid ? 'validation valid' : 'validation invalid'}>{validation.valid ? '✓ Pack structure complete' : `${validation.errors.length} validation issues`}</div>
        <button className="export" onClick={() => setShowSheet(true)}>Generate tech pack →</button>
      </aside>
      <section className="canvas">
        <div className="canvas-head"><div><p className="eyebrow">02 · DESIGN WORKSPACE</p><h1>{spec.name}</h1></div><div className="tabs">{(['flat','measurements','bom','construction'] as const).map(t => <button key={t} className={tab === t ? 'selected' : ''} onClick={() => setTab(t)}>{t}</button>)}</div></div>
        {tab === 'flat' && <div className="flat-stage"><div className="sheet-label">TECHNICAL FLAT · FRONT / BACK</div><div className="flat" dangerouslySetInnerHTML={{__html: preview.flatSvg}}/></div>}
        {tab === 'measurements' && <div className="editable-table"><div className="row header"><span>POM</span><span>Definition</span><span>Spec</span><span>Tolerance</span></div>{preview.pom.map(p => <div className="row" key={p.id}><span>{p.code}</span><span>{p.definition}</span><span><input type="number" value={p.value ?? ''} placeholder="TBD" onChange={e => editMeasurement(p.id, e.target.value)} /> {p.unit}</span><span>{p.tolerance ? `±${p.tolerance}` : '—'}</span></div>)}</div>}
        {tab === 'bom' && <DataTable headers={['Component','Specification','Placement']} rows={preview.bom.map(b => [b.item, b.specification, b.placement ?? '—'])}/>} 
        {tab === 'construction' && <DataTable headers={['Operation','Instruction','Placement']} rows={preview.construction.map(c => [c.operation, c.instruction, c.placement ?? '—'])}/>} 
      </section>
    </section>
    {showSheet && <div className="modal" onClick={() => setShowSheet(false)}><div className="pack-modal" onClick={e => e.stopPropagation()}><div className="modal-head"><span>TECH PACK PREVIEW</span><button onClick={() => setShowSheet(false)}>Close</button></div><div className="pack-preview" dangerouslySetInnerHTML={{__html: preview.sheetSvg}}/><button className="download" onClick={() => downloadSvg(preview.sheetSvg, `${spec.name.replace(/\s+/g, '-').toLowerCase()}-tech-pack.svg`)}>Export SVG ↓</button></div></div>}
  </main>
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) { return <div className="data-table"><div className="row header">{headers.map(h => <span key={h}>{h}</span>)}</div>{rows.map((r,i)=><div className="row" key={i}>{r.map((v,j)=><span key={j}>{v}</span>)}</div>)}</div> }
function downloadSvg(svg: string, filename: string) { const blob = new Blob([svg], { type: 'image/svg+xml' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url) }

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
