import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'
import { BuscarReservasUseCase } from '../BuscarReservasUseCase'

export function makeBuscarReservasUseCase(): BuscarReservasUseCase {
	const sqliteReservaRepository = new SqliteReservaRepository()
	const buscarReservasUseCase = new BuscarReservasUseCase(
		sqliteReservaRepository,
	)

	return buscarReservasUseCase
}
