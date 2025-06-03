import { Router } from 'express'
import { criarReservaController } from './CriarReservaController'
import { cancelarReservaController } from './CancelarReservaController'

const router = Router()
router.post('/reservas', criarReservaController)
router.delete('/reservas', cancelarReservaController)

export { router as atendenteRouter }
