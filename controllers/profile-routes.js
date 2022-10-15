const router = require("express").Router();
const { User, Post, Reviews, } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    where: {
      requester_id: req.session.user_id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: User,
        as: 'requester',
        attributes: ["id", ["username", "requester_name"]],
        where: {
          id: req.session.user_id
        }
      },
      {
        model: User,
        as: 'volunteer',
        attributes: [['username', 'volunteer_name']]
      }
    ],
  })
    .then((dbPostData) => {
      const post = dbPostData.map((post) => post.get({ plain: true }));
      console.log(post)
      const requester = { requester: req.session.username }
      console.log(requester)
      res.render("profile", { post, requester, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get("/accepted", (req, res) => {
  Post.findAll(
    {
      where: {
        volunteer_id: req.session.user_id
      },
      attributes: ["id", "title", "content", "created_at", "request_taken"],
      include: [
        {
          model: User,
          as: 'requester',
          attributes: ["id", ["username", "requester_name"]],

        },
        {
          model: User,
          as: 'volunteer',
          attributes: [['username', 'volunteer_name']],
        }
      ],
    }
  )
    .then((dbPostData) => {
      console.log("test")
      const acceptedPost = dbPostData.map((post) => post.get({ plain: true }));
      console.log(acceptedPost)
      res.render("accepted-listings", { acceptedPost, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;