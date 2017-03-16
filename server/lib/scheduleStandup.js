const Standup = require('../models/Standup');
const Cron = require('cron').CronJob;
const _ = require('lodash');
const slackbot = require('../slackbot');
const startStandup = require('./standup');

let jobs = {};
module.exports = {
    start() {
        return Standup.find({is_archived: false}).exec().then((standups) => {
            jobs = _.reduce(standups, (res, standup) => {
                res[standup.channel] = scheduleStandup(standup);
                return res;
            }, {});
            return jobs;
        });
    },
    stop({channel, user}) {
        if(!channel && !user) {
            _(standupJobs)
                .flatMap()
                .flatMap()
                .each((job) => {
                    job.stop();
                });
            return {status: 'Success', message: 'Jobs all stopped'};
        }
        if(channel) {
            _(standupJobs[channel])
                .flatMap()
                .each((job) => {
                    job.stop();
                });
            return {status: 'Success', message: `Jobs all stopped for channel ${channel}`};
        }
        // Add others
    }
};

function scheduleStandup(standup) {
    return _.reduce(standup.users, (res, userid) => {
        res[userid] = scheduleUserStandup(standup.schedule, userid);
        return res;
    }, {});
}
function scheduleUserStandup(schedule, userid) {
    const user = _.find(this.bot.users, (user) => userid === user.id);
    const job = new Cron({
        cronTime: schedule,
        onTick: function() {
            startStandup(userid);
        },
        start: true,
        timeZone: user.tz,
    });
    return job;
}

/**
 * Maybe structure this differently
 * /Standup
 *      /schedule
 *          /all
 *          /channel
 *          /user
 *      /start
 *      /stop
 * 
 */