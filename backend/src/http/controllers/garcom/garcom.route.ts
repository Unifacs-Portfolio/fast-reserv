import { Router } from 'express'
import { confirmarReservaController } from './ConfirmarReservaController'

const router = Router()
router.patch('/reservas/:id', confirmarReservaController)

export { router as garcomRouter }