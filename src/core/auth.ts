export interface AuthUser { id: string; email?: string }
export interface AuthSession { access_token: string; refresh_token: string; user: AuthUser; expires_at?: number }
const SESSION_KEY = 'tech-pack-auth-session'
export const authConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)
export function getSession(): AuthSession | null { try { const raw = localStorage.getItem(SESSION_KEY); return raw ? JSON.parse(raw) : null } catch { return null } }
export function clearSession() { localStorage.removeItem(SESSION_KEY) }
export function storeSession(session: AuthSession) { localStorage.setItem(SESSION_KEY, JSON.stringify(session)) }
