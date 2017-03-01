const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    'name': {
        type: String,
        required: true,
    },
    'creator': {
        type: String,
        required: true,
    },
    'is_archived': {
        type: Boolean,
        default: false,
    },
    'questions': [
        {
            'question': String,
            'color': String,
        },
    ],
    'schedule': String,
    'channel': String,
},
{
  timestamps: true,
});


module.exports = mongoose.model('Standups', Schema);

