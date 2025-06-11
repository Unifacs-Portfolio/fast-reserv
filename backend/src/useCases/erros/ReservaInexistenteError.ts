export class ReservaInexistenteError extends Error {
	constructor() {
		super('Reserva inexistente.')
	}
}
