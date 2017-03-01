const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    'created': Date,
    'modified': Date,
    'creator': String,
    'channel': String,
    'users': [String],
    'responses': [{
        'user': {
            name: String,
            slackid: String,
        },
        'answers': [{
            question: String,
            answer: String,
            color: String,
        }],
        'created': Date,
        'modified': Date,
    }],
});

Schema.pre('save', Save);

module.exports = mongoose.model('Report', Schema);

function Save(next) {
    const self = this;

    const now = Date.now();
    if(!self.created) {
        self.created(now);
    }
    self.modified(now);

    next();
}


/**
 * What is a Report?
 *      Time of answer
 *      Channel posted
 *      Responses
 *          User
 *
 */
