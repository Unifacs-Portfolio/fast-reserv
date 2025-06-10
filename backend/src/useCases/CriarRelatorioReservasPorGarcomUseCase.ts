import type { Reserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'
import { RelatorioReservaPorGarcomError } from './erros/RelatorioReservaPorGarcomError'

interface RelatorioReservasPorGarcomRequest {
	garcomId: string
}
interface RelatorioReservasPorGarcomResponse {
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

export class CriarRelatorioReservasPorGarcomUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}

	async execute({
		garcomId,
	}: RelatorioReservasPorGarcomRequest): Promise<RelatorioReservasPorGarcomResponse> {
		try {
			const reservas =
				await this.reservaRepository.buscarReservasFeitasPorGarcom(garcomId)
			return {
				reservas: reservas.map((reserva) => ({
					id: reserva.id,
					mesaId: reserva.mesaId,
					nomeResponsavel: reserva.nomeResponsavel,
					data: reserva.data,
					hora: reserva.hora,
					quantidadePessoas: reserva.quantidadePessoas,
					status: reserva.status,
					verify_by: reserva.verify_by,
				})),
			}
		} catch (error) {
			throw new RelatorioReservaPorGarcomError()
		}
	}
}
