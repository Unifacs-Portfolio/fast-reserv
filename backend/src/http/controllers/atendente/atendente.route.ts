import { Router } from 'express'
import { criarReservaController } from './CriarReservaController'
import { deletarReservaController } from './DeletarReservaController'

const router = Router()
router.post('/reservas', criarReservaController)
router.delete('/reserva', deletarReservaController)

export { router as atendenteRouter }
