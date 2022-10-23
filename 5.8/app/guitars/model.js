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

export function getAll() {
    return Promise.resolve(guitars);
}

export function getById(id) {
    const guitar = guitars.find(g => g.id === id);

    return Promise.resolve(guitar);
}

export function getByMake(make) {
    const found = guitars.filter(g => g.make.toLowerCase() === make.toLowerCase());

    return Promise.resolve(found);
}

export function saveGuitar(guitar) {
    return Promise.resolve(true);
}