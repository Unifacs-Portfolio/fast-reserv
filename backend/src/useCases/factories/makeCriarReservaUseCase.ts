import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'
import { CriarReservaUseCase } from '../CriarReservaUseCase'

export const makeCriarReservaUseCase = (): CriarReservaUseCase => {
	const reservaRepository = new SqliteReservaRepository()
	const criarReservaUseCase = new CriarReservaUseCase(reservaRepository)
	return criarReservaUseCase
}
