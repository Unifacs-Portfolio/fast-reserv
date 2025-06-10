import type { RequestHandler } from 'express'
import { makeBuscarGarconsUseCase } from '../../useCases/factories/makeBuscarGarconsUseCase'
import { BuscarGarcomError } from '../../useCases/erros/BuscarGarcomError'

export const buscarGarconsController: RequestHandler = async (
	_req,
	res,
	next,
) => {
	try {
		const buscarGarconsUseCase = makeBuscarGarconsUseCase()
		const { garcons } = await buscarGarconsUseCase.execute()
		res.status(200).json({ garcons })
		return
	} catch (error) {
		if (error instanceof BuscarGarcomError) {
			res.status(400).json({ error: error.message })
			return
		}
		next(error)
	}
}
