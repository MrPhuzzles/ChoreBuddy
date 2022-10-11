// import all models 
const Post = require('./Post');
const User = require('./User');
const Reviews = require('./Reviews');
const Rel = require('./Rel');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});
User.belongsToMany(Reviews, {
    through:'rel',
    foreignKey: 'user_id',
});

Reviews.belongsToMany(User, {
    through: 'rel',
    foreignKey: 'review_id',
});

User.hasMany(Rel, {
    foreignKey: 'user_id',
});

Rel.belongsTo(User, {
    foreignKey: 'user_id',
});

Reviews.hasMany(Rel, {
    foreignKey: 'review_id',
});

Rel.belongsTo(Reviews, {
    foreignKey: 'review_id',
});



module.exports = { User, Post, Reviews , Rel};
