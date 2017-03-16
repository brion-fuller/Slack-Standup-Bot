const express = require('express');
const router = new express.Router({mergeParams: true});

const Standup = require('../../models/Standup');

router.get('/', (req, res) => {
    Standup.findOne({'name': req.params.name}, 'questions').exec().then((doc) => {
        if(doc) {
            res.status(200).json(doc.questions);
        }else{
            res.status(404).json({message: 'Resource not available'});
        }
    });
});

router.post('/', (req, res) => {
    // TODO: Validation
    Standup.findOne({'name': req.params.name, 'questions.question': req.body.question}).exec().then((doc) => {
        if(doc) {
            res.status(400).json({message: 'Please make sure the channel is unique.'});
        }else{
            Standup.update(
                {'name': req.params.name},
                {'$addToSet': {
                    'questions': {
                        'question': req.body.question,
                        'color': req.body.color,
                    },
                }},
                {},
                (err, doc) => {
                    if(err) {
                        res.status(500).json({message: '500 Internal Server Error'});
                    }else{
                        res.status(201).json({message: `Question ${req.body.question} was sucessfully created`});
                    }
                }
            );
        }
    });
});

router.delete('/', (req, res) => {
    // TODO: Validation
    Standup.findOne({'name': req.params.name, 'questions.question': req.body.question}).exec().then((doc) => {
        if(!doc) {
            res.status(400).json({message: 'Question not found.'});
        }else{
            Standup.update(
                {'name': req.params.name},
                {'$pull': {
                    'questions': {
                        'question': req.body.question,
                    },
                }},
                {},
                (err, doc) => {
                    if(err) {
                        res.status(500).json({message: '500 Internal Server Error'});
                    }else{
                        res.status(201).json({message: `Question "${req.body.question}" was sucessfully deleted`});
                    }
                }
            );
        }
    });
});


module.exports = router;
