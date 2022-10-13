const router = require('express').Router();
const {User, Post, Reviews, Rel} = require('../models');

router.get('/', (req,res) => {
    Reviews.findAll({
        where: {
                reviewee_id:req.session.user_id
        },
        attributes: ['id', 'comment', 'reviewer_id', 'reviewee_id', 'created_at'],
        include: [
            {
                model: User,
                as: 'reviewer',
                attributes: [['username', 'reviewer_name']],
            },
            {
                model: User,
                as: 'reviewee',
                attributes: ['id',['username', 'reviewee_name']],
                where: {
                    id:req.session.user_id
                }
            },
        ]
    })
    .then(dbReviewsData => {
        const reviews = dbReviewsData.map((review) => review.get({plain:true}));
        console.log(reviews)
        const reviewee = {reviewee: reviews[0].reviewee.reviewee_name}
        console.log(reviewee)
        res.render('reviews', {reviews,reviewee, loggedIn: req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;