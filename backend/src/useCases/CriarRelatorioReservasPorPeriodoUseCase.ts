// LEMBRAR DE TROCAR DE NOME
import type { Reserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface CriarRelatorioRequest {
	dataInicio: string
	dataFim: string
}

export class CriarRelatorioUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}
	async execute({
		dataInicio,
		dataFim,
	}: CriarRelatorioRequest): Promise<Reserva[]> {
		const reservas = await this.reservaRepository.buscarReservasPorPeriodo(
			dataInicio,
			dataFim,
		)
		return reservas
	}
}
