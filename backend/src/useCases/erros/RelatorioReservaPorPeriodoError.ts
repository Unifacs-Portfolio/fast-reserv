export class RelatorioReservaPorPeriodoError extends Error {
	constructor() {
		super('Não foi possível encontrar reservas por periodo especificado.')
	}
}
