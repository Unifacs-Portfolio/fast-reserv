import { Reserva, type StatusReserva } from '../entities/Reserva'
import type { GarconRepository } from '../repositories/GarconRepository'
import type { ReservaRepository } from '../repositories/ReservaRepository'
import type { MesaRepository } from '../repositories/MesaRepository'

interface AtualizarStatusReservaRequest {
	id: string
	status: string
	garcomId?: string
}

interface AtualizarStatusReservaResponse {
	reserva: {
		id: string
		mesaId: number
		nomeResponsavel: string
		data: string
		hora: string
		quantidadePessoas: number
		status: StatusReserva
		verify_by: string | null
	}
}

export class AtualizarStatusReservaUseCase {
	private reservaRepository: ReservaRepository
	private garconRepository: GarconRepository
	private mesaRepository: MesaRepository

	constructor(
		reservaRepository: ReservaRepository,
		garconRepository: GarconRepository,
		mesaRepository: MesaRepository,
	) {
		this.reservaRepository = reservaRepository
		this.garconRepository = garconRepository
		this.mesaRepository = mesaRepository
	}

	async execute({
		id,
		status,
		garcomId,
	}: AtualizarStatusReservaRequest): Promise<AtualizarStatusReservaResponse> {
		const reservaEncontrada = await this.reservaRepository.findById(id)

		if (!reservaEncontrada) {
			throw new Error('Reserva não existe')
		}
		if (
			reservaEncontrada.status === 'cancelada' ||
			reservaEncontrada.status === 'confirmada'
		) {
			throw new Error('Reserva Indisponivel para mudança de status')
		}

		if (status === 'cancelada') {
			const reservaAtualizada = new Reserva({
				id: reservaEncontrada.id,
				mesaId: reservaEncontrada.mesaId,
				nomeResponsavel: reservaEncontrada.nomeResponsavel,
				data: reservaEncontrada.data,
				hora: reservaEncontrada.hora,
				quantidadePessoas: reservaEncontrada.quantidadePessoas,
				status: 'cancelada',
			})
			await this.reservaRepository.update(id, reservaAtualizada)
			await this.mesaRepository.updateDisponibilizar(reservaEncontrada.mesaId)
			return {
				reserva: {
					id: reservaEncontrada.id,
					mesaId: reservaEncontrada.mesaId,
					nomeResponsavel: reservaEncontrada.nomeResponsavel,
					data: reservaEncontrada.data,
					hora: reservaEncontrada.hora,
					quantidadePessoas: reservaEncontrada.quantidadePessoas,
					status: reservaAtualizada.status,
					verify_by: reservaEncontrada.verify_by,
				},
			}
		}
		if (!garcomId) {
			throw new Error('Garçom não informada')
		}
		if (status === 'confirmada' && !garcomId) {
			throw new Error('Garçom é obrigatório para confirmar reserva')
		}

		const garcomEncontrado = await this.garconRepository.findById(garcomId)

		if (!garcomEncontrado) {
			throw new Error('Garçom não existe na tabela')
		}

		if (status === 'confirmada') {
			const reservaAtualizada = new Reserva({
				id: reservaEncontrada.id,
				mesaId: reservaEncontrada.mesaId,
				nomeResponsavel: reservaEncontrada.nomeResponsavel,
				data: reservaEncontrada.data,
				hora: reservaEncontrada.hora,
				quantidadePessoas: reservaEncontrada.quantidadePessoas,
				status: 'confirmada',
				verify_by: garcomId,
			})
			await this.reservaRepository.update(id, reservaAtualizada)
			await this.mesaRepository.updateDisponibilizar(reservaEncontrada.mesaId)
			return {
				reserva: {
					id: reservaAtualizada.id,
					mesaId: reservaAtualizada.mesaId,
					nomeResponsavel: reservaAtualizada.nomeResponsavel,
					data: reservaAtualizada.data,
					hora: reservaAtualizada.hora,
					quantidadePessoas: reservaAtualizada.quantidadePessoas,
					status: reservaAtualizada.status,
					verify_by: garcomId,
				},
			}
		}
		throw new Error('Status inválido para atualização da reserva')
	}
}
