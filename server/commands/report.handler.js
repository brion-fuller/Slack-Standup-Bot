const startStandup = require('../lib/startUserStandup');

module.exports = (bot, msg) => {
    startStandup(msg.user)
        .catch((err) => {
            console.error(err);
            standupbot.replyWithTyping(msg, 'Unexpected error please contact an admin.');
        });
}