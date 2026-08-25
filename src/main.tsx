import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const garments = [
  { name: 'T-shirt', detail: 'Classic crew neck', status: 'Ready' },
  { name: 'Hoodie', detail: 'Oversized pullover', status: 'Ready' },
]

function App() {
  return (
    <main className="shell">
      <nav className="nav">
        <div className="brand">TECH PACK <span>STUDIO</span></div>
        <div className="nav-links"><a href="#how">How it works</a><a href="#workspace">Workspace</a><button>Sign in</button></div>
      </nav>

      <section className="hero">
        <p className="eyebrow">FROM IDEA TO FACTORY</p>
        <h1>Turn a garment idea into a<br /><em>professional tech pack.</em></h1>
        <p className="lede">Define your garment once. Generate technical flats, measurements, materials, construction details and a manufacturer-ready document from one structured specification.</p>
        <div className="actions"><button className="primary">Create a tech pack</button><button className="secondary">See how it works ↓</button></div>
      </section>

      <section id="workspace" className="workspace">
        <div className="section-head"><div><p className="eyebrow">WORKSPACE</p><h2>Start with a garment.</h2></div><button className="new">+ New project</button></div>
        <div className="cards">
          {garments.map((garment) => <article className="card" key={garment.name}>
            <div className="garment-art"><div className={garment.name === 'Hoodie' ? 'silhouette hoodie' : 'silhouette tee'} /></div>
            <div className="card-copy"><div><h3>{garment.name}</h3><p>{garment.detail}</p></div><span className="status">{garment.status}</span></div>
          </article>)}
          <article className="card add"><div className="plus">+</div><h3>Start from an idea</h3><p>Describe what you want to make.</p></article>
        </div>
      </section>

      <section id="how" className="flow"><p className="eyebrow">THE WORKFLOW</p><div className="steps"><span>01 · DEFINE</span><span>→</span><span>02 · GENERATE</span><span>→</span><span>03 · REVIEW</span><span>→</span><span>04 · EXPORT</span></div></section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
