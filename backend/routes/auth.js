import express from 'express'
import bcrypt from 'bcrypt'
import { db } from '../db.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const [existingUsers] = await db.execute('SELECT id FROM users WHERE email = ?', [normalizedEmail])

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'Un compte existe deja avec cet email.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const [result] = await db.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name.trim(), normalizedEmail, passwordHash]
    )

    return res.status(201).json({
      message: 'Utilisateur cree avec succes.',
      user: {
        id: result.insertId,
        name: name.trim(),
        email: normalizedEmail
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({ message: 'Erreur serveur pendant l inscription.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe obligatoires.' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const [rows] = await db.execute(
      'SELECT id, name, email, password_hash FROM users WHERE email = ?',
      [normalizedEmail]
    )

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Identifiants invalides.' })
    }

    const user = rows[0]
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants invalides.' })
    }

    return res.json({
      message: 'Connexion reussie.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Erreur serveur pendant la connexion.' })
  }
})

export default router
