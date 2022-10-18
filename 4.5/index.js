import {createServer} from 'http';
import guitars from './data.js';

const server = createServer((request, response) => {
    // /delete/id
    const parts = request.url.split('/');

    if (parts.includes('delete')) {
        handleDelete(parts[2]);
        redirect(response, '/');
    } else {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });

        const url = new URL(request.url, 'http://localhost');

        const id = url.searchParams.get('id');

        const content = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Guitars</title>
        </head>
        <body style="font-size: 2rem">
            ${ id ? getGuitarContent(id) : createList() }
        </body>
        </html>`;

        response.end(content);

    }
});

const createList = () => `<h2>My Guitars</h2>
<ul>
    ${guitars.map(createListItem).join('\n')}
</ul>`;

const createListItem = ({id, make, model}) => `<li><a href="?id=${id}">${make} ${model}</a></li>`;

function getGuitarContent(id) {
    const guitar = guitars.find(g => g.id == id);

    if (guitar) {
        return `
            <h2>${guitar.make} ${guitar.model}</h2>
            <p><a href="/delete/${id}">Delete</a>
        `;
    } else {
        return '<p>Guitar does not exist</p>.';
    }
}

function handleDelete(id) {
    let index = guitars.findIndex(g => g.id == id);

    // TODO: check index

    guitars.splice(index, 1);
}

function redirect(response, to) {
    response.writeHead(302, {location: to, 'Content-Type': 'text/plain'});
    response.end(`Redirect to ${to}`);
}

server.listen(80, () => {
    console.log(`Server is listening at http://localhost:${server.address().port}`);
});