import { Router } from 'express'
import { criarReservaController } from './CriarReservaController'

const router = Router()
router.post('/reserva', criarReservaController)

export { router as atendenteRouter }
