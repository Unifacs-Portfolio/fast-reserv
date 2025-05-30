import type { ReservaRequest } from '../Reserva'

export function isReservaRequest(obj: unknown): obj is ReservaRequest {
	if (typeof obj !== 'object' || obj === null) return false

	const reserva = obj as Partial<ReservaRequest>

	return (
		typeof reserva.id === 'string' &&
		typeof reserva.mesaId === 'number' &&
		typeof reserva.nomeResponsavel === 'string' &&
		typeof reserva.data === 'string' &&
		typeof reserva.hora === 'string' &&
		typeof reserva.quantidadePessoas === 'number' &&
		(reserva.status === undefined ||
			reserva.status === 'aguardando' ||
			reserva.status === 'confirmada' ||
			reserva.status === 'cancelada')
	)
}
