import { randomUUID } from 'node:crypto'
import { Reserva } from '../entities/Reserva'
import type { StatusReserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface CriarRelatorioRequest {
    dataComeco: string
    dataFim: string
}

export class CriarRelatorioUseCase {
    private reservaRepository: ReservaRepository

    constructor(reservaRepository: ReservaRepository) {
        this.reservaRepository = reservaRepository
    }
    async execute({
      dataComeco,
      dataFim,
    }: CriarRelatorioRequest): Promise< any[]> {
      const reservaExistente = await this.reservaRepository.buscarReservasPorPeriodo(dataComeco,dataFim)
      const reservas: any[] = []
      if(reservaExistente){
        reservas.push(reservaExistente)
      }
      return reservas
    }
}