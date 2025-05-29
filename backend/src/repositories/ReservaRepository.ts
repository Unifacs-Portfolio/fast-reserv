import type { Reserva } from '../entities/Reserva'

export interface ReservaRepository {
	create(reserva: Reserva): Promise<Reserva>
	findByMesaId(mesaId: number): Promise<Reserva | null>
	delete(mesaId: number): Promise<void>
}
