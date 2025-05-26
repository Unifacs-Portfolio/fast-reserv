import type { Reserva } from '../entities/Reserva'

export interface ReservaRepository {
	create(reserva: Reserva): Promise<void>
	findByMesaId(mesaId: number): Promise<Reserva | null>
	delete(mesaId: number): Promise<void>
}
