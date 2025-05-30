import type { Reserva, StatusReserva } from '../entities/Reserva'

export interface GarcomRepository {
	updateByStatus(mesaId: number, status: StatusReserva): Promise<void>
	findByMesaId(mesaId: number): Promise<Reserva | null>
}
