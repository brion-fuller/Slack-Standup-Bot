const mongoose = require('mongoose');
const CronJob = require('node-cron').CronJob;
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
    'questions': [{
            'question': String,
            'color': String,
    }],
    'users': [
        String,
    ],
    'schedule': {
        type: String,
        validate: {
            validator: isCronFormat,
            message: '{VALUE} is not in valid cron format',
        },
    },
    'channel': String,
},
{
  timestamps: true,
  strict: true,
});


module.exports = mongoose.model('Standup', Schema);

function isCronFormat(v) {
    try{
        new CronJob(v);
        return true;
    } catch(err) {
        return false;
    }
}
