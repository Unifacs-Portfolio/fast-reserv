import { SqliteGarconRepository } from '../../repositories/sqlite/SqliteGarconRepository'
import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'
import { AtualizarStatusReservaUseCase } from '../AtualizarStatusReservaUseCase'

export const makeAtualizarReservaUseCase =
	(): AtualizarStatusReservaUseCase => {
		const reservaRepository = new SqliteReservaRepository()
		const garconRepository = new SqliteGarconRepository()
		const atualizarReservaUseCase = new AtualizarStatusReservaUseCase(
			reservaRepository,
			garconRepository,
		)
		return atualizarReservaUseCase
	}
