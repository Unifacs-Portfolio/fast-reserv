import { describe, it, expect } from 'vitest'
import { app } from '../../../app'
import supertest from 'supertest'
import { checkRouteExists } from '../../../utils/checkRouteExists'

describe('CancelarReservaController', () => {
	it('deve ser possível cancelar uma reserva', async () => {
		const newReserva = await supertest(app)
			.post('/api/reservas')
			.send({
				mesaId: 1,
				nomeResponsavel: 'João Silva',
				data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
				hora: '12:00',
				quantidadePessoas: 4,
			})
		const url = `/api/reservas/${newReserva.body.reserva.id}/cancelar`
		const response = await supertest(app).patch(url).send()
		expect(checkRouteExists(response, 'PATCH', url)).toBe(true)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('reserva')
		expect(response.body.reserva).toHaveProperty('id')
		expect(response.body.reserva).toHaveProperty('status', 'cancelada')
	})
})
