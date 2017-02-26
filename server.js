const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const port = process.env.PORT || 8080;
const dev = process.env.MODE || 'PROD';
const dbString = process.env.CONN_STRING || 'mongodb://localhost:27001/standupbot';

mongoose.connect(dbString);

mongoose.connection.once('open', () => {
    require('./app/seed')();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
