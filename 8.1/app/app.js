import express from 'express';
import {routes as guitarRoutes} from './guitars/routes.js';
import {routes as authRoutes} from './auth/routes.js';
import session from 'express-session';
import {create as createHandlebars} from 'express-handlebars';
import mongoose from 'mongoose';

const app = express();
const hbs = createHandlebars();

await mongoose.connect('mongodb+srv://<username>:<password>@cluster0.llcfyjj.mongodb.net/?retryWrites=true&w=majority')

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './app/views');


app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'birds fly high asdlkfjlksajdfsdafZXCV234asdf',
    saveUninitialized: false,
    resave: false
}));

app.use((req, res, next) => {
    if (req.session.user && req.session.user.isAuthenticated) {
        res.locals.user = req.session.user;
    }

    next();
});

app.use('/guitars', guitarRoutes);
app.use('/', authRoutes);


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sum/:a-:b', (req, res) => {
    res.send(`${parseInt(req.params.a) + parseInt(req.params.b)}`);
});

// / -- Home Page
// /guitars -- index page/list
// /guitars/id -- individual guitar by id

export function start() {
    app.listen(80, () => {
        console.log('Listening at http://localhost');
    });
}
