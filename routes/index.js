const routes = require('express').Router();

const channel = require('./channel');

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

routes.use('/channel', channel);

module.exports = routes;