import { Reserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface ConfirmarReservaRequest {
	id: string
	verify_by: string
}
export class ConfirmarUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}

	async execute({ id, verify_by }: ConfirmarReservaRequest): Promise<void> {
		const reservaEncontrada = await this.reservaRepository.findById(id)

		if (!reservaEncontrada) {
			throw new Error('Reserva não Encontrada')
		}

		await this.reservaRepository.update(reservaEncontrada.id, {
			status: 'confirmada',
			verify_by: verify_by,
		})
	}
}
