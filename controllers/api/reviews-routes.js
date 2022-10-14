const router = require('express').Router();
const {User, Post, Reviews, Rel} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Reviews.findAll({
        attributes: ['comment', 'created_at'],
        include: [
            {
                // model: User,
                // attributes: ['username']
                model:Rel,
                attributes: ['user_id', 'review_id']
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

router.post('/', withAuth, (req, res) => {
    Reviews.create({
        comment: req.body.comment,
        reviewee_id: req.body.user_id,
        reviewer_id: req.session.user_id
    })
    .then(dbReviewData => {
        res.json(dbReviewData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})





module.exports = router;