const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    'user': String,
    'channel': String,
    'standup': String,
    'answers': [{
        question: String,
        color: String,
        message: {
            'type': {type: String},
            'subtype': String,
            'hidden': String,
            'channel': String,
            'user': String,
            'text': String,
            'ts': String,
            'bot_id': String,
            'source_team': String,
            'previous_message': {
                'type': {type: String},
                'user': String,
                'text': String,
                'ts': String,
            },
        },
    }],
    'reply_message': {
        'type': {type: String},
        'subtype': String,
        'hidden': String,
        'channel': String,
        'user': String,
        'text': String,
        'ts': String,
        'bot_id': String,
        'source_team': String,
        'previous_message': {
            'type': {type: String},
            'user': String,
            'text': String,
            'ts': String,
        },
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Report', Schema);
