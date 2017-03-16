const _ = require('lodash');
const slackbot = require('../slackbot');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const Standup = require('../models/Standup');
const Report = require('../models/Report');
/**
 * Check if user is in standup
 * Check if user is in multiple
 *      If so ask which standup
 * Check if standup is stil valid
 * Check if a report is made for the day
 *      If not create it
 * Check if user has record in answers
 *      If not create object in answers for user (tells if user completed or is in standup)
 *      if yes if cronjob then do nothing, if command report tell them they already completed standup
 * Loop over questions
 *      Ask the question
 *      record the reply message (import to updating on edit)
 *      End Conversation
 * Post formatted report to the channel linked to the standup
 * record posted message as reply_message for that user (used to update if user edits an answer)
 * done
 */
// TODO: make sure the bot can join the channel posting too
module.exports = function startUserStandup(userid) {
    const user = _.find(slackbot.users, (user) => userid === user.id);
    const date = moment().tz(user.tz);

    const standup = _findStandup(userid); /* Will need channel id in the future (multiple standups)*/
    const report = standup.then(({channel}) => _findReport({date, channel, user: userid}));
    const directMsgChannel = _getDirectMessageChannel(userid);

    return Promise.join(standup, report, directMsgChannel, (standup, report, msg) => {
        return _runStandup({standup, report, msg, user});
    });
};
function _findStandup(userId) {
    return Standup.findOne({
        users: userId,
        is_archived: false,
    }).exec();
}
function _findReport({channel, userId, date}) {
    // Get date range from standup (use as though UTC time)
    const lowerDate = moment(date).startOf('day').format('YYYY-MM-DTHH:mm:ss.SSS')+'Z';
    const upperDate = moment(date).endOf('day').format('YYYY-MM-DTHH:mm:ss.SSS')+'Z';
    return Report.findOne({
        'channel': channel,
        'user': userId,
        'createdAt': {
            $gte: lowerDate,
            $lte: upperDate,
        },
    }).exec()
    .then((doc) => {
        if(doc) {
            return doc;
        }
        return new Report({
            user: userId,
            channel: channel,
            answers: [],
            reply_message: {},
        }).save();
    });
}
function _getDirectMessageChannel(userId) {
    return new Promise((resolve, reject) => {
        slackbot.bot.api.im.open({
            user: userId,
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
function _runStandup({standup, user, msg, report}) {
    const bot = slackbot.bot;

    if(!standup) {
        return bot.replyWithTyping(msg, 'You are not currently in an active standup.  Please contact an admin.');
    }
    // Change to promise and return
    bot.startPrivateConversation({user: user.id}, (err, convo) => {
        // Standup (this should happen after all the checks)
        convo.say(`Hello! It's time for our standup meeting. When you are ready please answer the following question:`);
        // Reset Answers
        report.answers = [];
        // Queue up questions
        standup.questions.forEach((question) => {
            convo.ask(question.question, (res, convo) => {
                // Save Answer
                report.answers.push({
                    'question': question.question,
                    'color': question.color,
                    'message': res,
                });
                convo.next();
            });
        });
        convo.say(`Good job! :tada:`);
        convo.on('end', (convo) => {
            const message = {
                text: `*${user['real_name']}* standup notes for *${moment(standup.createdAt).format('DD MMM YYYY')}*.`,
                attachments: _.map(report.answers, _answerToSlackAttachment),
            };
            bot.replyWithTyping({channel: standup.channel}, message, (err, reply) => {
                report.reply_message = _.extend(reply, reply.message);
            });
            report.save((err) => {
                console.log(err); // Remove when promise as this will bubble up
            });
        });
        // End Standup
    });
}
function _answerToSlackAttachment({color, question, message}) {
    return {
        color,
        title: question,
        text: message.text,
        user: message.user,
    };
}
