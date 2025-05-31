import { CriarRelatorioUseCase } from "../../useCases/CriarRelatorioUseCase";
import { SqliteReservaRepository } from "../../repositories/sqlite/SqliteReservaRepository";

export const makeCriarRelatorioUseCase = (): CriarRelatorioUseCase =>{
  const reservaRepository = new SqliteReservaRepository()
  const criarRelatorioUseCase = new CriarRelatorioUseCase(reservaRepository)
  return criarRelatorioUseCase
  
}
