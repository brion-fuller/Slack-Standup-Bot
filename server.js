const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');
const slackbot = require('./app/slackbot');

mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;
const dev = process.env.MODE || 'PROD';
const dbString = process.env.CONN_STRING || 'mongodb://localhost:27001/standupbot';
const token = process.env.SLACK_TOKEN || '';

mongoose.connect(dbString);
mongoose.set('debug', true);

mongoose.connection.once('open', () => {
    slackbot.start({token});
    require('./app/seed')();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./routes');
const report = require('./commands/report');

app.use('/api', routes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
