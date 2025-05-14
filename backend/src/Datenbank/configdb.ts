import { Database } from 'sqlite3'
import { open } from 'sqlite'
import dotenv from 'dotenv'

dotenv.config()

export async function openDb() {
	return open({
		filename: process.env.PATH_TO_DB || './backend/src/BasisData/database.db',
		driver: Database,
	})
}

// Criação de tabelas
export async function createTableMesa() {
	openDb().then((db) => {
		db.exec(
			'CREATE TABLE IF NOT EXISTS Mesa (numero INTEGER PRIMARY KEY, status TEXT)',
		)
	})
}

export async function createTableReserva() {
	openDb().then((db) => {
		db.exec(
			'CREATE TABLE IF NOT EXISTS Reserva (id INTEGER PRIMARY KEY AUTOINCREMENT, numeroMesa INTEGER,nomeResponsavel TEXT UNIQUE, qtdPessoas INTEGER, data TEXT, hora TEXT, statusUtilizadas TEXT,garcom TEXT,FOREIGN KEY (numeroMesa) REFERENCES Mesa(numero))',
		)
	})
}

// Executar a tabela e banco
export async function configuratedb() {
	await createTableMesa()
	await createTableReserva()
}
