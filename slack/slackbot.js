const Botkit = require('botkit');

const token = process.env.SLACK_TOKEN || '';
const dbString = process.env.CONN_STRING || 'mongodb://localhost:27001/standupbot';

const mongoStorage = require('botkit-storage-mongo')({mongoUri: dbString});

const controller = Botkit.slackbot({storage: mongoStorage});

controller.spawn({token}).startRTM();

module.exports = {
    addAdminCommand: addAdminCommand,
    addBaseCommand: addBaseCommand,
    help: help,
};

let adminHelpText = [`*Admin Commands:*`];
let baseHelpText = [`*Commands:*`];

function addAdminCommand(command) {
    controller.hears(command.regex, ['direct_message', 'direct_mention'], command.func);
    adminHelpText.push(`\t${command.description}`);
}
function addBaseCommand(command) {
    controller.hears(command.regex, ['direct_message', 'direct_mention'], command.func);
    baseHelpText.push(`\t${command.description}`);
}
function help(bot, msg) {
    bot.api.users.info({user: msg.user}, (error, res) => {
         let message = [`Hello ${res.user.profile['first_name']}, below are the follow useful commands:`];
         if(res.user.is_admin) {
             message.concat(adminHelpText);
         }
         // Default Commands
         message.concat(baseHelpText);
        bot.replyWithTyping(msg, message.join('\n'));
     });
}
// const RtmClient = require('@slack/client').RtmClient;
// const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
// const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
// const EventEmitter = require('events').EventEmitter;
// const token = process.env.SLACK_TOKEN || '';
// const rtm = new RtmClient(token);
// const slackEvents = new EventEmitter;

// module.exports = slackEvents;

// rtm.start();

// rtm.on(RTM_EVENTS.MESSAGE, (msg) => {
//     // Ignore Self
//     if(!isSelf(msg)) {
//         if(isDirectMessage(msg)) {
//             slackEvents.emit('direct_message', msg);
//         }
//     }
// });

// slackEvents.on('direct_message', (msg) => {
//     console.log(msg);
// });

// function isDirectMessage(msg) {
//     return rtm.dataStore.getDMById(msg.channel) ? true : false;
// }
// function isSelf(msg) {
//     return (msg.user === rtm.activeUserId);
// }
