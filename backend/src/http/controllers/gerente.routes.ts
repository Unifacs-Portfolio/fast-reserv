import { Router } from 'express'
import { criarRelatorioReservaPorPeriodoController } from './CriarRelatorioReservasPorPeriodoController'
import { criarRelatorioReservasPorMesaController } from './CriarRelatorioReservasPorMesaController'
import { criarRelatorioReservasPorGarcomController } from './CriarRelatorioReservasPorGarcomController'

const router = Router()
router.get('/relatorioMesa', criarRelatorioReservaPorPeriodoController)
router.get('/relatorioReserva/:mesaId', criarRelatorioReservasPorMesaController)
router.get(
	'/relatorioReservasPorGarcom/:garcomId',
	criarRelatorioReservasPorGarcomController,
)
export { router as gerenteRouter }
