import { useEffect, useState } from 'react'
import { createProject, deleteProject, listProjects, renameProject, type AuthSession } from '../core/auth'

type ProjectRow={id:string;name:string;created_at:string;updated_at:string}

export function ProjectManager({session,currentId,onClose,onOpen,onNew}:{session:AuthSession;currentId?:string;onClose:()=>void;onOpen:(id:string)=>Promise<void>;onNew:()=>void}){
 const[projects,setProjects]=useState<ProjectRow[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[busy,setBusy]=useState<string|null>(null)
 const refresh=()=>{setLoading(true);listProjects(session).then(setProjects).catch(e=>setError(e instanceof Error?e.message:'Could not load projects')).finally(()=>setLoading(false))}
 useEffect(refresh,[session])
 const rename=async(p:ProjectRow)=>{const name=window.prompt('Tech pack name',p.name)?.trim();if(!name||name===p.name)return;setBusy(p.id);try{const updated=await renameProject(session,p.id,name);setProjects(items=>items.map(item=>item.id===p.id?{...item,name:updated?.name??name}:item))}catch(e){setError(e instanceof Error?e.message:'Could not rename project')}finally{setBusy(null)}}
 const remove=async(p:ProjectRow)=>{if(!window.confirm(`Delete “${p.name}” permanently?`))return;setBusy(p.id);try{await deleteProject(session,p.id);setProjects(items=>items.filter(item=>item.id!==p.id));if(currentId===p.id)onNew()}catch(e){setError(e instanceof Error?e.message:'Could not delete project')}finally{setBusy(null)}}
 const newPack=async()=>{setBusy('new');try{const row=await createProject(session);onOpen(row.id)}catch(e){setError(e instanceof Error?e.message:'Could not create project')}finally{setBusy(null)}}
 return <div className="modal" onClick={onClose}><div className="project-modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><span>YOUR TECH PACKS</span><div><button onClick={newPack} disabled={busy==='new'}>{busy==='new'?'Creating…':'+ New pack'}</button><button onClick={onClose}>Close</button></div></div>{error&&<div className="validation-warning">{error}</div>}{loading?<p>Loading projects…</p>:projects.length===0?<p>No saved tech packs yet.</p>:<div className="project-list">{projects.map(p=><div className={p.id===currentId?'project-row current':'project-row'} key={p.id}><div><strong>{p.name}</strong><small>Updated {new Date(p.updated_at).toLocaleString()}</small></div><div><button onClick={()=>onOpen(p.id)}>Open</button><button onClick={()=>rename(p)} disabled={busy===p.id}>Rename</button><button onClick={()=>remove(p)} disabled={busy===p.id}>Delete</button></div></div>)}</div>}<button onClick={refresh}>Refresh</button></div></div>
}
