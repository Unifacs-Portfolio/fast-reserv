import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeCriarRelatorioDeReservaPorMesaUseCase } from '../../../useCases/factories/makeCriarRelatorioDeReservaPorMesa'

const bodySchema = z.object({
	mesaId: z.number(),
})

export const criarRelatorioDeReservaPorMesaControllers: RequestHandler = async (
	req,
	res,
) => {
	const { mesaId } = bodySchema.parse(req.body)
	const criarRelatorioDeReservaPorMesaUseCase =
		makeCriarRelatorioDeReservaPorMesaUseCase()

	const reserva = await criarRelatorioDeReservaPorMesaUseCase.execute({
		mesaId,
	})
	res.status(201).json(reserva)
}
