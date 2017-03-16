const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    'id': String,
    'name': String,
    'created': Number,
    'creator': String,
    'is_archived': Boolean,
    'is_member': Boolean,
    'num_members': Number,
    'topic': {
        'value': String,
        'creator': String,
        'last_set': Number,
    },
    'purpose': {
        'value': String,
        'creator': String,
        'last_set': Number,
    },
},
{
  timestamps: true,
  strict: true,
});


module.exports = mongoose.model('Channel', Schema);
