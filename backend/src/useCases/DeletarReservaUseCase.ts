import { Reserva } from '../entities/Reserva'
import type { StatusReserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface DeletarReservaRequest {
	mesaId: number
}
interface DeletarReservaResponse {
	status: boolean
}

export class DeletarReservaUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}

	async execute({ mesaId }: DeletarReservaRequest): Promise<void> {
		const reserva = await this.reservaRepository.deleteReservaByMesaId(mesaId)
		const reservaStatus = await this.reservaRepository.findByMesaId(mesaId)
		if (reservaStatus) {
			throw new Error('Reserva não foi deletada')
		}
	}
}
