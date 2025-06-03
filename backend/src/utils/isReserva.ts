import type { Reserva } from '../entities/Reserva'

export function isReserva(reserva: unknown): reserva is Reserva {
	return (
		typeof reserva === 'object' &&
		reserva !== null &&
		'id' in reserva &&
		'mesaId' in reserva &&
		'nomeResponsavel' in reserva &&
		'data' in reserva &&
		'hora' in reserva &&
		'quantidadePessoas' in reserva &&
		'status' in reserva &&
		typeof (reserva as Reserva).id === 'string' &&
		typeof (reserva as Reserva).mesaId === 'number' &&
		typeof (reserva as Reserva).nomeResponsavel === 'string' &&
		typeof (reserva as Reserva).data === 'string' &&
		typeof (reserva as Reserva).hora === 'string' &&
		typeof (reserva as Reserva).quantidadePessoas === 'number' &&
		typeof (reserva as Reserva).status === 'string'
	)
}
