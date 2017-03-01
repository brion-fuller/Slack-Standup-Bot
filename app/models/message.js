const mongoose = require('mongoose');
const moment = require('moment');

const Schema = new mongoose.Schema({
    'type': {
        type: String,
        required: true,
    },
    'channel': String,
    'user': String,
    'text': String,
    'ts': {
        type: Date,
        set: (v) => moment.unix(v),
    },
    'source_team': String,
});

module.exports = mongoose.model('Message', Schema);

// { type: 'message',
//   channel: 'D2PMVUUN9',
//   user: 'U0PQ79739',
//   text: 'test',
//   ts: '1488085365.619002',
//   source_team: 'T0FUM56NT' }

// var t ={ type: 'message',
//   message:
//    { type: 'message',
//      user: 'U0PQ79739',
//      text: 'testing',
//      edited: { user: 'U0PQ79739', ts: '1488120306.000000' },
//      ts: '1488085365.619002' },
//   subtype: 'message_changed',
//   hidden: true,
//   channel: 'D2PMVUUN9',
//   previous_message:
//    { type: 'message',
//      user: 'U0PQ79739',
//      text: 'test',
//      ts: '1488085365.619002' },
//   event_ts: '1488120306.815169',
//   ts: '1488120306.815169' }
