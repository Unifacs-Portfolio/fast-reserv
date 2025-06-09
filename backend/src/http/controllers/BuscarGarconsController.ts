import type { RequestHandler } from 'express'
import { makeBuscarGarconsUseCase } from '../../useCases/factories/makeBuscarGarconsUseCase'

export const buscarGarconsController: RequestHandler = async (_req, res) => {
	const buscarGarconsUseCase = makeBuscarGarconsUseCase()
	const { garcons } = await buscarGarconsUseCase.execute()
	res.status(200).json({ garcons })
}
