const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Reviews } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'created_at', 'province', 'city', 'address', 'postal', 'user_id'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Reviews,
        attributes: ['id', 'comment', 'user_id']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'content', 'created_at', 'province', 'city', 'address', 'postal', 'user_id'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Reviews,
        attributes: ['id', 'comment', 'user_id']
      }
    ]
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
