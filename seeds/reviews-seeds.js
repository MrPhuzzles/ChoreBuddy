
const { Reviews } = require('../models');
const {faker} = require('@faker-js/faker');


const reviewdata = []

const genfunction =  function() {
    for (let i = 0; i< 5; i++) {
        const review = {
            review_type: faker.random.word(),
            comment: faker.random.words(3),
            user_id: Math.floor(Math.random() * 5+1)
        };
        reviewdata.push(review)
    }
}
genfunction();


const seedReviews = () => Reviews.bulkCreate(reviewdata, {individualHooks: true});

module.exports = seedReviews;