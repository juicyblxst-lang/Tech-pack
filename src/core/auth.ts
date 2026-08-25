export interface AuthUser { id:string; email?:string }
export interface AuthSession { access_token:string; refresh_token:string; user:AuthUser; expires_at?:number }
const SESSION_KEY='tech-pack-auth-session'
const URL=import.meta.env.VITE_SUPABASE_URL as string|undefined
const KEY=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string|undefined
export const authConfigured=Boolean(URL&&KEY)
export function getSession():AuthSession|null{try{const raw=localStorage.getItem(SESSION_KEY);return raw?JSON.parse(raw):null}catch{return null}}
export function clearSession(){localStorage.removeItem(SESSION_KEY)}
export function storeSession(session:AuthSession){localStorage.setItem(SESSION_KEY,JSON.stringify(session))}
async function request(path:string,body:unknown){if(!authConfigured)throw new Error('Authentication is not configured.');const r=await fetch(`${URL}${path}`,{method:'POST',headers:{'Content-Type':'application/json','apikey':KEY!},body:JSON.stringify(body)});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.msg||d.error_description||d.message||'Authentication failed');return d}
export async function signIn(email:string,password:string){const d=await request('/auth/v1/token?grant_type=password',{email,password});const s:AuthSession={access_token:d.access_token,refresh_token:d.refresh_token,user:{id:d.user.id,email:d.user.email},expires_at:d.expires_at};storeSession(s);return s}
export async function signUp(email:string,password:string){const d=await request('/auth/v1/signup',{email,password});if(!d.access_token)return null;const s:AuthSession={access_token:d.access_token,refresh_token:d.refresh_token,user:{id:d.user.id,email:d.user.email},expires_at:d.expires_at};storeSession(s);return s}
export async function signOut(){const s=getSession();if(s&&authConfigured)await fetch(`${URL}/auth/v1/logout`,{method:'POST',headers:{'apikey':KEY!,'Authorization':`Bearer ${s.access_token}`}}).catch(()=>{});clearSession()}
export async function saveProject(s:AuthSession,name:string,data:unknown,id?:string){const r=await fetch(`${URL}/rest/v1/tech_pack_projects${id?`?id=eq.${encodeURIComponent(id)}`:''}`,{method:id?'PATCH':'POST',headers:{'Content-Type':'application/json','apikey':KEY!,'Authorization':`Bearer ${s.access_token}`,'Prefer':'return=representation'},body:JSON.stringify({name,data,user_id:s.user.id})});if(!r.ok)throw new Error(await r.text());const rows=await r.json();return rows[0]}
export async function listProjects(s:AuthSession){const r=await fetch(`${URL}/rest/v1/tech_pack_projects?select=id,name,created_at,updated_at&order=updated_at.desc`,{headers:{'apikey':KEY!,'Authorization':`Bearer ${s.access_token}`}});if(!r.ok)throw new Error(await r.text());return r.json()}
export async function loadProject(s:AuthSession,id:string){const r=await fetch(`${URL}/rest/v1/tech_pack_projects?id=eq.${encodeURIComponent(id)}&select=*`,{headers:{'apikey':KEY!,'Authorization':`Bearer ${s.access_token}`}});if(!r.ok)throw new Error(await r.text());const rows=await r.json();return rows[0]??null}
