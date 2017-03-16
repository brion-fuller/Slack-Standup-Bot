const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    'id': String,
    'team_id': String,
    'name': String,
    'deleted': Boolean,
    'status': String,
    'color': String,
    'real_name': String,
    'tz': String,
    'tz_label': String,
    'tz_offset': Number,
    'profile': {
        'avatar_hash': String,
        'first_name': String,
        'last_name': String,
        'real_name': String,
        'email': String,
        'skype': String,
        'phone': String,
        'image_24': String,
        'image_32': String,
        'image_48': String,
        'image_72': String,
        'image_192': String,
    },
    'is_admin': Boolean,
    'is_owner': Boolean,
    'has_2fa': Boolean,
},
{
  timestamps: true,
  strict: true,
});


module.exports = mongoose.model('User', Schema);
