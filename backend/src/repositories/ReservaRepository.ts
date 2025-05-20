import type { Reserva } from '../entities/Reserva'

export interface ReservaRepository {
	create(reserva: Reserva): Promise<Reserva>
	findByMesaId(mesaId: string): Promise<Reserva | null>
}
