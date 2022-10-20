import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/greet', (req, res) => {
    res.send('Greetings, Earthling!');
});



app.listen(80, () => {
    console.log('Listening at http://localhost');
});