import type { Reserva } from '../entities/Reserva'

export interface ReservaRepository {
	findByMesaId(mesaId: number): Promise<Reserva | null>
	create(reserva: Reserva): Promise<Reserva>
	cancelar(mesaId: number): Promise<void>
	findById(id: string): Promise<Reserva | null>
	update(
		id: string,
		data: Partial<{ status: string; verify_by: string | null }>,
	): Promise<void>
}
