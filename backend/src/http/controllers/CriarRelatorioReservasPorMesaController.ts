import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeCriarRelatorioReservaPorMesaUseCase } from '../../useCases/factories/makeCriarRelatorioReservasPorMesaUseCase'

const bodySchema = z.object({
	mesaId: z.coerce.number(),
})

export const criarRelatorioReservasPorMesaController: RequestHandler = async (
	req,
	res,
) => {
	try {
		const { mesaId } = bodySchema.parse(req.params)
		const criarRelatorioReservasPorMesaUseCase =
			makeCriarRelatorioReservaPorMesaUseCase()

		const { reservas } = await criarRelatorioReservasPorMesaUseCase.execute({
			mesaId,
		})
		res.status(200).json({ reservas, mesaId })
	} catch (error) {
		if (error instanceof RelatorioReservaPorMesaError) {
			res.status(400).json({ message: error.message })
		}
	}
}
