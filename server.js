import { fileURLToPath } from 'url';
import path, { dirname } from 'path';


import express from 'express'
import dotenv from "dotenv/config"
import cors from 'cors'
import colors from 'colors'

import userRoutes from './routes/userRoutes.js'
import collectionRoutes from './routes/collectionRoutes.js'
import cardRoutes from './routes/cardRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT || 5000
const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/collections', collectionRoutes)
app.use('/api/cards/', cardRoutes)

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log('__dirname', __dirname)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})