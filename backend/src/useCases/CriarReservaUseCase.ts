import { randomUUID } from 'node:crypto'
import { Reserva } from '../entities/Reserva'
import type { StatusReserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface CriarReservaRequest {
	mesaId: number
	nomeResponsavel: string
	data: string
	hora: string
	quantidadePessoas: number
	status?: StatusReserva
}

interface CriarReservaResponse {
	reserva: {
		id: string
		mesaId: number
		nomeResponsavel: string
		data: string
		hora: string
		quantidadePessoas: number
		status: StatusReserva
	}
}

export class CriarReservaUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}

	async execute({
		mesaId,
		nomeResponsavel,
		data,
		hora,
		quantidadePessoas,
		status,
	}: CriarReservaRequest): Promise<CriarReservaResponse> {
		const reservaExistente = await this.reservaRepository.findByMesaId(mesaId)
		if (reservaExistente) {
			throw new Error('Já existe uma reserva para esta mesa')
		}
		const reservaCriada = await this.reservaRepository.create(
			new Reserva({
				id: randomUUID(),
				mesaId,
				nomeResponsavel,
				data,
				hora,
				quantidadePessoas,
				status,
			}),
		)
		return {
			reserva: {
				id: reservaCriada.id,
				mesaId: reservaCriada.mesaId,
				nomeResponsavel: reservaCriada.nomeResponsavel,
				data: reservaCriada.data,
				hora: reservaCriada.hora,
				quantidadePessoas: reservaCriada.quantidadePessoas,
				status: reservaCriada.status,
			},
		}
	}
}
