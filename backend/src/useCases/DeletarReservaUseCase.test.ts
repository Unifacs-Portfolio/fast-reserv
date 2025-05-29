import { describe, it, expect, beforeEach } from 'vitest'
import { DeletarReservaUseCase } from './DeletarReservaUseCase'
import { InMemoryReservaRepository } from '../repositories/inMemory/InMemoryReservaRepository'
import { CriarReservaUseCase } from './CriarReservaUseCase'

describe('DeletarReservaUseCase', async () => {
	let inMemoryReservaRepository: InMemoryReservaRepository
	let criarReservaUseCase: CriarReservaUseCase
	let systemUnderTest: DeletarReservaUseCase

	beforeEach(() => {
		inMemoryReservaRepository = new InMemoryReservaRepository()
		criarReservaUseCase = new CriarReservaUseCase(inMemoryReservaRepository)
		systemUnderTest = new DeletarReservaUseCase(inMemoryReservaRepository)
	})
	it('deve ser possível deletar uma reserva', async () => {
		const mesaId = 2
		await criarReservaUseCase.execute({
			mesaId,
			data: new Date().toISOString().split('T')[0],
			hora: '12:00',
			nomeResponsavel: 'João',
			quantidadePessoas: 4,
		})
		await systemUnderTest.execute({
			mesaId,
		})
		expect(inMemoryReservaRepository.reservas).toHaveLength(0)
		expect(await inMemoryReservaRepository.findByMesaId(mesaId)).toBeNull()
	})
	it('não deve ser possível deletar uma reserva que não existe', async () => {
		const mesaId = 3
		await expect(() =>
			systemUnderTest.execute({
				mesaId,
			}),
		).rejects.toThrow()
	})
	it('não deve ser possível deletar uma reserva com mesaId inválido', async () => {
		const mesaId = -1
		await expect(() =>
			systemUnderTest.execute({
				mesaId,
			}),
		).rejects.toThrow()
	})
	it('não deve ser possível deletar uma reserva com mesaId não numérico', async () => {
		const mesaId = 'abc' as unknown as number
		await expect(() =>
			systemUnderTest.execute({
				mesaId,
			}),
		).rejects.toThrow()
	})
	it('não deve ser possível deletar uma reserva com mesaId não informado', async () => {
		await expect(() =>
			systemUnderTest.execute({
				mesaId: undefined as unknown as number,
			}),
		).rejects.toThrow()
	})
})
