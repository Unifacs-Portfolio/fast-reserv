import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeCriarRelatorioUseCase } from '../../useCases/factories/makeCriarRelatorioUseCase'

const bodySchema = z.object({
	dataInicio: z.string().date(),
	dataFim: z.string().date(),
})

export const criarRelatorioController: RequestHandler = async (req, res) => {
	const { dataInicio, dataFim } = bodySchema.parse(req.body)
	const criarRelatorioUseCase = makeCriarRelatorioUseCase()

	const reserva = await criarRelatorioUseCase.execute({
		dataInicio,
		dataFim,
	})
	res.status(201).json(reserva)
}
