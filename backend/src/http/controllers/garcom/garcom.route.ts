import { Router } from 'express'
import { confirmarReservaController } from './ConfirmarReservaController'

const router = Router()
router.put('/reserva', confirmarReservaController)

export { router as garcomRouter }
