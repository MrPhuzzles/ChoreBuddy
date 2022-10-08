// const {faker} = require('@faker-js/faker');
// const {User, Post, Reviews, Rel} = require('../models');
const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds');

// for (let i = 0; i< 10; i++) {
//   const user = new User({
//     username:faker.name.firstName(),
//     email:faker.internet.email(),
//     password: "password"
//   })

//   user.save()
//   .then(userRef =>{
//     console.log(`${userRef.name} saved successfully`);
//     const post = new Post ({
      
//       title: faker.name.title(),
//       content: faker.lorem.lines(),
//       province: faker.address.state(),
//       city: faker.address.city(),
//       address: faker.address.address(),
//       postal: faker.address.zipCode(),
//       user_id: user.id
//     })
//     post.save()
//     .then(postRef => {
//       console.log(`${userRef.name} lives in ${postRef.name}`)
//     })
//   })
// }



const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  
  await seedUsers();
  console.log('--------------');

  // await seedPosts();
  // console.log('--------------');

  // await seedReviews();
  // console.log('--------------');

  process.exit(0);
};

seedAll();
