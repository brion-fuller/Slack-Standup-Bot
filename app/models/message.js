const mongoose = require("mongoose");
const moment = require('moment');

const Schema = mongoose.Schema({
    "type": String,
    "channel": String,
    "user": String,
    "text": String,
    "ts": {
        type: Date,
        set: v => moment.unix(v)
    },
    "source_team": String
});

module.exports = mongoose.model('Message', Schema);

// { type: 'message',
//   channel: 'D2PMVUUN9',
//   user: 'U0PQ79739',
//   text: 'test',
//   ts: '1488085365.619002',
//   source_team: 'T0FUM56NT' }