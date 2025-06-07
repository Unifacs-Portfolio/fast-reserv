import { Database } from 'sqlite3'
import { env } from '../../env'
import type { ReservaRepository } from '../ReservaRepository'
import type { GarconRepository } from '../GarconRepository'
import type { Garcon } from '../../entities/Garcon'

export class SqliteGarconRepository implements GarconRepository {
	private db: Database
	constructor() {
		this.db = new Database(env.PATH_TO_DB, (err) => {
			if (err) {
				throw new Error(`Erro ao conectar ao banco de dados: ${err.message}`)
			}
		})
	}
	async findById(garcomId: string): Promise<Garcon> {
		return new Promise((resolve, reject) => {
			this.db.get(
				'SELECT * FROM Garcon WHERE id = ?',
				[garcomId],
				(err, row: Garcon) => {
					if (err) {
						reject(new Error(`Erro ao buscar Garçom: ${err.message}`))
					} else {
						resolve(row)
					}
				},
			)
		})
	}
}
