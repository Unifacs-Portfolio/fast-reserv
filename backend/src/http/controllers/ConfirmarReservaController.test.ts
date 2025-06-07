import { describe, it, expect, afterAll } from 'vitest'
import { setup } from '../../app'
import supertest from 'supertest'
import { checkRouteExists } from '../../utils/checkRouteExists'
import { env } from '../../env'
import { getConnection } from '../../Datenbank/configdb'

describe('ConfirmarReservaController', async () => {
	const app = await setup()
	afterAll(async () => {
		const connection = getConnection()
		await connection.close()
	})
	it.skip('deve ser possível confirmar uma reserva', async () => {
		const newReserva = await supertest(app).post('/api/reservas').send({
			mesaId: 1,
			nomeResponsavel: 'João Silva',
			data: '2025-07-06',
			hora: '12:00',
			quantidadePessoas: 4,
		})
		const url = `/api/reservas/${newReserva.body.reserva.id}`
		if (!env.GARCOM_ID_RANDOM) {
			throw new Error('GARCOM_ID_RANDOM não está definido.')
		}
		const response = await supertest(app).patch(url).send({
			garcomId: env.GARCOM_ID_RANDOM,
			status: 'confirmada',
		})
		expect(checkRouteExists(response, 'PATCH', url)).toBe(true)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('reserva')
		expect(response.body.reserva).toHaveProperty('id')
		expect(response.body.reserva).toHaveProperty(
			'verify_by',
			env.GARCOM_ID_RANDOM,
		)
		expect(response.body.reserva).toHaveProperty('status', 'confirmada')
	})
})
