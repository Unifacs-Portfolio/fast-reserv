import type { RequestHandler } from 'express'
import { makeConfirmarReservaUseCase } from '../../../useCases/factories/makeConfirmarReservaUseCase'

export const confirmarReservaController: RequestHandler = async (
	req,
	res,
	next,
) => {
	try {
		const { Id } = req.params
		const mesaId = Number(Id)
		const confirmarReservaUseCase = makeConfirmarReservaUseCase()
		await confirmarReservaUseCase.execute({ mesaId })
		res.status(204).send(console.log('Reserva Confirmada'))
	} catch (error) {
		if (error instanceof Error && error.message === 'Reserva não Encontrada') {
			res.status(404).json({ message: error.message })
		}
		next(error)
	}
}
