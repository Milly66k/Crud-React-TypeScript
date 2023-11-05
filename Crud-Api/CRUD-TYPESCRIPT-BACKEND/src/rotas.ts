import { Router } from 'express';
import * as controlador from './controladores'; 

const rotas = Router();

rotas.get('/usuarios', controlador.listar);
rotas.get('/usuarios/:id', controlador.obter);
rotas.post('/usuarios', controlador.cadastrar);
rotas.put('/usuarios/:id', controlador.atualizar);
rotas.delete('/usuarios/:id', controlador.excluir);

export default rotas;

