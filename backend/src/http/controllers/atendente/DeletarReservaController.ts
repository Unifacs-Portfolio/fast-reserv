import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeDeletarReservaUseCase } from '../../../useCases/factories/makeDeletarReservaUseCase'

const bodySchema = z.object({
	mesaId: z.number(),
})

export const deletarReservaController: RequestHandler = async (req, res) => {
	const { mesaId } = bodySchema.parse(req.body)
	const deletarReservaUseCase = makeDeletarReservaUseCase()

	const reserva = await deletarReservaUseCase.execute({
		mesaId,
	})
	res.status(201).json(reserva)
}
