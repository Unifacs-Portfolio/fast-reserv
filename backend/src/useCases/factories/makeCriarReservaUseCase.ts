import { SqliteMesaRepository } from '../../repositories/sqlite/SqliteMesaRepository'
import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'
import { CriarReservaUseCase } from '../CriarReservaUseCase'

export const makeCriarReservaUseCase = (): CriarReservaUseCase => {
	const reservaRepository = new SqliteReservaRepository()
	const mesaRepository = new SqliteMesaRepository() // Assuming mesaRepository is also handled by SqliteReservaRepository
	const criarReservaUseCase = new CriarReservaUseCase(reservaRepository, mesaRepository)
	return criarReservaUseCase
}