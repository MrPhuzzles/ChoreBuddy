const router = require('express').Router();
const {User, Post, Reviews, Rel} = require('../models');

router.get('/', (req,res) => {
    Reviews.findAll({

        attributes: ['id', 'comment', ['user_id', 'user_review'], 'created_at'],
        include: [
            {
                model: User,
                through:Rel,
                attributes: ['username'],
            },
            {
                model: Rel,
                attributes: [['user_id','reviewer'], 'review_id']
            }
        ]
    })
    .then(dbReviewsData => {
        const reviews = dbReviewsData.map((review) => review.get({plain:true}));
        console.log(reviews)

        res.render('reviews', {reviews, loggedIn: req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;