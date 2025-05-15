import type { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
	nomeResponsavel: z.string().min(1),
	data: z.string().datetime(),
	hora: z.string().datetime(),
	quantidadePessoas: z.number().int().positive().min(1),
})

export async function criarReservaController(req: Request, res: Response) {
	const { nomeResponsavel, data, hora, quantidadePessoas } = bodySchema.parse(
		req.body,
	)
	try {
		// criarReservaUseCase
		console.log('Criando reserva...')
		return res.status(404).json({
			message: 'Not found',
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Erro interno do servidor' })
	}
}
