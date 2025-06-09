import { Router } from 'express'
import { criarRelatorioReservaPorPeriodoController } from './CriarRelatorioReservasPorPeriodoController'
import { criarRelatorioReservasPorMesaController } from './CriarRelatorioReservasPorMesaController'
import { criarRelatorioReservasPorGarcomController } from './CriarRelatorioReservasPorGarcomController'

const router = Router()
router.get(
	'/relatorios/reservas-atendidas',
	criarRelatorioReservaPorPeriodoController,
)
router.get(
	'/relatorios/reservas-mesa/:mesaId',
	criarRelatorioReservasPorMesaController,
)
router.get(
	'/relatorios/mesas-confirmadas',
	criarRelatorioReservasPorGarcomController,
)
export { router as gerenteRouter }
