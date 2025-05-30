import { Reserva } from '../entities/Reserva'

export function confirmarReserva(reserva: Reserva): Reserva {
	return new Reserva({
		id: reserva.id,
		mesaId: reserva.mesaId,
		nomeResponsavel: reserva.nomeResponsavel,
		data: reserva.data,
		hora: reserva.hora,
		quantidadePessoas: reserva.quantidadePessoas,
		status: 'confirmada', // sobrescreve o status
	})
}
