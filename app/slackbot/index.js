const controller = require('botkit').slackbot();
const _ = require('lodash');
const Cron = require('node-cron').CronJob;

let slackbot = {
    on: controller.on,
    hears: controller.hears,
    createConversation: controller.createConversation,
    startConversation: controller.startConversation,
    start,
    users: [],
};

module.exports = slackbot;

function start({token}, cb) {
    controller.spawn({token}).startRTM((err, bot, data) => {
        if(!err) {
            slackbot.users = data.users;
            initStandups();
        }
        if(typeof cb === 'function') {
            cb(err, bot, data);
        }
    });
};

const Message = require('../models/Message');

// controller.hears(['.*'], ['direct_message'], (bot, msg) => {
//     console.log('date', msg.ts);
//     bot.replyWithTyping(msg, msg, (err, data) => {
//         let replyMsg = _.extend({channel: data.channel}, data.message);
//         msg.reply_message = replyMsg;
//         new Message(msg).save((err) => {
//             console.log(err);
//         });
//     });
//     console.log(msg);
// });

const StandupModel = require('../models/Standup');

function initStandups() {
    StandupModel.find({is_archived: false}).exec().then((doc) => {
        _.forEach(doc, initStandup);
    });
    const privateData = new WeakMap();
    function initStandup({schedule, channel}) {
        // privateData.set('job', new Cron({cronTime: schedule, onTick: runStandup.bind(this, channel)}));
        function runStandup(channel) {
            // Always get new standup data from db
            StandupModel.findOne({is_archived: false, channel}).exec().then((doc) => {
                if(!doc || _.isEmpty(_.find(slackbot.channels, (c) => c.id === channel))) {
                    // No Longer a valid standup kill the job
                    privateData.get('job').stop();
                    console.log(`Standup ${channel} is no longer a valid standup.  Removed Schedule!`);
                }else{

                }
            });
        }
    }
}

StandupModel.findOne({is_archived: false, channel: '1'}).exec()
    .then(console.log);
