const standup = require('../lib/standup');
const slackbot = require('../slackbot');

module.exports = (bot, msg) => {
    standup.start({userid: msg.user})
        .catch((err) => {
            console.error(err);
            slackbot.reply(msg, 'Unexpected error please contact an admin.');
        });
};
