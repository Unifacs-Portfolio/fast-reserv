import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeCriarReservaUseCase } from '../../../useCases/factories/makeCriarReservaUseCase'

const bodySchema = z.object({
	nomeResponsavel: z.string().min(1),
	data: z.string().date(),
	hora: z.string().time(),
	quantidadePessoas: z.number().int().positive().min(1),
	mesaId: z.number(),
})

export const criarReservaController: RequestHandler = async (req, res) => {
	const { nomeResponsavel, data, hora, quantidadePessoas, mesaId } =
		bodySchema.parse(req.body)
	const criarReservaUseCase = makeCriarReservaUseCase()
	try {
		const reserva = await criarReservaUseCase.execute({
			nomeResponsavel,
			data: new Date(data),
			hora: new Date(hora),
			quantidadePessoas,
			mesaId,
		})
		res.status(201).json(reserva)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro interno do servidor' })
	}
}
