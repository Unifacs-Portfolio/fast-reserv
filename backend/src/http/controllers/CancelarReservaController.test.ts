import { describe, it, expect } from 'vitest'
import { app } from '../../app'
import supertest from 'supertest'
import { checkRouteExists } from '../../utils/checkRouteExists'

describe('CancelarReservaController', () => {
	it.skip('deve ser possível cancelar uma reserva', async () => {
		const newReserva = await supertest(app).post('/api/reservas').send({
			mesaId: 1,
			nomeResponsavel: 'João Silva',
			data: '2025-07-06',
			hora: '12:00',
			quantidadePessoas: 4,
		})
		const url = `/api/reservas/${newReserva.body.reserva.id}`
		const response = await supertest(app).patch(url).send({
			status: 'cancelada',
		})
		expect(checkRouteExists(response, 'PATCH', url)).toBe(true)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('reserva')
		expect(response.body.reserva).toHaveProperty('id')
		expect(response.body.reserva).toHaveProperty('status', 'cancelada')
	})
})
