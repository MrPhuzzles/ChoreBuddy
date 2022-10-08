const router = require('express').Router();
const { User, Post, Rel } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'username'],
        include: [{
            model: Post,
            attributes: req.body
        }]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router