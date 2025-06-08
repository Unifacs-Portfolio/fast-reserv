import type { Reserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface BuscarReservasResponse {
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

export class BuscarReservasUseCase {
	constructor(private reservaRepository: ReservaRepository) {}
	async execute(): Promise<BuscarReservasResponse> {
		const reservas = await this.reservaRepository.findAll()
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
	}
}
