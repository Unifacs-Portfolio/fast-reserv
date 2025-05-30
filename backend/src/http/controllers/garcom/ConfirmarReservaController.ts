import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeConfirmarReservaUseCase } from '../../../useCases/factories/makeConfirmarReservaUseCase'

const bodySchema = z.object({
	mesaId: z.number(),
})

export const confirmarReservaController: RequestHandler = async (
	req,
	res,
	next,
) => {
	try {
		const { mesaId } = bodySchema.parse(req.body)
		const confirmarReservaUseCase = makeConfirmarReservaUseCase()
		await confirmarReservaUseCase.execute({ mesaId })
		res.status(200).send()
	} catch (error) {
		if (error instanceof Error && error.message === 'Reserva não encontrada') {
			res.status(404).json({ message: error.message })
		}
		next(error)
	}
}
