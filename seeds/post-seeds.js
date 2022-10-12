
const { User, Post} = require('../models');
const {faker} = require('@faker-js/faker');

// const  {data} = User
console.log()

const postdata = []

const genfunction =  function() {
    for (let i = 0; i< 5; i++) {
        const post = {
            title: faker.random.word(),
            content: faker.random.words(4),
            province: faker.address.state(),
            city: faker.address.city(),
            address: faker.address.streetAddress(),
            postal: faker.address.zipCode(),
            request_taken: false,
            requester_id: i+1
        };
        postdata.push(post)
    }
}
genfunction();


const seedPosts = () => Post.bulkCreate(postdata, {individualHooks: true});

module.exports = seedPosts;