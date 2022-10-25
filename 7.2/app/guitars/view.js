const views = {
    form(guitar) {
        let action = '/guitars',
            make = '',
            model = '';

        if (guitar) {
            action = `/guitars/${guitar.id}`;
            make = guitar.make;
            model = guitar.model;
        }

        return this._layout(`
        <form method="post" action="${action}">
            <div>
                Make: <input type="text" name="guitar_make" value="${make}" />
            </div>
            <div>
                Model: <input type="text" name="guitar_model" value="${model}" />
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
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