const routes = require('express').Router();
const Message = require('../../models/Message');

routes.get('/', (req, res) => {
    let query = Message.find({});
    let promise = query.exec();
    promise.then((doc) => {
        res.status(200).json({message: doc});
    });
});

routes.get('/:channelName', (req, res) => {
    let query = Message.findOne({});
    let promise = query.exec();
    promise.then((doc) => {
        res.status(200).json({message: doc});
    });
});

module.exports = routes;
