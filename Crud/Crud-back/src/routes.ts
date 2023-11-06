import { Router } from 'express';
import * as controller from './controller'; 

const routes = Router();

routes.get('/usuarios', controller.listUser);
routes.get('/usuarios/:id', controller.getUser);
routes.post('/usuarios', controller.createUser);
routes.put('/usuarios/:id', controller.updateUser);
routes.delete('/usuarios/:id', controller.removeUser);
routes.get('/usuarios/filtrar', controller.filterByDate);

export default routes;

