import express from 'express';
import {routes as guitarRoutes} from './guitars/index.js';

const app = express();

app.use('/guitars', guitarRoutes);

app.get('/', (req, res) => {
    res.send('Home Page');
});

// / -- Home Page
// /guitars -- index page/list
// /guitars/id -- individual guitar by id

export function start() {
    app.listen(80, () => {
        console.log('Listening at http://localhost');
    });
}
