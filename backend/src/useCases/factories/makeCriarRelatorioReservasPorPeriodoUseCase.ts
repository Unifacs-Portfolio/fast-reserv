import { CriarRelatorioUseCase } from '../CriarRelatorioReservasPorPeriodoUseCase'
import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'

export const makeCriarRelatorioReservaPorPeriodoUseCase =
	(): CriarRelatorioUseCase => {
		const reservaRepository = new SqliteReservaRepository()
		const criarRelatorioReservaPorPeriodoUseCase = new CriarRelatorioUseCase(
			reservaRepository,
		)
		return criarRelatorioReservaPorPeriodoUseCase
	}
