import { Router } from 'express'
import { criarReservaController } from './CriarReservaController'
import { cancelarReservaController } from './CancelarReservaController'

const router = Router()
router.post('/reserva', criarReservaController)
router.delete('/reserva', cancelarReservaController)

export { router as atendenteRouter }
