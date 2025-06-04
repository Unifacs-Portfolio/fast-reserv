import { Router } from 'express'
import { criarReservaController } from './CriarReservaController'
import { cancelarReservaController } from './CancelarReservaController'

const router = Router()
router.post('/reservas', criarReservaController)
router.patch('/reservas/:id', cancelarReservaController)

export { router as atendenteRouter }
