import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'
import { DeletarReservaUseCase } from '../DeletarReservaUseCase'

export const makeDeletarReservaUseCase = (): DeletarReservaUseCase => {
	const reservaRepository = new SqliteReservaRepository()
	const deletarReservaUseCase = new DeletarReservaUseCase(reservaRepository)
	return deletarReservaUseCase
}
