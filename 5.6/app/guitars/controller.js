import {getAll, getById, getByMake} from './model.js';
import { view } from './view.js';

export async function listGuitars(req, res) {
    const guitars = await getAll();
    res.send(
        view('list', {
            guitars,
            title: 'My Guitars'
        })
    );
}

export async function showGuitar(req, res) {
    const id = parseInt(req.params.id, 10);

    if (id) {
        const guitar = await getById(id);

        if (!guitar) {
            res.send(404);
        } else {
            res.send(
                view('show', {guitar})
            );
        }
    } else {
        const found = await getByMake(req.params.id);

        if (found.length === 0) {
            res.send(404);
        } else {
            res.send(
                view('list', {
                    guitars: found,
                    title: `Guitars Made By ${found[0].make}`
                })
            );
        }
    }
}