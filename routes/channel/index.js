const routes = require('express').Router();
const Message = require('../../app/models/Message');

routes.get('/', (req, res) => {
    var query = Message.find({});
    var promise = query.exec();
    promise.then((doc) => {
        res.status(200).json({message: doc});
    });
});

routes.get('/:channelName', (req, res) => {
    var query = Message.findOne({});
    var promise = query.exec();
    promise.then((doc) => {
        res.status(200).json({message: doc});
    });
});

module.exports = routes;