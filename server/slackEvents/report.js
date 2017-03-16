const standupbot = require('../app/standupbot');

const startStandup = require('../app/standup');

standupbot.hears(['^report$'], ['direct_message'], (bot, msg) => {
    startStandup(msg.user)
        .catch((err) => {
            console.error(err);
            standupbot.replyWithTyping(msg, 'Unexpected error please contact an admin.');
        });
});
