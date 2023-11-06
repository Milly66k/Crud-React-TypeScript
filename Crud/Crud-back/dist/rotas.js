"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("./controladores/index");
const rotas = (0, express_1.Router)();
rotas.post('/account', index_1.cadastrarConta);
rotas.put('/account', index_1.atualizarConta);
rotas.get('/balance', index_1.consultarSaldo);
rotas.post('/withdraw', index_1.realizarSaque);
rotas.post('/transfer', index_1.realizarTransferencia);
rotas.post('/transaction', index_1.handleTransaction);
rotas.patch('/transaction/:id', index_1.cancelTransaction);
rotas.patch('/pay/:id', index_1.simulatePayment);
rotas.get('/transaction/:id', index_1.getTransaction);
exports.default = rotas;