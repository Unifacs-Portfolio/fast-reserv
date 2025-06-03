import type { ReservaRepository } from '../ReservaRepository'
import type { Reserva } from '../../entities/Reserva'

export class InMemoryReservaRepository implements ReservaRepository {
	cancelar(mesaId: number): Promise<void> {
		throw new Error('Method not implemented.')
	}
	update(
		id: string,
		data: Partial<{ status: string; verify_by: string | null }>,
	): Promise<void> {
		throw new Error('Method not implemented.')
	}
	async findById(id: string): Promise<Reserva | null> {
		return this.reservas.find((reserva) => reserva.id === id) || null
	}
	public reservas: Reserva[] = []
	async create(reserva: Reserva): Promise<Reserva> {
		this.reservas.push(reserva)
		return reserva
	}
	async findByMesaId(mesaId: number): Promise<Reserva | null> {
		return this.reservas.find((reserva) => reserva.mesaId === mesaId) || null
	}

	async delete(mesaId: number): Promise<void> {
		this.reservas = this.reservas.filter((reserva) => reserva.mesaId !== mesaId)
	}
}
