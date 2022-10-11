const router = require('express').Router();
const {User, Post} = require('../../models');
const withAuth = require('../../utils/auth');


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


router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body,{
        where: {
            id: req.params.id
        },
    })
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post ('/', withAuth, (req, res) => {
    Post.create ({
        title: req.body.title,
        content: req.body.content,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postal: req.body.postal,
        request_taken: 0,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = router;