import { Reserva } from '../entities/Reserva'
import type { GarcomRepository } from '../repositories/GarcomRepository'

interface ConfirmarReservaRequest {
	mesaId: number
}
export class ConfirmarUseCase {
	private garcomRepository: GarcomRepository

	constructor(garcomRepository: GarcomRepository) {
		this.garcomRepository = garcomRepository
	}

	async execute({ mesaId }: ConfirmarReservaRequest): Promise<void> {
		const reservaEncontrada = await this.garcomRepository.findByMesaId(mesaId)

		if (!reservaEncontrada) {
			throw new Error('Reserva não encontrada')
		}

		reservaEncontrada.confirmarReserva()

		await this.garcomRepository.confirmar(
			reservaEncontrada.mesaId,
			reservaEncontrada.status,
		)
	}
}
