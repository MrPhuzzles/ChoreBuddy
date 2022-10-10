const router = require('express').Router();
const {User, Post, Reviews} = require('../models');

router.get('/', (req,res) => {
    Reviews.findAll({
        attributes: ['id', 'review_type', 'comment', 'user_id', 'created_at'],
        include: [{
            model: User,
            attributes: ["username", "email"]
        }]
    })
    .then(dbReviewsData => {
        const reviews = dbReviewsData.map((review) => review.get({plain:true}));

        res.render('reviews', {reviews, loggedIn: req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;