import {createServer} from 'http';
import guitars from './data.js';
import {createList, getForm, getGuitarContent, view} from './content.js';

const server = createServer((request, response) => {
    // /delete/id
    // /add
    const parts = request.url.split('/');

    if (parts.includes('delete')) {
        handleDelete(parts[2]);
        redirect(response, '/');
    } else {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });

        const url = new URL(request.url, 'http://localhost');

        const id = url.searchParams.get('id');
        let content = '';

        if (parts.includes('add')) {
            content = getForm();
        } else if (id) {
            let guitar = guitars.find(g => g.id == id);
            content = getGuitarContent(guitar);
        } else {
            content = createList(guitars);
        }

        response.end(view(content));

    }
});



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