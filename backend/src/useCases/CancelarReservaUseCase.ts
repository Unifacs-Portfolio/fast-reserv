import type { ReservaRepository } from '../repositories/ReservaRepository'

interface CancelarReservaRequest {
	mesaId: number
}

export class CancelarReservaUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}

	async execute({ mesaId }: CancelarReservaRequest): Promise<void> {
		const reservaStatus = await this.reservaRepository.findByMesaId(mesaId)
		if (!reservaStatus) {
			throw new Error('Reserva não existe')
		}
		await this.reservaRepository.cancelar(mesaId)
	}
}
