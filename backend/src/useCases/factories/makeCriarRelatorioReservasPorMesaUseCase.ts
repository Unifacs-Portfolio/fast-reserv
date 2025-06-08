import { CriarRelatorioDeReservaPorMesaUseCase } from '../CriarRelatorioReservasPorMesaUseCase'
import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'

export const makeCriarRelatorioReservaPorMesaUseCase =
	(): CriarRelatorioDeReservaPorMesaUseCase => {
		const reservaRepository = new SqliteReservaRepository()
		const criarRelatorioDeReservaPorMesaUseCase =
			new CriarRelatorioDeReservaPorMesaUseCase(reservaRepository)
		return criarRelatorioDeReservaPorMesaUseCase
	}
