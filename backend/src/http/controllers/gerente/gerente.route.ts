import { Router } from 'express'
import { criarRelatorioController } from './CriarRelatorioController'

const router = Router()
router.put('/relatorioMesa', criarRelatorioController)

export { router as gerenteRouter }
