// LEMBRAR DE TROCAR DE NOME
import type { Reserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface CriarRelatorioRequest {
	dataInicio: string
	dataFim: string
}

interface CriarRelatorioResponse {
	atendidas: number
	canceladas: number
	pendentes: number
	total: number
	reservas: {
		id: Reserva['id']
		mesaId: Reserva['mesaId']
		nomeResponsavel: Reserva['nomeResponsavel']
		data: Reserva['data']
		hora: Reserva['hora']
		quantidadePessoas: Reserva['quantidadePessoas']
		status: Reserva['status']
		verify_by: Reserva['verify_by']
	}[]
}

export class CriarRelatorioUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}
	async execute({
		dataInicio,
		dataFim,
	}: CriarRelatorioRequest): Promise<{ metricas: CriarRelatorioResponse }> {
		const reservas = await this.reservaRepository.buscarReservasPorPeriodo(
			dataInicio,
			dataFim,
		)
		const atendidas = reservas.filter((r) => r.status === 'confirmada').length
		const pendentes = reservas.filter((r) => r.status === 'aguardando').length
		const canceladas = reservas.filter((r) => r.status === 'cancelada').length

		return {
			metricas: {
				atendidas,
				canceladas,
				pendentes,
				total: reservas.length,
				reservas,
			},
		}
	}
}
