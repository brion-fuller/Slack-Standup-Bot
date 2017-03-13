const slack = require('../slack');
const _ = require('lodash');
const Message = require('../app/models/Message');

module.exports = function(bot, data) {
    slack.storage.users.get(data.message.user, (err, user) => {
        console.log(user);
    });
    if(data.message.user !== bot.identity.id) {
        let msg = _.extend(data, data.message);
        Message.findOne({'type': msg.type, 'user': msg.user, 'ts': msg.ts}).exec().then((doc) => {
            // console.log(doc.reply_message.ts);
            bot.api.chat.update({
                ts: doc.reply_message.ts,
                channel: doc.reply_message.channel,
                text: msg.text,
                as_user: true,
                username: doc.user,
            }, (data) => {
                // console.log(data);
            });
            // console.log(doc.reply_message);
        });
    }
};
