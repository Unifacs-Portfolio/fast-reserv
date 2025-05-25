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

interface DeletarReservaRequest {
	mesaId: number
}

interface CriarReservaResponse {
	reserva: Reserva
}

interface DeletarReservaResponse {
	status: boolean
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
