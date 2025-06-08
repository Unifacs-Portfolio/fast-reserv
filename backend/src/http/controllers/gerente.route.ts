import { Router } from 'express'
import { criarRelatorioController } from './CriarRelatorioController'
import { criarRelatorioDeReservaPorMesaControllers } from './CriarRelatorioDeReservaPorMesaControllers'

const router = Router()
router.get('/relatorioMesa', criarRelatorioController)

router.get('/relatorioReserva', criarRelatorioDeReservaPorMesaControllers)
export { router as gerenteRouter }
