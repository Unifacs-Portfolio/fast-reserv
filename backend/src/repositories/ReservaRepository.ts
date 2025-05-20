import type { Reserva } from '../entities/Reserva'

export interface ReservaRepository {
	create(reserva: Reserva): Promise<void>
	findByMesaId(mesaId: string): Promise<Reserva | null>
}
