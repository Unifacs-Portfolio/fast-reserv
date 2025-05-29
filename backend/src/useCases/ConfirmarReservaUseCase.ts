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
		const reservaid = await this.garcomRepository.findByMesaId(mesaId)

		if (!reservaid) {
			throw new Error('Reserva não encontrada')
		}
		const reserva = new Reserva(reservaid)
		reserva.confirmarReserva()

		await this.garcomRepository.confirmar(reserva.mesaId, reserva.status)
		console.log('terminou')
	}
}
