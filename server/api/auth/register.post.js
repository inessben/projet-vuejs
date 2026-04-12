import { createHash } from 'node:crypto'
import { randomUUID } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'

const FICHIER = join(process.cwd(), 'server/data/users.json')

function lire() {
  if (!existsSync(FICHIER)) return []
  return JSON.parse(readFileSync(FICHIER, 'utf-8'))
}

function ecrire(data) {
  mkdirSync(dirname(FICHIER), { recursive: true })
  writeFileSync(FICHIER, JSON.stringify(data, null, 2), 'utf-8')
}

function hacher(mot) {
  return createHash('sha256').update(mot).digest('hex')
}

export default defineEventHandler(async (event) => {
  const { username, email, password } = await readBody(event)

  if (!username || !email || !password) {
    throw createError({ statusCode: 400, message: 'Champs manquants.' })
  }

  const utilisateurs = lire()
  const dejaExiste = utilisateurs.some(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  )

  if (dejaExiste) {
    throw createError({ statusCode: 409, message: "Ce nom d'utilisateur est déjà pris." })
  }

  const nouvel = {
    id: randomUUID(),
    username: username.trim(),
    email: email.trim(),
    passwordHash: hacher(password),
    createdAt: Date.now()
  }

  utilisateurs.push(nouvel)
  ecrire(utilisateurs)

  return { id: nouvel.id, username: nouvel.username, email: nouvel.email }
})
