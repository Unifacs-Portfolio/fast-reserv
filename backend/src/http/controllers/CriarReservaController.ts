import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeCriarReservaUseCase } from '../../useCases/factories/makeCriarReservaUseCase'
import { ReservaExistsError } from '../../useCases/erros/ReservaExistsError'
import { validateDataError } from '../../useCases/erros/validateDataError'
import { validateMesaError } from '../../useCases/erros/validateMesaError'
import { validateHoraError } from '../../useCases/erros/validateHoraError'
import { validateNomeError } from '../../useCases/erros/validateNomeError'

const bodySchema = z.object({
	nomeResponsavel: z.string().min(1),
	data: z.string().date(),
	hora: z.string().time(),
	quantidadePessoas: z.number().int().positive().min(1),
	mesaId: z.number(),
})

export const criarReservaController: RequestHandler = async (
	req,
	res,
	next,
) => {
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
		return
	} catch (error) {
		if (error instanceof ReservaExistsError) {
			res.status(400).json({ error: error.message })
			return
		}
		if (error instanceof validateDataError) {
			res.status(400).json({ error: error.message })
			return
		}
		if (error instanceof validateHoraError) {
			res.status(400).json({ error: error.message })
			return
		}
		if (error instanceof validateMesaError) {
			res.status(400).json({ error: error.message })
			return
		}
		if (error instanceof validateNomeError) {
			res.status(400).json({ error: error.message })
			return
		}
		if (error instanceof z.ZodError) {
			res.status(400).json({ error: error.errors })
			return
		}

		next(error)
	}
}
