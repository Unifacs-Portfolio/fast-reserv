import { randomUUID } from 'node:crypto'
import { Reserva } from '../entities/Reserva'
import type { StatusReserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'
import type { MesaRepository } from '../repositories/MesaRepository'

interface CriarReservaRequest {
	mesaId: number
	nomeResponsavel: string
	data: string
	hora: string
	quantidadePessoas: number
	status?: StatusReserva
	verify_by?: string
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
	private mesaRepository: MesaRepository

	constructor(
		reservaRepository: ReservaRepository,
		mesaRepository: MesaRepository,
	) {
		this.reservaRepository = reservaRepository
		this.mesaRepository = mesaRepository
	}

	async execute({
		mesaId,
		nomeResponsavel,
		data,
		hora,
		quantidadePessoas,
		status,
		verify_by,
	}: CriarReservaRequest): Promise<CriarReservaResponse> {
		try {
			const mesaExistente = await this.mesaRepository.findById(mesaId)
			if (mesaExistente.status === 'ocupada') {
				throw new Error('A mesa não está disponível para reserva')
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
					verify_by,
				}),
			)
			await this.mesaRepository.updateConfirmar(reservaCriada.mesaId)
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
		} catch (error) {
			throw new ReservaExistsError()
		}
	}
}
