export interface AuthUser { id:string; email?:string }
export interface AuthSession { access_token:string; refresh_token:string; user:AuthUser; expires_at?:number }
const SESSION_KEY='tech-pack-auth-session'
const URL=import.meta.env.VITE_SUPABASE_URL as string|undefined
const KEY=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string|undefined
export const authConfigured=Boolean(URL&&KEY)
export function getSession():AuthSession|null{try{const raw=localStorage.getItem(SESSION_KEY);return raw?JSON.parse(raw):null}catch{return null}}
export function clearSession(){localStorage.removeItem(SESSION_KEY)}
export function storeSession(session:AuthSession){localStorage.setItem(SESSION_KEY,JSON.stringify(session))}
async function request(path:string,body:unknown,token?:string){if(!authConfigured)throw new Error('Authentication is not configured.');const r=await fetch(`${URL}${path}`,{method:'POST',headers:{'Content-Type':'application/json','apikey':KEY!,...(token?{Authorization:`Bearer ${token}`}:{})},body:JSON.stringify(body)});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.msg||d.error_description||d.message||'Authentication failed');return d}
function toSession(d:any):AuthSession|null{if(!d?.access_token||!d?.user)return null;const s:AuthSession={access_token:d.access_token,refresh_token:d.refresh_token,user:{id:d.user.id,email:d.user.email},expires_at:d.expires_at};storeSession(s);return s}
export async function signIn(email:string,password:string){return toSession(await request('/auth/v1/token?grant_type=password',{email,password}))}
export async function signUp(email:string,password:string){return toSession(await request('/auth/v1/signup',{email,password}))}
export async function exchangeCode(code:string){return toSession(await request('/auth/v1/token?grant_type=pkce',{auth_code:code}))}
export async function refreshSession(){const s=getSession();if(!s)return null;try{return toSession(await request('/auth/v1/token?grant_type=refresh_token',{refresh_token:s.refresh_token}))}catch{clearSession();return null}}
export async function signOut(){const s=getSession();if(s&&authConfigured)await fetch(`${URL}/auth/v1/logout`,{method:'POST',headers:{'apikey':KEY!,'Authorization':`Bearer ${s.access_token}`}}).catch(()=>{});clearSession()}
function rest(path:string,s:AuthSession,init:RequestInit={}){return fetch(`${URL}${path}`,{...init,headers:{'Content-Type':'application/json','apikey':KEY!,'Authorization':`Bearer ${s.access_token}`,...(init.headers||{})}})}
export async function createProject(s:AuthSession,name='Untitled Tech Pack',data:unknown={}){const r=await rest('/rest/v1/tech_pack_projects',s,{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({name,data,user_id:s.user.id})});if(!r.ok)throw new Error(await r.text());const rows=await r.json();return rows[0]}
export async function saveProject(s:AuthSession,name:string,data:unknown,id?:string){if(id){const r=await rest(`/rest/v1/tech_pack_projects?id=eq.${encodeURIComponent(id)}`,s,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({name,data})});if(!r.ok)throw new Error(await r.text());const rows=await r.json();return rows[0]}return createProject(s,name,data)}
export async function listProjects(s:AuthSession){const r=await rest('/rest/v1/tech_pack_projects?select=id,name,created_at,updated_at&order=updated_at.desc',s);if(!r.ok)throw new Error(await r.text());return r.json()}
export async function loadProject(s:AuthSession,id:string){const r=await rest(`/rest/v1/tech_pack_projects?id=eq.${encodeURIComponent(id)}&select=*`,s);if(!r.ok)throw new Error(await r.text());const rows=await r.json();return rows[0]??null}
export async function renameProject(s:AuthSession,id:string,name:string){const r=await rest(`/rest/v1/tech_pack_projects?id=eq.${encodeURIComponent(id)}`,s,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({name})});if(!r.ok)throw new Error(await r.text());const rows=await r.json();return rows[0]}
export async function deleteProject(s:AuthSession,id:string){const r=await rest(`/rest/v1/tech_pack_projects?id=eq.${encodeURIComponent(id)}`,s,{method:'DELETE'});if(!r.ok)throw new Error(await r.text())}
