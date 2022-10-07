const router = require('express').Router();
const {User, Post} = require('../../models');


router.get('/', (req, res) => {
    Post.findAll({
        attributes:req.body,
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.get('/:id', (req, res) => {
    Post.findOne({
        where:{
            id: req.params.id
        },
        attributes:req.body,
        include: [
            {
                model: User,
                attributes: ['username']
            },
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'post id not found'});
            return;
        }
        res.json(dbPostData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})






module.exports = router;