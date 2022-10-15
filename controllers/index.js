const router = require('express').Router();
const apiRoutes = require('./api');
const homepage = require('./home-routes');
const profile = require('./profile-routes');
const reviews = require('./review-routes'); 

router.use('/api', apiRoutes);
router.use('/',homepage);
router.use('/profile', profile);
// router.use('/reviews', reviews);
router.use((req,res) => res.status(404).end())


module.exports = router;