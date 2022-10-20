import { Router } from 'express';

export const routes = new Router();

const guitars = [
    {id: 1, make: 'Fender', model: 'Strat'},
    {id: 2, make: 'PRS', model: 'Starla'},
    {id: 3, make: 'Gibson', model: 'Les Paul'},
    {id: 4, make: 'PRS', model: 'Vela'},

];

// /guitars

routes.get('/', (req, res) => {
    res.send(guitars);
});

routes.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (id) {
        const guitar = guitars.find(g => g.id === id);

        if (!guitar) {
            res.send(404);
        } else {
            res.send(guitar);
        }
    } else {
        const found = guitars.filter(g => g.make.toLowerCase() === req.params.id);

        if (found.length === 0) {
            res.send(404);
        } else {
            res.send(found);
        }
    }

    

});

