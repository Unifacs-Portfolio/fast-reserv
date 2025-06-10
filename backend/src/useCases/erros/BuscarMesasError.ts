export class BuscarMesasError extends Error {
	constructor() {
		super('Não foi possível buscar as mesas disponíveis.')
	}
}
