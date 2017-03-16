const Standup = require('./Standup');
const Report = require('./Report');

module.exports = (bot) => {
    // Make a standup
    Standup.findOne({}).exec()
        .then((doc) => {
            if(!doc) {
                const firstStandup = new Standup({
                    'name': 'Test',
                    'creator': 'System',
                    'questions': [
                        {
                            'question': 'How are you?',
                            'color': '#ccc',
                        },
                        {
                            'question': '你好吗?',
                            'color': '#ccc',
                        },
                    ],
                    'schedule': '00 30 10 * * 1-5',
                    'channel': 'C2PMQURQC',
                    'users': [
                        'U0PQ79739',
                    ],
                });
                firstStandup.save((err) => {
                    console.log(err);
                });
            }
        })
        .catch(() => {
            console.log('Error happened during seeding the database!');
    });
    Report.findOne({}).exec()
        .then((doc) => {
            if(!doc) {
                new Report({
                    'user': 'U0PQ79739',
                    'channel': 'C2PMQURQC',
                }).save((err) => {
                    console.log(err);
                });
            }
        })
        .catch(() => {
            console.log('Error happened during seeding the database!');
    });
    // Update or Create User List
    // TODO: Bulk insert (only really needed are initial startup)
    // bot.api.users.list({}, (err, res) => {
    //     if(err) {
    //         console.log(err);
    //     }else{
    //         User.remove({}).exec().then((doc) => {
    //             res.members.forEach((user) => {
    //                 new User(user).save();
    //             });
    //         });
    //     }
    // });
    // Update or Create Channel List
    // TODO: Bulk insert (only really needed are initial startup)
    // bot.api.channels.list({}, (err, res) => {
    //     if(err) {
    //         console.log(err);
    //     }else{
    //         Channel.remove({}).exec().then((doc) => {
    //             res.channels.forEach((channel) => {
    //                 new Channel(channel).save();
    //             });
    //         });
    //     }
    // });
}
;
