import { CriarRelatorioReservasPorGarcomUseCase } from '../CriarRelatorioReservasPorGarcomUseCase'
import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'

export const makeCriarRelatorioReservasPorGarcomUseCase =
	(): CriarRelatorioReservasPorGarcomUseCase => {
		const reservaRepository = new SqliteReservaRepository()
		const criarRelatorioReservasPorGarcomUseCase =
			new CriarRelatorioReservasPorGarcomUseCase(reservaRepository)
		return criarRelatorioReservasPorGarcomUseCase
	}
