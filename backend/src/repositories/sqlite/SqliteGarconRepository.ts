import type { Database } from 'sqlite'
import type { GarconRepository } from '../GarconRepository'
import { Garcon } from '../../entities/Garcon'
import { isGarcom } from '../../utils/isGarcom'
import { getConnection } from '../../Datenbank/configdb'
import { isReserva } from '../../utils/isReserva'
import { Reserva } from '../../entities/Reserva'

export class SqliteGarconRepository implements GarconRepository {
	private db: Database
	constructor() {
		this.db = getConnection()
	}
	async findAll(): Promise<Garcon[]> {
		const garcons = await this.db.all('SELECT * FROM Garcon')
		return garcons.map((garcom) => {
			if (isGarcom(garcom)) {
				return new Garcon(garcom)
			}
			throw new Error('Dados do garçom inválidos.')
		})
	}
	async findById(garcomId: string): Promise<Garcon> {
		const garcom = await this.db.get('SELECT * FROM Garcon WHERE id = ?', [
			garcomId,
		])
		if (!garcom) {
			throw new Error('Garçom não encontrado.')
		}
		// falta criar um isGarcom para verificar se é garçom
		return garcom
	}
}
