const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;
const Schema = new mongoose.Schema({
    'name': {
        type: String,
        required: true,
        unique: true,
    },
    'code': {
        type: String,
        unique: true,
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

Schema.pre('save', function(next) {
    this.code = this.name.toLowerCase().replace(/ /g, '_');
});

function isCronFormat(v) {
    try{
        new CronJob(v);
        return true;
    } catch(err) {
        return false;
    }
}
