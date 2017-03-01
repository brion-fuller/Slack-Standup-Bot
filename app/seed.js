
const Standups = require('./models/Standups');
// const slack = require('./slack');

module.exports = () => {
    // Make a message
    Standups.findOne({}).exec()
        .then((doc) => {
            if(!doc) {
                const firstStandup = new Standups({
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
                    'channel': 'QOWIJDS',
                });
                firstStandup.save((err) => {
                    console.log(err);
                });
            }
        })
        .catch(() => {
            console.log('Error happened during seeding the database!');
    });
}
;
