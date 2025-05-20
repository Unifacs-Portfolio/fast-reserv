import { randomUUID } from 'node:crypto'
import { Reserva } from '../entities/Reserva'
import type { StatusReserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface CriarReservaRequest {
	mesaId: number
	nomeResponsavel: string
	data: Date
	hora: Date
	quantidadePessoas: number
	status?: StatusReserva
}

interface CriarReservaResponse {
	reserva: Reserva
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
		await this.reservaRepository.create(
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
		const reserva = await this.reservaRepository.findByMesaId(mesaId)
		if (!reserva) {
			throw new Error('Erro ao buscar reserva após criação')
		}
		return {
			reserva,
		}
	}
}
