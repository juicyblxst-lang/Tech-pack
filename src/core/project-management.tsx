import { useEffect, useState } from 'react'
import { createProject, deleteProject, listProjects, renameProject, type AuthSession } from './auth'

type ProjectRow={id:string;name:string;created_at:string;updated_at:string}

export function ProjectManager({session,currentId,onOpen,onNew,onClose}:{session:AuthSession;currentId?:string;onOpen:(id:string)=>void;onNew:(id:string)=>void;onClose:()=>void}){
 const[projects,setProjects]=useState<ProjectRow[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[editing,setEditing]=useState<string|null>(null),[name,setName]=useState('')
 const refresh=()=>{setLoading(true);setError('');listProjects(session).then(setProjects).catch(e=>setError(e instanceof Error?e.message:'Could not load projects')).finally(()=>setLoading(false))}
 useEffect(refresh,[session])
 const create=async()=>{try{const row=await createProject(session);setProjects(p=>[row,...p]);onNew(row.id)}catch(e){setError(e instanceof Error?e.message:'Could not create project')}}
 const rename=async(id:string)=>{const value=name.trim();if(!value)return;try{const row=await renameProject(session,id,value);setProjects(p=>p.map(x=>x.id===id?{...x,...row}:x));setEditing(null)}catch(e){setError(e instanceof Error?e.message:'Could not rename project')}}
 const remove=async(id:string)=>{if(!window.confirm('Delete this tech pack permanently?'))return;try{await deleteProject(session,id);setProjects(p=>p.filter(x=>x.id!==id))}catch(e){setError(e instanceof Error?e.message:'Could not delete project')}}
 return <div className="modal" onClick={onClose}><div className="project-modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><span>YOUR TECH PACKS</span><div><button onClick={create}>+ New pack</button><button onClick={onClose}>Close</button></div></div>{error&&<div className="validation-warning">{error}</div>}{loading?<p>Loading projects…</p>:projects.length===0?<p>No saved tech packs yet.</p>:<div className="project-list">{projects.map(p=><div className={p.id===currentId?'project-row current':'project-row'} key={p.id}>{editing===p.id?<div><input autoFocus value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&rename(p.id)}/><button onClick={()=>rename(p.id)}>Save</button><button onClick={()=>setEditing(null)}>Cancel</button></div>:<><div><strong>{p.name}</strong><small>Updated {new Date(p.updated_at).toLocaleString()}</small></div><div><button onClick={()=>onOpen(p.id)}>Open</button><button onClick={()=>{setEditing(p.id);setName(p.name)}}>Rename</button><button onClick={()=>remove(p.id)}>Delete</button></div></>}</div>)}</div>}</div></div>
}
