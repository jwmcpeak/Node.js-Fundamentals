import { Router } from 'express';
import { createGuitar, listGuitars, showGuitar, storeGuitar } from './controller.js';
export const routes = new Router();



// /guitars

routes.get('/', listGuitars);
routes.post('/', storeGuitar);
routes.get('/create', createGuitar);
routes.get('/:id', showGuitar);