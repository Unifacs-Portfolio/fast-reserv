import type { RequestHandler } from 'express'
import { makeBuscarMesasUseCase } from '../../useCases/factories/makeBuscarMesasUseCase'

export const buscarMesasController: RequestHandler = async (_req, res) => {
	const buscarMesasUseCase = makeBuscarMesasUseCase()
	const { mesas } = await buscarMesasUseCase.execute()
	res.status(200).json({ mesas })
}
