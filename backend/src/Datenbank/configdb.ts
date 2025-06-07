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
			'CREATE TABLE IF NOT EXISTS Reserva (id TEXT PRIMARY KEY NOT NULL , mesaId INTEGER,nomeResponsavel TEXT UNIQUE, quantidadePessoas INTEGER, data TEXT, hora TEXT, verify_by TEXT,status TEXT,FOREIGN KEY (mesaId) REFERENCES Mesa(id), FOREIGN KEY(verify_by) REFERENCES Garcon(nome))',
		)
	})
}

export async function createTableGarcon() {
	openDb().then((db) => {
		db.exec(
			'CREATE TABLE IF NOT EXISTS Garcon (id TEXT PRIMARY KEY NOT NULL, nome TEXT UNIQUE)',
		)
	})
}

export async function insertGarcon() {
	openDb().then(async (db) => {
		await db.run('INSERT OR IGNORE INTO Garcon (id, nome) VALUES (? , ?)', [
			'690b0b36-0aa9-4b7f-9999-83860251c1d9',
			'Marcilio',
		])
	})
}

// Executar a tabela e banco
export async function configuratedb() {
	await createTableGarcon()
	await createTableMesa()
	await createTableReserva()
	await insertGarcon()
}
