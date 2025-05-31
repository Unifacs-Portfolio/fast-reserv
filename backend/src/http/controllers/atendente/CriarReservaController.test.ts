import { describe, it, expect } from 'vitest'
import { app } from '../../../app'
import supertest from 'supertest'
import { checkRouteExists } from '../../../utils/checkRouteExists'

describe('CriarReservaController', () => {
	it('deve ser possível criar uma reserva', async () => {
		const url = '/api/reservas'
		const response = await supertest(app)
			.post(url)
			.send({
				mesaId: 1,
				nomeResponsavel: 'João Silva',
				data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
				hora: '12:00',
				quantidadePessoas: 4,
			})
		expect(checkRouteExists(response, 'POST', url)).toBe(true)
		expect(response.status).toBe(201)
		expect(response.body).toHaveProperty('reserva')
		expect(response.body.reserva).toHaveProperty('id')
	})
})
