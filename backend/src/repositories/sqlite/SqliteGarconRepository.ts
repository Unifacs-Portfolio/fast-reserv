import type { Database } from 'sqlite'
import type { GarconRepository } from '../GarconRepository'
import type { Garcon } from '../../entities/Garcon'
import { getConnection } from '../../Datenbank/configdb'

export class SqliteGarconRepository implements GarconRepository {
	private db: Database
	constructor() {
		this.db = getConnection()
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
	async buscarReservasPorGarcom(verify_by: string): Promise<Reserva[]> {
		return new Promise((resolve, reject) => {
			this.db.all(
				'SELECT * FROM Reserva WHERE verify_by = ?',
				[verify_by],
				(err, rows: Reserva[]) => {
					if (err) {
						reject(new Error(`Erro ao buscar reservas: ${err.message}`))
					} else {
						resolve(rows)
					}
				},
			)
		})
	}
}
