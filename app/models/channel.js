const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    "id": {
        type: String,
        index: true,
    },
    "name": String,
    "created": Date,
    "creator": String,
    "is_archived": Boolean,
    "is_member": Boolean,
    "num_members": Number,
    "topic": {
        "value": String,
        "creator": String,
        "last_set": Date
    },
    "purpose": {
        "value": String,
        "creator": String,
        "last_set": Date
    }
});

module.exports = mongoose.model('Channel', Schema);