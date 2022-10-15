const router = require('express').Router();
const {User, Post, Reviews, Rel} = require('../models');

router.get('/', (req,res) => {
    Reviews.findAll({
 
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
                attributes: ['id', ['username', 'reviewee_name']],
                where: {
                    id: req.session.user_id,
                }
            }
        ]

    })
    .then(dbReviewsData => {
        const reviewsAboutMe = dbReviewsData.map((review) => review.get({plain:true}));
        let user = ''
        if(reviewsAboutMe[0]){
            user = reviewsAboutMe[0].reviewee.reviewee_name
        }
        res.render('myreviews', {reviewsAboutMe,
                        user,
                         loggedIn: req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;