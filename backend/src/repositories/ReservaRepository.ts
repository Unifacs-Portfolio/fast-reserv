import type { Reserva } from '../entities/Reserva'

export interface ReservaRepository {
	buscarReservasFeitasPorGarcom(
		garcomId: string,
		status: string,
	): Promise<Reserva[]>
	buscarReservasPorPeriodo(
		dataInicio: string,
		dataFim: string,
	): Promise<Reserva[]>
	buscarReservasFeitasPorMesa(mesaId: number): Promise<Reserva[]>
	findByMesaId(mesaId: number): Promise<Reserva | null>
	create(reserva: Reserva): Promise<Reserva>
	findById(id: string): Promise<Reserva | null>
	update(id: string, reserva: Reserva): Promise<Reserva>
	findAll(): Promise<Reserva[]>
}
