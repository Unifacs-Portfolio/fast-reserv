import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeCriarRelatorioReservasPorGarcomUseCase } from '../../useCases/factories/makeCriarRelatorioReservasPorGarcomUseCase'

const bodySchema = z.object({
	status: z.string(),
})

export const criarRelatorioReservasPorGarcomController: RequestHandler = async (
	req,
	res,
) => {
	const { garcomId } = req.params
	const { status } = bodySchema.parse(req.body)
	const criarRelatorioReservasPorGarcomUseCase =
		makeCriarRelatorioReservasPorGarcomUseCase()

	const reserva = await criarRelatorioReservasPorGarcomUseCase.execute({
		garcomId,
		status,
	})
	res.status(201).json(reserva)
}
