import { Router } from 'express';
import { createGuitar, deleteGuitar, editGuitar, listGuitars, showGuitar, storeGuitar, updateGuitar } from './controller.js';
export const routes = new Router();

function checkAuth(req, res, next) {
    let isAuthenticated = false;

    if (isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
}

// /guitars

routes.get('/', listGuitars);
routes.post('/', checkAuth, storeGuitar);
routes.get('/create',checkAuth, createGuitar);
routes.get('/:id/edit', checkAuth, editGuitar);
routes.get('/:id/delete', checkAuth, deleteGuitar);

routes.get('/:id', showGuitar);
routes.post('/:id', checkAuth, updateGuitar);
