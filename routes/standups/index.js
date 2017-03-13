const express = require('express');
const router = new express.Router();

const Standup = require('../../app/models/Standup');

router.get('/', (req, res) => {
    Standup.find({'is_archived': false}).limit(10).exec().then((doc) => {
        res.status(200).json(doc);
    });
});

router.get('/:name', (req, res) => {
    Standup.findOne({'name': req.params.name}).exec().then((doc) => {
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
    Standup.findOne({'name': req.body.name, 'channel': req.body.channel, 'is_archived': false}).exec()
        .then((doc) => {
            if(doc) {
                // TODO: Should probably unarchive channel if name is reused
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

router.post('/:name/schedule', (req, res) => {
    Standup.findOneAndUpdate({'name': req.params.name, 'is_archived': false}, {'schedule': req.body.schedule}, {new: true, runValidators: false}, (err, doc) => {
        if(err) {
            res.status(500).json(err);
        }else{
            res.status(200).json({message: `Schedule for ${req.params.name} was updated to ${req.body.schedule}`});
        }
    });
});

const questions = require('./questions');
router.use('/:name/questions', questions);

const users = require('./users');
router.use('/:name/users', users);

module.exports = router;
