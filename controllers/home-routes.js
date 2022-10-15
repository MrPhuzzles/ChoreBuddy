const router = require("express").Router();
const { User, Post, Reviews, Rel } = require("../models");
const sequelize = require("../config/connection");
const { Op } = require("sequelize");

router.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    Post.findAll({
      where: {
        request_taken: false,
      },
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          as: "requester",
          attributes: ["id", ["username", "requester_name"]],
        },
        {
          model: User,
          as: "volunteer",
          attributes: [["username", "volunteer_name"]],
        },
      ],
    })
      .then((dbPostData) => {
        const post = dbPostData.map((post) => post.get({ plain: true }));
        console.log(post);
        res.render("homepage", { post, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

  } else {

    Post.findAll({
      where: {
        request_taken: false,
      },
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          as: "requester",
          attributes: ["id", ["username", "requester_name"]],
          where: {
            id: { [Op.ne]: req.session.user_id },
          },
        },
        {
          model: User,
          as: "volunteer",
          attributes: [["username", "volunteer_name"]],
        },
      ],
    })
      .then((dbPostData) => {
        const post = dbPostData.map((post) => post.get({ plain: true }));
        console.log(post)
      
        res.render("homepage", { post, loggedIn:true});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "content",
      "created_at",
      "address",
      "city",
      "province",
      "postal",
      "request_taken",
    ],
    include: [
      {
        model: User,
        as: "requester",
        attributes: ["id", ["username", "requester_name"]],
      },
      {
        model: User,
        as: "volunteer",
        attributes: [["username", "volunteer_name"]],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render("post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/user/:id', (req,res) => {

    Reviews.findAll({
        attributes: ['id', 'comment', 'reviewer_id', 'reviewee_id', 'created_at'],
        include: [
            {
                model: User,
                as: 'reviewer',
                attributes: ['id',['username', 'reviewer_name']],
            },
            {
                model: User,
                as: 'reviewee',
                attributes: ['id', ['username', 'reviewee_name']],
                where:{
                    id: req.params.id
                }
            }
        ]

    })
    .then(dbReviewsData => {
        const reviews = dbReviewsData.map((review) => review.get({plain:true}));
        console.log(reviews)
        let reviewee = ''
        if(reviews[0]){
            reviewee = reviews[0].reviewee.reviewee_name;
        } 
        res.render('reviews', {reviews,
            reviewee,
             loggedIn: req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
