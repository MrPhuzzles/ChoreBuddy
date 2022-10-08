
const sequelize = require('../config/connection');
const { Rel, Reviews } = require('../models');

const sql = `SELECT user_id from reviews where id = ${1}`
console.log(sql)

const reldata = [
    {
        user_id: `SELECT user_id from reviews where id = ${1}`,
        review_id: 1
    },
    {
        user_id: `SELECT user_id from reviews where id = ${2}`,
        review_id: 2
    },
    {
        user_id: `SELECT user_id from reviews where id = ${3}`,
        review_id: 3
    },
    {
        user_id: `SELECT user_id from reviews where id = ${4}`,
        review_id: 4
    },
    {
        user_id: `SELECT user_id from reviews where id = ${5}`,
        review_id: 8
    },
    {
        user_id: `SELECT user_id from reviews where id = ${6}`,
        review_id: 6
    },
    {
        user_id: `SELECT user_id from reviews where id = ${7}`,
        review_id: 7
    },
    {
        user_id: `SELECT user_id from reviews where id = ${8}`,
        review_id: 8
    },
    {
        user_id: `SELECT user_id from reviews where id = ${9}`,
        review_id: 9
    },
    {
        user_id: `SELECT user_id from reviews where id = ${10}`,
        review_id: 10
    },
]


const seedRels = () => Rel.bulkCreate(reldata, {individualHooks: true});

module.exports = seedRels;