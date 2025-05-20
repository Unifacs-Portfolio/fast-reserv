import { configuratedb } from './Datenbank/configdb'
import express from 'express'
import { atendenteRouter } from './http/controllers/atendente/atendente.route'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configuratedb()
app.use('/api', atendenteRouter)

export { app }
