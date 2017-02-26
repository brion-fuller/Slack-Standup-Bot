const Message = require('./models/message');

module.exports = () => {
    //Make a message
    const promise = Message.findOne({}).exec();
    promise.then(doc => {
        if(!doc){
            var msg = new Message({
                type: 'message',
                channel: 'D2PMVUUN9',
                user: 'U0PQ79739',
                text: 'test',
                ts: '1488085365.619002',
                source_team: 'T0FUM56NT' 
            });
            msg.save((err) => {
                console.log(err);
            });
        }
    });
    promise.catch(() => {
        console.log('Error happened during seeding the database!');
    });
}