import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeCriarRelatorioReservasPorGarcomUseCase } from '../../useCases/factories/makeCriarRelatorioReservasPorGarcomUseCase'
import { RelatorioReservaPorGarcomError } from '../../useCases/erros/RelatorioReservaPorGarcomError'

const bodySchema = z.object({
	garcomId: z.string(),
})

export const criarRelatorioReservasPorGarcomController: RequestHandler = async (
	req,
	res,
) => {
	try {
		const { garcomId } = bodySchema.parse(req.query)
		const criarRelatorioReservasPorGarcomUseCase =
			makeCriarRelatorioReservasPorGarcomUseCase()

		const { reservas } = await criarRelatorioReservasPorGarcomUseCase.execute({
			garcomId,
		})
		res.status(200).json({ reservas, garcomId })
	} catch (error) {
		if (error instanceof RelatorioReservaPorGarcomError) {
			res.status(400).json({ message: error.message })
		}
	}
	return
}
