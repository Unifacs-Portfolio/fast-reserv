import { open } from 'sqlite'
import { Database } from 'sqlite3'
import { env } from '../env'

export async function openDb() {
	return open({
		filename: env.PATH_TO_DB,
		driver: Database,
	})
}

// Criação de tabelas
export async function createTableMesa() {
	openDb().then((db) => {
		db.exec(
			'CREATE TABLE IF NOT EXISTS Mesa (id INTEGER PRIMARY KEY, status TEXT)',
		)
	})
}

export async function createTableReserva() {
	openDb().then((db) => {
		db.exec(
			'CREATE TABLE IF NOT EXISTS Reserva (id TEXT PRIMARY KEY NOT NULL , mesaId INTEGER,nomeResponsavel TEXT UNIQUE, quantidadePessoas INTEGER, data TEXT, hora TEXT, status TEXT,FOREIGN KEY (mesaId) REFERENCES Mesa(id))',
		)
	})
}

// Executar a tabela e banco
export async function configuratedb() {
	await createTableMesa()
	await createTableReserva()
}
