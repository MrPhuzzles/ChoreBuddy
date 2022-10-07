const router = require('express').Router();
const {User, Post, Reviews} = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude:['password']},
        include: [{
            model: Post,
            attributes: ['id', 'title', 'content', 'province', 'city', 'address', 'postal', 'created_at', 'user_id']
        },
        { 
            model: Reviews,
            attributes: ['comment', 'created_at'],
            include: [{
                model: User,
                attributes:['username']
            }]
        }]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id:req.params.id
        },
        attributes: {exclude:['password']},
        include: [{
            model: Post,
            attributes: ['id', 'title', 'content', 'province', 'city', 'address', 'postal', 'created_at', 'user_id']
        },
        { 
            model: Reviews,
            attributes: ['comment', 'created_at'],
            include: [{
                model: User,
                attributes:['username']
            }]
        }],
        
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message:'user id not found'});
            return;
        }
        res.json(dbUserData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = User;
