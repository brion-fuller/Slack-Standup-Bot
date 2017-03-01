const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: 'All Users'});
});

router.post('/', (req, res) => {
    res.status(200).json({message: 'Save Users'});
});

module.exports = router;
