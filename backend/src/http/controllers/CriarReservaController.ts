import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeCriarReservaUseCase } from '../../useCases/factories/makeCriarReservaUseCase'
import { ReservaExistsError } from '../../useCases/erros/ReservaExistsError'

const bodySchema = z.object({
	nomeResponsavel: z.string().min(1),
	data: z.string().date(),
	hora: z.string().time(),
	quantidadePessoas: z.number().int().positive().min(1),
	mesaId: z.number(),
})

export const criarReservaController: RequestHandler = async (req, res) => {
	try {
		const { nomeResponsavel, data, hora, quantidadePessoas, mesaId } =
			bodySchema.parse(req.body)
		const criarReservaUseCase = makeCriarReservaUseCase()
		const reserva = await criarReservaUseCase.execute({
			nomeResponsavel,
			data,
			hora,
			quantidadePessoas,
			mesaId,
		})
		res.status(201).json(reserva)
	} catch (error) {
		if (error instanceof ReservaExistsError) {
			res.status(400).json({ message: error.message })
		}
		return
	}
}
