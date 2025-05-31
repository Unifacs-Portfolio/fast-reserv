import { Database } from 'sqlite3'
import type { Reserva } from '../../entities/Reserva'
import { env } from '../../env'
import type { ReservaRepository } from '../ReservaRepository'

export class SqliteGarcomRepository implements ReservaRepository {
    private db: Database
	constructor() {
		this.db = new Database(env.PATH_TO_DB, (err) => {
			if (err) {
				throw new Error(`Erro ao conectar ao banco de dados: ${err.message}`)
			}
		})
	}
    async buscarReservasPorGarcom(dataComeco: string, dataFim: string ): Promise<any[]>{
		  return new Promise((resolve, reject) => {
   			this.db.all(
				`SELECT * FROM Reserva WHERE idGarcom = ?`,
				[idGarcom],
				(err,rows)=>{
						if(err){
							reject(new Error(`Erro ao buscar reservas: ${err.message}`))
						}else{
					resolve(rows)
        }
      }) 
    })
	}
}