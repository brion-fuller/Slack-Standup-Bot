const Standup = require('../app/models/Standup');
const slack = require('./slackbot');

module.exports = class Standup {
    constructor({channel, slack}) {
        this.channel = channel;
        this.slack = slack;
    }
    start(user) {
        // Find user in slack


    }

};
    //     controller.storage.questions.all((err, questions) => {
    //         if(err) {
    //             bot.replyWithTyping(msg, `Error occurred retrieving questions.`);
    //         }else if(!questions) {
    //             bot.replyWithTyping(msg, `No questions for standup.`);
    //         }else{
    //             bot.startConversation(msg, function(err, convo) {
    //                 if(err) {
    //                     bot.replyWithTyping(msg, 'Error occurred starting standup!');
    //                 }else{
    //                     convo.say(`Hello ${user.profile['first_name']}! It's time for our standup meeting. When you are ready please answer the following question:`);
    //                     controller.storage.questions.all((err, questions) => {
    //                         questions.forEach((question, i) => {
    //                             convo.ask(question.title, [
    //                                 {
    //                                     default: true,
    //                                     callback: (res, convo) => {
    //                                         formatAnswerToSlackAttachment(res, i, user, (err, answer) => {
    //                                             if(!err) {
    //                                                 controller.storage.standups.saveResponse(answer, res.ts, (err, num) => {
    //                                                     convo.next();
    //                                                 });
    //                                             }
    //                                         });
    //                                     },
    //                                 },
    //                             ]);
    //                         });
    //                     });
    //                     convo.on('end', function(convo) {
    //                         // console.log(convo);
    //                         if (convo.status=='completed') {
    //                             controller.storage.compactAll(() => {
    //                                 bot.replyWithTyping(msg, `Good job! :tada:`);
    //                             });
    //                         }else{
    //                             convo.say(`Reporting errored and closed unexpectedly.`);
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // };
