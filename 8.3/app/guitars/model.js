import mongoose from 'mongoose';

const guitarSchema = new mongoose.Schema({
    make: String,
    model: String,
    make_lower: String
});

const Guitar = mongoose.model('Guitar', guitarSchema);

// const guitar = new Guitar({
//     make: 'Fender',
//     model: 'Strat',
//     make_lower: 'fender'
// });

// guitar.save();

let id = 1;
const getId = () => id++;

const guitars = [
    {id: getId(), make: 'Fender', model: 'Strat'},
    {id: getId(), make: 'PRS', model: 'Starla'},
    {id: getId(), make: 'Gibson', model: 'Les Paul'},
    {id: getId(), make: 'PRS', model: 'Vela'},
];

export function addGuitar(make, model) {
    const guitar = {
        id: getId(),
        make,
        model
    };

    guitars.push(guitar);

    return Promise.resolve(guitar);
}

export async function getAll() {
    return await Guitar.find();
}

export function getById(id) {
    const guitar = guitars.find(g => g.id === id);

    return Promise.resolve(guitar);
}

export function getByMake(make) {
    const found = guitars.filter(g => g.make.toLowerCase() === make.toLowerCase());

    return Promise.resolve(found);
}

export function removeGuitar(guitar) {
    const index = guitars.indexOf(guitar);

    guitars.splice(index, 1);

    return Promise.resolve(true);
}

export function saveGuitar(guitar) {
    return Promise.resolve(true);
}