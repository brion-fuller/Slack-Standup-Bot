const express = require('express');
const router = new express.Router({mergeParams: true});

// const Standups = require('../../app/models/Standups');

router.get('/', (req, res) => {
    res.send('OK');
});

module.exports = router;
