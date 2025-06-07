import { Router } from 'express'
import { criarReservaController } from '../controllers/CriarReservaController'
import { atualizarStatusReservaController } from './AtualizarStatusReservaController'

const router = Router()

router.post('/reservas', criarReservaController)
router.patch('/reservas/:id', atualizarStatusReservaController)

export { router as reservasRouter }
