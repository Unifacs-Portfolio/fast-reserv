import type { RequestHandler } from 'express'
import { makeBuscarMesasUseCase } from '../../useCases/factories/makeBuscarMesasUseCase'

export const buscarMesasController: RequestHandler = async (_req, res) => {
	try {
		const buscarMesasUseCase = makeBuscarMesasUseCase()
		const { mesas } = await buscarMesasUseCase.execute()
		res.status(200).json({ mesas })
	} catch (error) {
		if (error instanceof BuscarMesasError) {
			res.status(400).json({ message: error.message })
		}
		return
	}
}
