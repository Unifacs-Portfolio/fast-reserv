import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeAtualizarReservaUseCase } from '../../useCases/factories/makeAtulizarStatusReservaUseCase'

const bodySchema = z.object({
	status: z.string(),
	garcomId: z.string().optional(),
})

export const atualizarStatusReservaController: RequestHandler = async (
	req,
	res,
) => {
	try {
		const { status, garcomId } = bodySchema.parse(req.body)
		const id = req.params.id
		const atualizarReservaUseCase = makeAtualizarReservaUseCase()
		const reserva = await atualizarReservaUseCase.execute({
			id,
			status,
			garcomId,
		})
		res.status(200).json(reserva)
	} catch (error) {
		if (error instanceof AtualizarReservaError) {
			res.status(400).json({ message: error.message })
		}
	}
}
