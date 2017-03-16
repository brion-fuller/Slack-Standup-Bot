const Promise = require('bluebird');
const _ = require('lodash');
const moment = require('moment-timezone');
const Cron = require('cron').CronJob;
const slackbot = require('../slackbot');
const Standup = require('../models/Standup');
const Report = require('../models/Report');

let jobs = {};

module.exports = {
    schedule: {
        all: scheduleAllStandups,
        standup: scheduleStandup,
        user: scheduleUserStandup,
    },
    start: startUserStandup,
    cancel: () => {
        console.log('nothing here');
    },
};

function startUserStandup({code, userid, user}) {
    if(userid) {
        user = _.find(slackbot.users, (user) => userid === user.id);
    }
    const date = moment().tz(user.tz);

    const standup = _findStandup({code, userid: user.id});
    const report = _findReport({date, code, userid: user.id});
    const directMsgChannel = _getDirectMessageChannel(userid);

    return Promise.join(standup, report, directMsgChannel, user, _runStandup);
}

function scheduleAllStandups() {
    return Standup.find({is_archived: false}).exec().then((standups) => {
        return _startAllStandups(standups);
    });
}

function scheduleStandup(code) {
    return Standup.findOne({code, is_archived: false}).exec().then((standup) => {
        return _startStandup(standup);
    });
}

function scheduleUserStandup({code, user}) {
    return Standup.findOne({code, is_archived: false, users: user}).exec().then((standup) => {
        return _createUserStandupJob(standup, user);
    });
}

function _findStandup({code, userid}) {
    return Standup.findOne({
        code,
        users: userid,
        is_archived: false,
    }).exec();
}

function _findReport({code, userid, date}) {
    // Get date range from standup (use as though UTC time)
    const lowerDate = moment(date).startOf('day').format('YYYY-MM-DTHH:mm:ss.SSS')+'Z';
    const upperDate = moment(date).endOf('day').format('YYYY-MM-DTHH:mm:ss.SSS')+'Z';
    return Report.findOne({
        'standup': code,
        'user': userid,
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
            user: userid,
            answers: [],
            reply_message: {},
        }).save();
    });
}

function _getDirectMessageChannel(userid) {
    return new Promise((resolve, reject) => {
        slackbot.bot.api.im.open({
            user: userid,
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function _runStandup(standup, report, msg, user) {
    // Change to promise and return
    slackbot.startPrivateConversation({user: user.id}, (err, convo) => {
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
            slackbot.replyWithTyping({channel: standup.channel}, message, (err, reply) => {
                report.reply_message = _.extend(reply, reply.message);
            });
            report.save();
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

function _createUserStandupJob({code, schedule}, userid) {
    const user = _.find(slackbot.users, (user) => userid === user.id);
    if(jobs[code] && jobs[code][userid]) {
        jobs[code][userid].stop();
    }
    if(!jobs[code]) {
        jobs[code] = {};
    }
    jobs[code][user] = new Cron({
        cronTime: schedule,
        onTick: function() {
            startUserStandup({code, user});
        },
        start: true,
        timeZone: user.tz,
    });
    return jobs[code][user];
}

function _startAllStandups(standups) {
    return _.reduce(standups, (res, standup) => {
        res[standup.channel] = _startStandup(standup);
        return res;
    }, {});
}

function _startStandup(standup) {
    return _.reduce(standup.users, (res, userid) => {
        res[userid] = _createUserStandupJob(standup, userid);
        return res;
    }, {});
}

