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
		'verify_by' in reserva &&
		typeof reserva.id === 'string' &&
		typeof reserva.mesaId === 'number' &&
		typeof reserva.nomeResponsavel === 'string' &&
		typeof reserva.data === 'string' &&
		typeof reserva.hora === 'string' &&
		typeof reserva.quantidadePessoas === 'number' &&
		typeof reserva.status === 'string' &&
		(typeof reserva.verify_by === 'string' || reserva.verify_by === null)
	)
}
