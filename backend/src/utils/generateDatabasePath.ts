import path from 'node:path'

export function generateDatabasePath(dbPath: string): string {
	const dbDir = path.dirname(dbPath)
	return path.join(dbDir, `teste-${crypto.randomUUID()}.db`)
}
