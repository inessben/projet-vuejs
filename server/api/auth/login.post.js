import { createHash } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const FICHIER = join(process.cwd(), 'server/data/users.json')

function lire() {
  if (!existsSync(FICHIER)) return []
  return JSON.parse(readFileSync(FICHIER, 'utf-8'))
}

function hacher(mot) {
  return createHash('sha256').update(mot).digest('hex')
}

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  if (!username || !password) {
    throw createError({ statusCode: 400, message: 'Champs manquants.' })
  }

  const utilisateurs = lire()
  const utilisateur = utilisateurs.find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  )

  if (!utilisateur) {
    throw createError({ statusCode: 401, message: "Nom d'utilisateur introuvable." })
  }

  if (hacher(password) !== utilisateur.passwordHash) {
    throw createError({ statusCode: 401, message: 'Mot de passe incorrect.' })
  }

  return { id: utilisateur.id, username: utilisateur.username, email: utilisateur.email }
})
