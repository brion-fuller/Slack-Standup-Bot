const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Botkit = require('botkit');

mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;
const dev = process.env.MODE || 'PROD';
const dbString = process.env.CONN_STRING || 'mongodb://localhost:27001/standupbot';
const token = process.env.SLACK_TOKEN || '';

mongoose.connect(dbString);
// const mongoStorage = require('botkit-storage-mongo')({mongoUri: dbString});
// const controller = Botkit.slackbot({storage: mongoStorage});


mongoose.connection.once('open', () => {
    // controller.spawn({token}).startRTM();
    require('./app/seed')();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
