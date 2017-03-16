const slackbot = require('../slackbot');

const report = require('./report.handler');

module.exports = function() {
    slackbot.hears(['^report$'], ['direct_message'], report);
};
