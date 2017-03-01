const express = require('express');
const router = new express.Router();

const Standups = require('../../app/models/Standups');

router.get('/', (req, res) => {
    Standups.find({'is_archived': true}).limit(10).exec().then((doc) => {
        res.status(200).json(doc);
    });
});

router.get('/:channel', (req, res) => {
    Standups.findOne({'channel': req.params.channel}).limit(10).exec().then((doc) => {
        if(doc) {
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: 'Resource not available'});
        }
    });
});

router.post('/', (req, res) => {
    // const newStandup = new Standups({
    // Validation
    Standups.findOne({'name': req.body.name, 'channel': req.body.channel, 'is_archived': false}).exec()
        .then((doc) => {
            if(doc) {
                res.status(400).json({message: 'Please make sure the channel is unique.'});
            }else{
                const newStandup = new Standups({
                    name: req.body.name,
                    creator: req.body.creator,
                    schedule: req.body.schedule,
                    channel: req.body.channel,
                });
                newStandup.save( (err) => {
                    if(err) {
                        res.status(500).json({message: '500 Internal Server Error'});
                    }else{
                        res.status(201).json({message: `Standup ${req.body.name} was sucessfully created`});
                    }
                });
            }
        });
});

const questions = require('./questions');
router.use('/:channel/questions', questions);

module.exports = router;
