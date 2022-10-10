const { User } = require("../models");
const { faker } = require("@faker-js/faker");

const userdata = [];


const genfunction = function () {

  for (let i = 0; i < 5; i++) {
    const user = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: "password",
    };

    userdata.push(user);

  }
};

genfunction();

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });
module.exports = seedUsers;
