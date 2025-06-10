import type { RequestHandler } from 'express'
import { makeBuscarReservasUseCase } from '../../useCases/factories/makeBuscarReservasUseCase'

export const buscarReservasController: RequestHandler = async (_req, res) => {
	try {
		const buscarReservasUseCase = makeBuscarReservasUseCase()
		const { reservas } = await buscarReservasUseCase.execute()

		res.status(200).json({ reservas })
	} catch (error) {
		if (error instanceof BuscarReservasError) {
			res.status(400).json({ message: error.message })
		}
	}
	return
}
