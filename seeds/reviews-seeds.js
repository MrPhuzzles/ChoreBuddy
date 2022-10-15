const { Reviews } = require("../models");
const { faker } = require("@faker-js/faker");

const reviewdata = [
  {
    comment: faker.random.words(3),
    reviewer_id: 1,
    reviewee_id: 2,
  },
  {
    comment: faker.random.words(3),
    reviewer_id: 2,
    reviewee_id: 1,
  },
  {
    comment: faker.random.words(3),
    reviewer_id: 3,
    reviewee_id: 2,
  },
  {
    comment: faker.random.words(3),
    reviewer_id: 4,
    reviewee_id: 3,
  },
  {
    comment: faker.random.words(3),
    reviewer_id: 1,
    reviewee_id: 5,
  },
];

const seedReviews = () =>
  Reviews.bulkCreate(reviewdata, { individualHooks: true });

module.exports = seedReviews;
