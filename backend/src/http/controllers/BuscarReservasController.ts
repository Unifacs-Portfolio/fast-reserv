import type { RequestHandler } from 'express'
import { makeBuscarReservasUseCase } from '../../useCases/factories/makeBuscarReservasUseCase'

export const buscarReservasController: RequestHandler = async (_req, res) => {
	const buscarReservasUseCase = makeBuscarReservasUseCase()
	const { reservas } = await buscarReservasUseCase.execute()

	res.status(200).json({ reservas })
}
