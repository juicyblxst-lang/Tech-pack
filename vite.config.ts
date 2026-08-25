import type { Plugin } from 'vite'
import { defineConfig } from 'vite'

const projectManagerIntegration: Plugin = {
  name: 'tech-pack-project-manager-integration',
  enforce: 'pre',
  transform(code, id) {
    if (!id.endsWith('/src/main.tsx')) return null

    let next = code
      .replace(
        "import { getSession, signOut, saveProject, listProjects, loadProject, deleteProject, type AuthSession } from './core/auth'",
        "import { getSession, signOut, saveProject, loadProject, type AuthSession } from './core/auth'\nimport { ProjectManager } from './components/ProjectManager'"
      )
      .replace(
        /\{showProjects&&<ProjectModal session=\{session\} currentId=\{projectId\} onClose=\{\(\)=>setShowProjects\(false\)\} onOpen=\{openProject\} onDelete=\{removeProject\} onNew=\{createProject\}\/\}>\}/,
        "{showProjects&&<ProjectManager session={session} currentId={projectId} onClose={()=>setShowProjects(false)} onOpen={openProject} onNew={createProject}/>}"
      )
      .replace(/\nfunction ProjectModal\([\s\S]*?\ncreateRoot\(/, '\ncreateRoot(')

    if (next === code) {
      this.warn('Project manager integration transform found no matching source patterns.')
    }

    return { code: next, map: null }
  },
}

export default defineConfig({
  plugins: [projectManagerIntegration],
})
