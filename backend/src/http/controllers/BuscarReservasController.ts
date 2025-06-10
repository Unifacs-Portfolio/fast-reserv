import type { RequestHandler } from 'express'
import { makeBuscarReservasUseCase } from '../../useCases/factories/makeBuscarReservasUseCase'
import { BuscarReservasError } from '../../useCases/erros/BuscarReservasError'

export const buscarReservasController: RequestHandler = async (
	_req,
	res,
	next,
) => {
	try {
		const buscarReservasUseCase = makeBuscarReservasUseCase()
		const { reservas } = await buscarReservasUseCase.execute()

		res.status(200).json({ reservas })
		return
	} catch (error) {
		if (error instanceof BuscarReservasError) {
			res.status(400).json({ error: error.message })
			return
		}
		next(error)
	}
}
