import express from 'express'
import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { configuratedb } from './Datenbank/configdb'
import { env } from './env'
import path from 'node:path'
import { reservasRouter } from './http/controllers/reservas.routes'
import { gerenteRouter } from './http/controllers/gerente.routes'

const setup = async () => {
	const app = express()
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(express.static(path.join(process.cwd(), 'frontend/public')))

	await configuratedb()
	app.use('/api', reservasRouter)
	app.use('/api', gerenteRouter)
	app.use(<ErrorRequestHandler>((err, _req, res, next) => {
		if (err instanceof ZodError) {
			res
				.status(400)
				.json({ message: 'Validação falhou', issues: err.format() })
			return
		}
		if (env.NODE_ENV !== 'production') {
			console.error(err)
		}
		res.status(500).json({ message: 'Erro interno do servidor' })
	}))
	return app
}
export { setup }
