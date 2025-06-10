import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeAtualizarReservaUseCase } from '../../useCases/factories/makeAtulizarStatusReservaUseCase'
import { ReservaExistsError } from '../../useCases/erros/ReservaExistsError'
import { ReservaInexistenteError } from '../../useCases/erros/ReservaInexistenteError'
import { BuscarGarcomError } from '../../useCases/erros/BuscarGarcomError'

const bodySchema = z.object({
	status: z.string(),
	garcomId: z.string().optional(),
})

export const atualizarStatusReservaController: RequestHandler = async (
	req,
	res,
	next,
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
		return
	} catch (error) {
		if (error instanceof BuscarGarcomError) {
			res.status(400).json({ error: error.message })
			return
		}
		if (error instanceof ReservaInexistenteError) {
			res.status(404).json({ error: error.message })
			return
		}
		if (error instanceof ReservaExistsError) {
			res.status(400).json({ error: error.message })
			return
		}
		next(error)
	}
}
