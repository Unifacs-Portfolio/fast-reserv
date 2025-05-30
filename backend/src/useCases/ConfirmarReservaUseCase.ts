import type { GarcomRepository } from '../repositories/GarcomRepository'
import { confirmarReserva } from '../utils/confirmaReserva'

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
			throw new Error('Reserva não Encontrada')
		}

		const reservaAtualizada = confirmarReserva(reservaEncontrada)

		await this.garcomRepository.updateByStatus(
			reservaAtualizada.mesaId,
			reservaAtualizada.status,
		)
	}
}
