import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeDeletarReservaUseCase } from '../../../useCases/factories/makeCancelarReservaUseCase'

const bodySchema = z.object({
	mesaId: z.number(),
})

export const cancelarReservaController: RequestHandler = async (req, res) => {
	const { mesaId } = bodySchema.parse(req.body)
	const deletarReservaUseCase = makeDeletarReservaUseCase()

	await deletarReservaUseCase.execute({
		mesaId,
	})
	res.status(204).json()
}
