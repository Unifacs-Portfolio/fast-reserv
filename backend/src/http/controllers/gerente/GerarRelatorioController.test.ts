import { describe, it, expect } from 'vitest'
import { app } from '../../../app'
import supertest from 'supertest'
import { checkRouteExists } from '../../../utils/checkRouteExists'
import { env } from '../../../env'
/**
 * Cliente Gerente
Envia mensagens ao servidor para solicitar relatórios de acompanhamento das
reservas.
Os relatórios devem ser:
• Relação de reservas atendidas ou não em um certo período.
• Relação de reservas feitas para determinada mesa
• Relação de mesas confirmadas por garçom.
Ao solicitar um relatório o gerente recebe os dados do relatório ou uma
mensagem informando que não há dados que atendem o relatório solicitado.
 */

describe('GerarRelatorioController', () => {
	it('deve ser possível gerar um relatório de reservas atendidas ou não em um certo período', async () => {
		if (!env.GARCOM_ID_RANDOM) {
			throw new Error(
				'GARCOM_ID_RANDOM não está definido no ambiente de teste.',
			)
		}
		const newReservaWithStatusPending = await supertest(app)
			.post('/api/reservas')
			.send({
				mesaId: 3,
				nomeResponsavel: 'Jane Doe',
				data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
				hora: '14:00',
				quantidadePessoas: 2,
			})
		const newReservaToConfirm = await supertest(app)
			.post('/api/reservas')
			.send({
				mesaId: 2,
				nomeResponsavel: 'John Doe',
				data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
				hora: '13:00',
				quantidadePessoas: 3,
			})
		const newReservaToCancel = await supertest(app)
			.post('/api/reservas')
			.send({
				mesaId: 1,
				nomeResponsavel: 'João Silva',
				data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
				hora: '12:00',
				quantidadePessoas: 4,
			})
		const urlToConfirm = `/api/reservas/${newReservaToConfirm.body.reserva.id}/confirmar`
		const reservaWithStatusConfirmed = await supertest(app)
			.patch(urlToConfirm)
			.send({
				garcomId: env.GARCOM_ID_RANDOM,
			})
		const urlToCancel = `/api/reservas/${newReservaToCancel.body.reserva.id}/cancelar`
		const reservaWithStatusCancelled = await supertest(app)
			.patch(urlToCancel)
			.send()
		const url = '/api/relatorios/reservas-atendidas'
		const response = await supertest(app)
			.get(url)
			.query({
				dataInicio: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
				dataFim: new Date(Date.now() + 1000 * 60 * 60 * 24)
					.toISOString()
					.split('T')[0], // Formato YYYY-MM-DD
			})
			.send()
		expect(checkRouteExists(response, 'GET', url)).toBe(true)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('metricas')
		expect(response.body.metricas).toHaveProperty('atendidas', 1)
		expect(response.body.metricas).toHaveProperty('pendentes', 1)
		expect(response.body.metricas).toHaveProperty('canceladas', 1)
		expect(response.body.metricas).toHaveProperty('total', 3)
	})
	it('deve ser possível gerar um relatório de reservas feitas para determinada mesa', async () => {
		if (!env.GARCOM_ID_RANDOM) {
			throw new Error(
				'GARCOM_ID_RANDOM não está definido no ambiente de teste.',
			)
		}
		const mesaIdAlvo = 1
		const newReserva = await supertest(app)
			.post('/api/reservas')
			.send({
				mesaId: mesaIdAlvo,
				nomeResponsavel: 'Alice',
				data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
				hora: '10:00',
				quantidadePessoas: 2,
			})
		await supertest(app)
			.patch(`/api/reservas/${newReserva.body.reserva.id}/confirmar`)
			.send({
				garcomId: env.GARCOM_ID_RANDOM,
			})
		const newReserva2 = await supertest(app)
			.post('/api/reservas')
			.send({
				mesaId: mesaIdAlvo,
				nomeResponsavel: 'Bob',
				data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
				hora: '11:00',
				quantidadePessoas: 4,
			})
		const url = `/api/relatorios/reservas-mesa/${mesaIdAlvo}`
		const response = await supertest(app).get(url).send()
		expect(checkRouteExists(response, 'GET', url)).toBe(true)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('mesaId', mesaIdAlvo)
		expect(response.body).toHaveProperty('reservas')
		expect(Array.isArray(response.body.reservas)).toBe(true)

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const ids = response.body.reservas.map((r: any) => r.id)

		expect(ids).toContain(newReserva.body.reserva.id)
		expect(ids).toContain(newReserva2.body.reserva.id)
		expect(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			response.body.reservas.every((r: any) => r.mesaId === mesaIdAlvo),
		).toBe(true)
	})
	it('deve ser possível gerar um relatório de mesas confirmadas por garçom', async () => {
		if (!env.GARCOM_ID_RANDOM) {
			throw new Error(
				'GARCOM_ID_RANDOM não está definido no ambiente de teste.',
			)
		}
		const mesaIdAlvo = 2
		const newReserva = await supertest(app)
			.post('/api/reservas')
			.send({
				mesaId: mesaIdAlvo,
				nomeResponsavel: 'Charlie',
				data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
				hora: '12:00',
				quantidadePessoas: 3,
			})
		const urlToConfirm = `/api/reservas/${newReserva.body.reserva.id}/confirmar`
		await supertest(app).patch(urlToConfirm).send({
			garcomId: env.GARCOM_ID_RANDOM,
		})
		const url = '/api/relatorios/mesas-confirmadas'
		const response = await supertest(app)
			.get(url)
			.query({ garcomId: env.GARCOM_ID_RANDOM })
			.send()
		expect(checkRouteExists(response, 'GET', url)).toBe(true)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('garcomId', env.GARCOM_ID_RANDOM)
		expect(response.body).toHaveProperty('reservas')
		expect(Array.isArray(response.body.reservas)).toBe(true)
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const reservas = response.body.reservas.map((r: any) => r.id)
		expect(reservas).toContain(mesaIdAlvo)
		expect(
			response.body.reservas.every(
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(r: any) => r.verify_by === env.GARCOM_ID_RANDOM,
			),
		).toBe(true)
	})
})
