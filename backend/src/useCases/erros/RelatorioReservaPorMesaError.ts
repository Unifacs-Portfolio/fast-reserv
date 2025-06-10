export class RelatorioReservaPorMesaError extends Error {
	constructor() {
		super('Não foi possível encontrar reservas por mesa especificado.')
	}
}
