import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',ClienteController.lista)
router.get('/:id',ClienteController.item)
router.post('/registro', ClienteController.registro);
router.post('/', ClienteController.add);
router.put('/:id', ClienteController.update);
router.delete('/:id', ClienteController.delete);
router.post('/search',ClienteController.search);
export default router;
