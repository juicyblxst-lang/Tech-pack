import type { AuthSession } from '../core/auth'
import { ProjectManager } from './ProjectManager'

export interface ProjectManagerBridgeProps {
  session: AuthSession
  currentId?: string
  onClose: () => void
  onOpen: (id: string) => Promise<void>
  onNew: () => void
}

/** Small integration boundary so the editor only depends on a stable component contract. */
export function ProjectManagerBridge(props: ProjectManagerBridgeProps) {
  return <ProjectManager {...props} />
}
