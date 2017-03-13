const express = require('express');
const router = new express.Router({mergeParams: true});

const Standup = require('../../app/models/Standup');

router.get('/', (req, res) => {
    Standup.findOne({'name': req.params.name}, 'users').exec().then((doc) => {
        if(doc) {
            res.status(200).json(doc.users);
        }else{
            res.status(404).json({message: 'Resource not available'});
        }
    });
});

router.post('/', (req, res) => {
    // TODO: Validation
    Standup.findOne({'name': req.params.name, 'users': req.body.id}).exec().then((doc) => {
        if(doc) {
            res.status(400).json({message: 'Please make sure the user is unique.'});
        }else{
            Standup.update(
                {'name': req.params.name},
                {'$addToSet': {
                    'users': req.body.id,
                }},
                {},
                (err, doc) => {
                    if(err) {
                        res.status(500).json({message: '500 Internal Server Error'});
                    }else{
                        res.status(201).json({message: `User ${req.body.id} was successfully added to standup`});
                    }
                }
            );
        }
    });
});

router.delete('/', (req, res) => {
    // TODO: Validation
    Standup.findOne({'name': req.params.name, 'users': req.body.id}).exec().then((doc) => {
        if(!doc) {
            res.status(400).json({message: 'User not found.'});
        }else{
            Standup.update(
                {'name': req.params.name},
                {'$pull': {
                    'users': req.body.id,
                }},
                {},
                (err, doc) => {
                    if(err) {
                        res.status(500).json({message: '500 Internal Server Error'});
                    }else{
                        res.status(201).json({message: `User "${req.body.id}" was removed from standup`});
                    }
                }
            );
        }
    });
});


module.exports = router;
