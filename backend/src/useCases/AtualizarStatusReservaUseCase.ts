import { Reserva, type StatusReserva } from '../entities/Reserva'
import type { GarconRepository } from '../repositories/GarconRepository'
import type { ReservaRepository } from '../repositories/ReservaRepository'
import type { MesaRepository } from '../repositories/MesaRepository'
import { BuscarGarcomError } from './erros/BuscarGarcomError'
import { ReservaExistsError } from './erros/ReservaExistsError'
import { ReservaInexistenteError } from './erros/ReservaInexistenteError'
import { AtualizarReservaError } from './erros/AtualizarReservaError'

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
			throw new ReservaInexistenteError()
		}
		if (
			reservaEncontrada.status === 'cancelada' ||
			reservaEncontrada.status === 'confirmada'
		) {
			throw new AtualizarReservaError()
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
			throw new BuscarGarcomError()
		}

		const garcomEncontrado = await this.garconRepository.findById(garcomId)

		if (!garcomEncontrado) {
			throw new BuscarGarcomError()
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
		throw new ReservaExistsError()
	}
}
