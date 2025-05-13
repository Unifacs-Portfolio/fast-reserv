import { configuratedb } from './Datenbank/configdb'
import express from 'express'

const app = express()

app.use(express.json())

export { app }
configuratedb()
