import type { ReservaRepository } from '../repositories/ReservaRepository'

interface DeletarReservaRequest {
	mesaId: number
}

export class DeletarReservaUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}

	async execute({ mesaId }: DeletarReservaRequest): Promise<void> {
		const reservaStatus = await this.reservaRepository.findByMesaId(mesaId)
		if (!reservaStatus) {
			throw new Error('Reserva não existe')
		}
		await this.reservaRepository.delete(mesaId)
	}
}
