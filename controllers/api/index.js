const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const reviewsRoutes = require('./reviews-routes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/reviews', reviewsRoutes);

module.exports = router;
