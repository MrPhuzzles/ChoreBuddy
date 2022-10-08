
const { User, Post} = require('../models');
const {faker} = require('@faker-js/faker');

// const  {data} = User
console.log()

const postdata = []

const genfunction =  function() {
    for (let i = 0; i< 10; i++) {
        const post = {
            title: faker.random.word(),
            content: faker.lorem.lines(),
            province: faker.address.state(),
            city: faker.address.city(),
            address: faker.address.streetAddress(),
            postal: faker.address.zipCode(),
            user_id: Math.floor(Math.random() * 10+1)
        };
        postdata.push(post)
    }
}
genfunction();


const seedPosts = () => Post.bulkCreate(postdata, {individualHooks: true});

module.exports = seedPosts;