const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const slackbot = require('./slackbot');
const standup = require('./lib/standup');
const commands = require('./commands');

mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;
const dev = process.env.MODE || 'PROD';
const dbString = process.env.MONGODB_STRING || '';
const token = process.env.SLACK_TOKEN || '';

mongoose.connect(dbString);
mongoose.set('debug', true);

mongoose.connection.once('open', () => {
    slackbot.start({token})
    .then((bot) => {
        standup.schedule.all();
        commands();
    })
    .catch((err) => {
        console.log(err);
    });
    require('./models/seed')();
});

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());

const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
