const slackbot = require('../app/slackbot');
const Standup = require('../app/models/Standup');
const Report = require('../app/models/Report');
const moment = require('moment-timezone');
const _ = require('lodash');

slackbot.hears(['^report$'], ['direct_message'], (bot, msg) => {
    const user = _.find(slackbot.users, (user) => msg.user === user.id);
    const currentDate = moment().tz(user.tz);
    // Get date range from standup (use as though UTC time)
    const lowerDate = moment(currentDate).startOf('day').format('YYYY-MM-DTHH:mm:ss.SSS')+'Z';
    const upperDate = moment(currentDate).endOf('day').format('YYYY-MM-DTHH:mm:ss.SSS')+'Z';

    Promise.all({
        standup: Standup.findOne({users: user, is_archived: false}).exec(),
        report: Report.findOne({'channel': standup.channel, 'user': user.id, 'createdAt': {$gte: lowerDate, $lte: upperDate}}),
    }).then(({standup, report}) => {
        // Check if a standup is available
        if(!standup) {
            return bot.replyWithTyping('You are not currently in an active standup.  Please contact an admin.');
        }
        // Check if report is already available
        if(report) {
            return bot.replyWithTyping('You have completed standup for the day.');
        }
        startUserStandup({standup, user, currentDate, bot});
    }).catch((err) => {
        console.error(err);
        bot.replyWithTyping('500 Internal Server Error. Please contact an admin.');
    });

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
});

/**
 * Standup report for user
 * Validation should of happened before this function
 * Questions should contain 1 or more
 *
 * @param {object} Args
 * @param {object} Args.standup
 * @param {object} Args.user
 * @param {object} Args.bot
 * @param {object} Args.msg
 */
function startUserStandup({standup, user, currentDate}) {
    let report = {
        user: user.id,
        channel: standup.channel,
        answers: [],
        reply_message: {},
    };
    bot.startPrivateConversation({user: user.id}, (err, convo) => {
        // Standup (this should happen after all the checks)
        convo.say(`Hello! It's time for our standup meeting. When you are ready please answer the following question:`);
        // Queue up questions
        standup.questions.forEach((question) => {
            convo.ask(question.question, (res, convo) => {
                // Save Answer
                report.answers.push({
                    'question': question.question,
                    'color': question.color,
                    'message': res,
                });
                Report.update(
                    {'channel': standup.channel, 'user': user.id, 'createdAt': {$gte: lowerDate, $lte: upperDate}},
                    {'$addToSet': {
                        'answers': {
                            'question': question.question,
                            'color': question.color,
                            'message': res,
                        },
                    }},
                    {new: true},
                    (err, doc) => {
                        if(err) {
                            console.log(err);
                        }else{
                            reportId = doc._id;
                            convo.next();
                        }
                    }
                );
            });
        });
        convo.say(`Good job! :tada:`);
        convo.on('end', (convo) => {
            Report.findOne({'_id': reportId}).exec().then((doc) => {
                const message = {
                    text: `*${user['real_name']}* standup notes for *${currentDate.format('DD MMM YYYY')}*.`,
                    attachments: _.map(doc.answers, answerToSlackAttachment),
                };
                bot.replyWithTyping({channel: standup.channel}, message, (err, reply) => {
                    const replyMessage = _.extend(reply, reply.message);
                    // Save posted message
                    Report.update(
                        {'channel': standup.channel, 'user': user.id, 'createdAt': {$gte: lowerDate, $lte: upperDate}},
                        {'reply_message': replyMessage},
                        {},
                        (err, doc) => {
                            if(err) {
                                console.log(err);
                            }else{
                                convo.next();
                            }
                        }
                    );
                });
            });
        });
        // End Standup
    });
}

function answerToSlackAttachment({color, question, message}) {
    return {
        color,
        title: question,
        text: message.text,
        user: message.user,
    };
}

function postReport({Report}) {
    Report.findOne({'channel': standup.channel, 'user': user.id, 'createdAt': {$gte: lowerDate, $lte: upperDate}}).exec().then((doc) => {
        const message = {
            text: `*${user['real_name']}* standup notes for *${currentDate.format('DD MMM YYYY')}*.`,
            attachments: _.map(doc.answers, answerToSlackAttachment),
        };
        bot.replyWithTyping({channel: standup.channel}, message, (err, reply) => {
            const replyMessage = _.extend(reply, reply.message);
            // Save posted message
            Report.update(
                {'channel': standup.channel, 'user': user.id, 'createdAt': {$gte: lowerDate, $lte: upperDate}},
                {'reply_message': replyMessage},
                {},
                (err, doc) => {
                    if(err) {
                        console.log(err);
                    }else{
                        convo.next();
                    }
                }
            );
        });
    });
}
