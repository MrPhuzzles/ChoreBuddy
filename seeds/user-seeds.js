const sequelize = require('../config/connection');
const { User} = require('../models');
const {faker} = require('@faker-js/faker');

const userdata = []

const genfunction =  function() {
    for (let i = 0; i< 10; i++) {
        const user = {
          username:faker.name.firstName(),
          email:faker.internet.email(),
          password: "password"
        };
        console.log(user)
        userdata.push(user)
    }
}
genfunction();

console.log(userdata);

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;