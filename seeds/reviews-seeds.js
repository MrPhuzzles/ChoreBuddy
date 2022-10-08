
const { Reviews } = require('../models');
const {faker} = require('@faker-js/faker');


const reviewdata = []

const genfunction =  function() {
    for (let i = 0; i< 10; i++) {
        const review = {
            comment: faker.random.words(3),
            user_id: Math.floor(Math.random() * 10+1)
        };
        reviewdata.push(review)
    }
}
genfunction();


const seedReviews = () => Reviews.bulkCreate(reviewdata, {individualHooks: true});

module.exports = seedReviews;