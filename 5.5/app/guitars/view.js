const views = {
    list({guitars, title}) {
        const liElements = guitars.map(({id, make, model}) => 
            `<li><a href="/guitars/${id}">${make} ${model}</a></li>`);

        return this._layout(`
            <h2>${title}</h2>
            <ul>
                ${liElements.join('')}
            </ul>
        `);
    },
    show({guitar}) {
        return this._layout(`
            <h2>
                ${guitar.make} ${guitar.model}
            </h2>
        `);
    },
    _layout(content) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Guitars</title>
            <link rel="stylesheet" href="/assets/css/style.css" />
        </head>
        <body>
            ${ content }
        </body>
        </html>`;
    }
}


export const view = (name, data) => views[name](data);