export class ReservaExistsError extends Error {
	constructor() {
		super('A mesa já está ocupada por outra reserva.')
	}
}
