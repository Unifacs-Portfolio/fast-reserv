import type { Reserva } from '../entities/Reserva'

export interface ReservaRepository {
	buscarReservasPorPeriodo(dataInicio: string, dataFim: string): unknown
	findByMesaId(mesaId: number): Promise<Reserva | null>
	create(reserva: Reserva): Promise<Reserva>
	findById(id: string): Promise<Reserva | null>
	update(id: string, reserva: Reserva): Promise<Reserva>
}
