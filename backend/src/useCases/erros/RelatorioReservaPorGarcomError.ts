class RelatorioReservaPorGarcomError extends Error {
	constructor() {
		super('Não foi possível encontrar reservas para o garçom especificado.')
	}
}
