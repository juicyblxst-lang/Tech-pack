import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { createTshirt } from './garments/tshirt'
import { createHoodie } from './garments/hoodie'
import { validateTechPack } from './core/validation'
import { buildTechPackPreview } from './core/build-preview'
import type { ArtworkSpec, ArtworkTechnique, ArtworkPlacement } from './core/artwork'
import { defaultArtwork, artworkPlacementLabels } from './core/artwork'

function App() {
  const [category, setCategory] = useState<'tshirt' | 'hoodie'>('tshirt')
  const [tab, setTab] = useState<'flat' | 'measurements' | 'bom' | 'construction' | 'artwork'>('flat')
  const [showSheet, setShowSheet] = useState(false)
  const [measurements, setMeasurements] = useState<Record<string, number>>({})
  const [bomEdits, setBomEdits] = useState<Record<string, { specification?: string; placement?: string }>>({})
  const [constructionEdits, setConstructionEdits] = useState<Record<string, { operation?: string; seam?: string; stitch?: string }>>({})
  const [styleName, setStyleName] = useState('')
  const [artwork, setArtwork] = useState<ArtworkSpec>(defaultArtwork)
  const spec = useMemo(() => { const base = category === 'tshirt' ? createTshirt() : createHoodie(); base.measurements = base.measurements.map(m => ({ ...m, value: measurements[m.id] ?? m.value })); if (styleName) base.name = styleName; return base }, [category, measurements, styleName])
  const preview = useMemo(() => { const built = buildTechPackPreview(spec, artwork); return { ...built, bom: built.bom.map(item => ({ ...item, ...bomEdits[item.id] })), construction: built.construction.map(item => ({ ...item, ...constructionEdits[item.id] })) } }, [spec, artwork, bomEdits, constructionEdits])
  const validation = validateTechPack(spec, preview.pom.map(m => ({ id: m.id, name: m.name, definition: m.definition, value: m.value, unit: m.unit, tolerance: m.tolerance })), preview.bom.map(m => ({ id: m.id, category: m.category, item: m.item, specification: m.specification, placement: m.placement })), preview.construction.map(c => ({ id: c.id, operation: c.operation, instruction: c.operation })))
  const editMeasurement = (id: string, raw: string) => { const value = Number(raw); if (Number.isFinite(value)) setMeasurements(current => ({ ...current, [id]: value })) }
  const editBom = (id: string, field: 'specification' | 'placement', value: string) => setBomEdits(current => ({ ...current, [id]: { ...current[id], [field]: value } }))
  const editConstruction = (id: string, field: 'operation' | 'seam' | 'stitch', value: string) => setConstructionEdits(current => ({ ...current, [id]: { ...current[id], [field]: value } }))
  const editArtwork = <K extends keyof ArtworkSpec>(field: K, value: ArtworkSpec[K]) => setArtwork(current => ({ ...current, [field]: value }))
  const importArtwork = (file: File) => { if (!file.type.startsWith('image/')) return; const reader = new FileReader(); reader.onload = () => setArtwork(current => ({ ...current, assetName: file.name, assetDataUrl: String(reader.result), name: current.name === defaultArtwork.name ? file.name.replace(/\.[^.]+$/, '') : current.name })); reader.readAsDataURL(file) }

  return <main className="app">
    <header className="topbar"><div className="brand">TECH PACK <span>STUDIO</span></div><div className="top-actions"><span className="status-dot">● DRAFT</span><button onClick={() => setShowSheet(true)}>Preview pack</button></div></header>
    <section className="workspace">
      <aside className="sidebar"><p className="eyebrow">01 · GARMENT</p><div className="switch"><button className={category === 'tshirt' ? 'active' : ''} onClick={() => { setCategory('tshirt'); setMeasurements({}); setBomEdits({}); setConstructionEdits({}) }}>T-shirt</button><button className={category === 'hoodie' ? 'active' : ''} onClick={() => { setCategory('hoodie'); setMeasurements({}); setBomEdits({}); setConstructionEdits({}) }}>Hoodie</button></div><label>Style name<input value={styleName || spec.name} onChange={e => setStyleName(e.target.value)}/></label><label>Fit<select defaultValue={spec.fit}><option>regular</option><option>relaxed</option><option>oversized</option><option>cropped</option></select></label><label>Colorway<input defaultValue={spec.colorways[0]}/></label><div className={validation.valid ? 'validation valid' : 'validation invalid'}>{validation.valid ? '✓ Pack structure complete' : `${validation.errors.length} validation issues`}</div><button className="export" onClick={() => setShowSheet(true)}>Generate tech pack →</button></aside>
      <section className="canvas"><div className="canvas-head"><div><p className="eyebrow">02 · DESIGN WORKSPACE</p><h1>{spec.name}</h1></div><div className="tabs">{(['flat','measurements','bom','construction','artwork'] as const).map(t => <button key={t} className={tab === t ? 'selected' : ''} onClick={() => setTab(t)}>{t}</button>)}</div></div>
        {tab === 'flat' && <div className="flat-stage"><div className="sheet-label">TECHNICAL FLAT · FRONT / BACK</div><div className="flat" dangerouslySetInnerHTML={{__html: preview.flatSvg}}/></div>}
        {tab === 'measurements' && <div className="editable-table"><div className="row header"><span>POM</span><span>Definition</span><span>Spec</span><span>Tolerance</span></div>{preview.pom.map(p => <div className="row" key={p.id}><span>{p.code}</span><span>{p.definition}</span><span><input type="number" value={p.value ?? ''} placeholder="TBD" onChange={e => editMeasurement(p.id, e.target.value)} /> {p.unit}</span><span>{p.tolerance ? `±${p.tolerance}` : '—'}</span></div>)}</div>}
        {tab === 'bom' && <div className="editable-table"><div className="row header"><span>Component</span><span>Specification</span><span>Placement</span></div>{preview.bom.map(b => <div className="row" key={b.id}><span>{b.item}</span><span><input value={b.specification} onChange={e => editBom(b.id, 'specification', e.target.value)}/></span><span><input value={b.placement ?? ''} placeholder="—" onChange={e => editBom(b.id, 'placement', e.target.value)}/></span></div>)}</div>}
        {tab === 'construction' && <div className="editable-table"><div className="row header"><span>Operation</span><span>Seam</span><span>Stitch</span></div>{preview.construction.map(c => <div className="row" key={c.id}><span><input value={c.operation} onChange={e => editConstruction(c.id, 'operation', e.target.value)}/></span><span><input value={c.seam ?? ''} onChange={e => editConstruction(c.id, 'seam', e.target.value)}/></span><span><input value={c.stitch ?? ''} onChange={e => editConstruction(c.id, 'stitch', e.target.value)}/></span></div>)}</div>}
        {tab === 'artwork' && <div className="artwork-editor"><label>Artwork file<input type="file" accept="image/*" onChange={e => e.target.files?.[0] && importArtwork(e.target.files[0])}/></label>{artwork.assetName && <div className="asset-preview"><img src={artwork.assetDataUrl} alt={artwork.assetName}/><span>{artwork.assetName}</span></div>}<label>Artwork name<input value={artwork.name} onChange={e => editArtwork('name', e.target.value)}/></label><label>Technique<select value={artwork.technique} onChange={e => editArtwork('technique', e.target.value as ArtworkTechnique)}><option value="screen-print">Screen print</option><option value="dtg">DTG</option><option value="embroidery">Embroidery</option><option value="heat-transfer">Heat transfer</option><option value="applique">Appliqué</option><option value="label">Label</option></select></label><label>Placement<select value={artwork.placement} onChange={e => editArtwork('placement', e.target.value as ArtworkPlacement)}>{Object.entries(artworkPlacementLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><div className="two"><label>Width<input value={artwork.width} onChange={e => editArtwork('width', e.target.value)}/></label><label>Height<input value={artwork.height} onChange={e => editArtwork('height', e.target.value)}/></label></div><label>Colors<input value={artwork.colors} onChange={e => editArtwork('colors', e.target.value)}/></label><label>Notes<textarea value={artwork.notes ?? ''} onChange={e => editArtwork('notes', e.target.value)}/></label></div>}
      </section>
    </section>
    {showSheet && <div className="modal" onClick={() => setShowSheet(false)}><div className="pack-modal" onClick={e => e.stopPropagation()}><div className="modal-head"><span>TECH PACK PREVIEW</span><button onClick={() => setShowSheet(false)}>Close</button></div><div className="pack-preview" dangerouslySetInnerHTML={{__html: preview.sheetSvg}}/><button className="download" onClick={() => downloadSvg(preview.sheetSvg, `${spec.name.replace(/\s+/g, '-').toLowerCase()}-tech-pack.svg`)}>Export SVG ↓</button></div></div>}
  </main>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
function downloadSvg(svg: string, filename: string) { const blob = new Blob([svg], { type: 'image/svg+xml' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url) }
