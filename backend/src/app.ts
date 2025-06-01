import { configuratedb } from './Datenbank/configdb'
import express from 'express'
import { atendenteRouter } from './http/controllers/atendente/atendente.route'
import { gerenteRouter } from './http/controllers/gerente/gerente.route'
import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { env } from './env'
import path from 'node:path'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), 'frontend/public')))

configuratedb()
app.use('/api/atendente', atendenteRouter)
app.use('/api/gerente', gerenteRouter)
app.use(<ErrorRequestHandler>((err, _req, res, next) => {
	if (err instanceof ZodError) {
		res.status(400).json({ message: 'Validação falhou', issues: err.format() })
	}
	if (env.NODE_ENV !== 'production') {
		console.error(err)
	}
	res.status(500).json({ message: 'Erro interno do servidor' })
}))

export { app }
