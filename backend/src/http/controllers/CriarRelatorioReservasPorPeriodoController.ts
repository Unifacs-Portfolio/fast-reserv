import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeCriarRelatorioReservaPorPeriodoUseCase } from '../../useCases/factories/makeCriarRelatorioReservasPorPeriodoUseCase'

const bodySchema = z.object({
	dataInicio: z.string().date(),
	dataFim: z.string().date(),
})

export const criarRelatorioReservaPorPeriodoController: RequestHandler = async (
	req,
	res,
) => {
	try {
		const { dataInicio, dataFim } = bodySchema.parse(req.query)
		const criarRelatorioReservaPorPeriodoUseCase =
			makeCriarRelatorioReservaPorPeriodoUseCase()

		const metricas = await criarRelatorioReservaPorPeriodoUseCase.execute({
			dataInicio,
			dataFim,
		})
		res.status(200).json(metricas)
	} catch (error) {
		if (error instanceof RelatorioReservaPorPeriodoError) {
			res.status(400).json({ message: error.message })
		}
	}
}
