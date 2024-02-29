import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/db.js'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

const app = express()

dotenv.config()
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
    res.end()
    return res.status(200)
  })
}

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  )
} else {
  app.use(
    cors({
      credentials: true,
    }),
  )
}

dbConnect()

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
