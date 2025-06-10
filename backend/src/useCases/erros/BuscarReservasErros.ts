class BuscarReservasError extends Error {
	constructor() {
		super('Não foi possível buscar as reservas disponíveis.')
	}
}
