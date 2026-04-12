import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const FICHIER = join(process.cwd(), 'server/data/users.json')

function lire() {
  if (!existsSync(FICHIER)) return []
  return JSON.parse(readFileSync(FICHIER, 'utf-8'))
}

export default defineEventHandler((event) => {
  const { username } = getQuery(event)
  if (!username) return { disponible: false }
  const utilisateurs = lire()
  const disponible = !utilisateurs.some(
    (u) => u.username.toLowerCase() === String(username).toLowerCase()
  )
  return { disponible }
})
