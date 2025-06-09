import { SqliteGarconRepository } from '../../repositories/sqlite/SqliteGarconRepository'
import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'
import { SqliteMesaRepository } from '../../repositories/sqlite/SqliteMesaRepository'
import { AtualizarStatusReservaUseCase } from '../AtualizarStatusReservaUseCase'

export const makeAtualizarReservaUseCase =
	(): AtualizarStatusReservaUseCase => {
		const reservaRepository = new SqliteReservaRepository()
		const garconRepository = new SqliteGarconRepository()
		const mesaRepository = new SqliteMesaRepository() // Assuming mesaRepository is also handled by SqliteReservaRepository
		const atualizarReservaUseCase = new AtualizarStatusReservaUseCase(
			reservaRepository,
			garconRepository,
			mesaRepository,
		)
		return atualizarReservaUseCase
	}
