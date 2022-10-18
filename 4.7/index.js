import {createServer} from 'http';
import {deleteGuitar, getGuitars, saveGuitar} from './data.js';
import {createList, getForm, getGuitarContent, view} from './content.js';
import {parse} from 'querystring';

const server = createServer((request, response) => {
    // /delete/id
    // /add
    const parts = request.url.split('/');
    const guitars = getGuitars();

    if (request.method === 'POST') {

        let body = '';

        request.on('readable', () => {
            const data = request.read();

            if (data !== null) {
                body += data;
            }
        });

        request.on('end', () => {
            const guitar = parse(body);

            saveGuitar({
                make: guitar.guitar_make,
                model: guitar.guitar_model
            });

            redirect(response, '/');
        })



    } else {
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
    }
});



function handleDelete(id) {
    deleteGuitar(id);
}

function redirect(response, to) {
    response.writeHead(302, {location: to, 'Content-Type': 'text/plain'});
    response.end(`Redirect to ${to}`);
}

server.listen(80, () => {
    console.log(`Server is listening at http://localhost:${server.address().port}`);
});