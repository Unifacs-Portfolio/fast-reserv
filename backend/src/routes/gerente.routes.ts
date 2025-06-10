import { Router } from 'express'
import { criarRelatorioReservaPorPeriodoController } from '../http/controllers/CriarRelatorioReservasPorPeriodoController'
import { criarRelatorioReservasPorMesaController } from '../http/controllers/CriarRelatorioReservasPorMesaController'
import { criarRelatorioReservasPorGarcomController } from '../http/controllers/CriarRelatorioReservasPorGarcomController'

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
