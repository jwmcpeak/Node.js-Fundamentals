import { Router } from 'express';
import { createGuitar, deleteGuitar, editGuitar, listGuitars, showGuitar, storeGuitar, updateGuitar } from './controller.js';
export const routes = new Router();



// /guitars

routes.get('/', listGuitars);
routes.post('/', storeGuitar);
routes.get('/create', createGuitar);
routes.get('/:id/edit', editGuitar);
routes.get('/:id/delete', deleteGuitar);

routes.get('/:id', showGuitar);
routes.post('/:id', updateGuitar);
