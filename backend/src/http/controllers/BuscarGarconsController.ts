import type { RequestHandler } from 'express'
import { makeBuscarGarconsUseCase } from '../../useCases/factories/makeBuscarGarconsUseCase'

export const buscarGarconsController: RequestHandler = async (_req, res) => {
	try {
		const buscarGarconsUseCase = makeBuscarGarconsUseCase()
		const { garcons } = await buscarGarconsUseCase.execute()
		res.status(200).json({ garcons })
	} catch (error) {
		if (error instanceof BuscarGarcomError) {
			res.status(400).json({ message: error.message })
		}
	}
	return
}
