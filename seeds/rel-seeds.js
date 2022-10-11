const { Rel, Reviews } = require('../models');


const data = []

const genfunction =  function() {
    for (let i = 0; i< 5; i++) {
        const rel = {
            user_id: Math.floor(Math.random() * 5+1),
            user_id: Math.floor(Math.random() * 5+1)
        };
        data.push(rel)
    }
}
genfunction();

const seedRels = () => Rel.bulkCreate(data, {individualHooks: true});

module.exports = seedRels;