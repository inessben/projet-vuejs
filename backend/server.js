import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import { db } from './db.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 3000)
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(
  cors({
    origin: clientUrl
  })
)
app.use(express.json())

app.get('/api/health', async (_req, res) => {
  try {
    await db.query('SELECT 1')
    res.json({ ok: true })
  } catch (error) {
    console.error('Healthcheck error:', error)
    res.status(500).json({ ok: false })
  }
})

app.use('/api', authRoutes)

app.listen(port, () => {
  console.log(`API disponible sur http://localhost:${port}`)
})
