import type { RequestHandler } from 'express'
import { makeBuscarMesasUseCase } from '../../useCases/factories/makeBuscarMesasUseCase'
import { BuscarMesasError } from '../../useCases/erros/BuscarMesasError'

export const buscarMesasController: RequestHandler = async (
	_req,
	res,
	next,
) => {
	try {
		const buscarMesasUseCase = makeBuscarMesasUseCase()
		const { mesas } = await buscarMesasUseCase.execute()
		res.status(200).json({ mesas })
		return
	} catch (error) {
		if (error instanceof BuscarMesasError) {
			res.status(400).json({ error: error.message })
			return
		}
		next(error)
	}
}
