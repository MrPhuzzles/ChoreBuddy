const router = require('express').Router();

const userRouter = require('./user-routes');
const postRouter = require('./post-routes');
const reviewsRouter = require('./reviews-routes');


router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;