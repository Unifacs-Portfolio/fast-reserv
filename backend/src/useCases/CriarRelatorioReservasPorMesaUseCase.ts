import type { Reserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface RelatorioReservaPorMesaRequest {
	mesaId: number
}

export class CriarRelatorioDeReservaPorMesaUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}

	async execute({
		mesaId,
	}: RelatorioReservaPorMesaRequest): Promise<Reserva[]> {
		const reservaExistente =
			await this.reservaRepository.buscarReservasFeitasPorMesa(mesaId)
		return reservaExistente
	}
}
