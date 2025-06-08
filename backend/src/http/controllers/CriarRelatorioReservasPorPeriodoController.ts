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
	const { dataInicio, dataFim } = bodySchema.parse(req.body)
	const criarRelatorioReservaPorPeriodoUseCase =
		makeCriarRelatorioReservaPorPeriodoUseCase()

	const reserva = await criarRelatorioReservaPorPeriodoUseCase.execute({
		dataInicio,
		dataFim,
	})
	res.status(201).json(reserva)
}
