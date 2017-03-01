const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

// Nested Routes
const users = require('./users');
router.use('/users', users);

const standups = require('./standups');
router.use('/standups', standups);

module.exports = router;
