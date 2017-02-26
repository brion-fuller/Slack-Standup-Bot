const routes = require('express').Router();
const Message = require('../../app/models/message');

routes.get('/', (req, res) => {
    var query = Message.find({});
    var promise = query.exec();
    promise.then((doc) => {
        res.status(200).json({message: doc});
    });
});

module.exports = routes;