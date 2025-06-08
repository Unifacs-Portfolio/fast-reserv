export interface MesaRepository {
	updateConfirmar(id: number): Promise<void>
	updateDisponibilizar(id: number): Promise<void>
}
