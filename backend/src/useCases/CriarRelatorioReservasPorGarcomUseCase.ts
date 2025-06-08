import type { Reserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface RelatorioReservasPorGarcomRequest {
	garcomId: string
	status: string
}

export class CriarRelatorioReservasPorGarcomUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}

	async execute({
		garcomId,
		status,
	}: RelatorioReservasPorGarcomRequest): Promise<Reserva[]> {
		const reservaExistente =
			await this.reservaRepository.buscarReservasFeitasPorGarcom(
				garcomId,
				status,
			)
		return reservaExistente
	}
}
