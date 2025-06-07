import { Reserva, type StatusReserva } from '../entities/Reserva'
import type { GarconRepository } from '../repositories/GarconRepository'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface AtualizarReservaRequest {
	id: string
	status: string
	garcomId?: string
}

interface AtualizarReservaResponse {
	reserva: {
		id: string
		mesaId: number
		nomeResponsavel: string
		data: string
		hora: string
		quantidadePessoas: number
		status: StatusReserva
		verify_by: string
	}
}

export class AtualizarReservaUseCase {
	private reservaRepository: ReservaRepository
	private garconRepository: GarconRepository

	constructor(
		reservaRepository: ReservaRepository,
		garconRepository: GarconRepository,
	) {
		this.reservaRepository = reservaRepository
		this.garconRepository = garconRepository
	}

	async execute({
		id,
		status,
		garcomId,
	}: AtualizarReservaRequest): Promise<AtualizarReservaResponse> {
		const reservaEncontrada = await this.reservaRepository.findById(id)
		console.log('POINT 2')

		if (!reservaEncontrada) {
			throw new Error('Reserva não existe')
		}
		console.log('POINT 3')
		if (
			reservaEncontrada.status === 'cancelada' ||
			reservaEncontrada.status === 'confirmada'
		) {
			throw new Error('Reserva Indisponivel para mudança de status')
		}
		console.log('POINT 4')
		if (status === 'confirmada' && !garcomId) {
			throw new Error('Garçom é obrigatório para confirmar reserva')
		}
		console.log('POINT 5')
		if (!garcomId) {
			throw new Error('Garçom não existe')
		}
		const garcomEncontrado = await this.garconRepository.findById(garcomId)
		console.log('POINT 6')
		if (!garcomEncontrado) {
			throw new Error('Garçom não existe')
		}
		console.log('POINT 7')
		let verify_by: string | undefined = undefined
		verify_by = garcomEncontrado.nome
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
			return {
				reserva: {
					id: reservaEncontrada.id,
					mesaId: reservaEncontrada.mesaId,
					nomeResponsavel: reservaEncontrada.nomeResponsavel,
					data: reservaEncontrada.data,
					hora: reservaEncontrada.hora,
					quantidadePessoas: reservaEncontrada.quantidadePessoas,
					status: reservaAtualizada.status,
					verify_by,
				},
			}
		}

		if (status === 'confirmada') {
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
			return {
				reserva: {
					id: reservaAtualizada.id,
					mesaId: reservaAtualizada.mesaId,
					nomeResponsavel: reservaAtualizada.nomeResponsavel,
					data: reservaAtualizada.data,
					hora: reservaAtualizada.hora,
					quantidadePessoas: reservaAtualizada.quantidadePessoas,
					status: reservaAtualizada.status,
					verify_by,
				},
			}
		}
		throw new Error('Status inválido para atualização da reserva')
	}
}
