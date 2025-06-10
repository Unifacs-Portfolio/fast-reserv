export class BuscarReservasError extends Error {
	constructor() {
		super('Não foi possível buscar a reserva.')
	}
}
