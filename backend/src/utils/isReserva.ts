import type { Reserva } from '../entities/Reserva'

export function isReserva(reserva: unknown): reserva is {
	id: Reserva['id']
	mesaId: Reserva['mesaId']
	nomeResponsavel: Reserva['nomeResponsavel']
	data: Reserva['data']
	hora: Reserva['hora']
	quantidadePessoas: Reserva['quantidadePessoas']
	status: Reserva['status']
	verify_by: Reserva['verify_by']
} {
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
		typeof (reserva as Reserva).status === 'string' &&
		(typeof (reserva as Reserva).verify_by === 'string' ||
			(reserva as Reserva).verify_by === null)
	)
}
