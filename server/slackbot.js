const Botkit = require('botkit');

const controller = Botkit.slackbot();

let slackbot = {
    on: controller.on,
    hears: controller.hears,
    createConversation: controller.createConversation,
    startConversation: controller.startConversation,
    start,
    users: [],
    bot: {},
};

module.exports = slackbot;

function start({token}) {
    let promise = new Promise((resolve, reject) => {
        controller.spawn({token}).startRTM((err, bot, data) => {
            if(err) {
                reject(err);
            }else{
                slackbot.users = data.users;
                slackbot.bot = bot;
                resolve(slackbot);
            }
        });
    });
    return promise;
};
