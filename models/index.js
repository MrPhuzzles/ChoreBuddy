// import all models 
const Post = require('./Post');
const User = require('./User');
const Reviews = require('./Reviews');
const Rel = require('./Rel');

// create associations
User.hasMany(Post, {
    foreignKey: 'requester_id',
});

User.hasMany(Post, {
    foreignKey: 'volunteer_id',
});

Post.belongsTo(User, {
    foreignKey: 'requester_id',
    as: 'requester'
});

Post.belongsTo(User, {
    foreignKey: 'volunteer_id',
    as: 'volunteer'
});

User.hasMany(Reviews, {
    foreignKey: 'reviewer_id',
});
Post.hasMany(Reviews, {
    foreignKey: 'reviewee_id',
});
Reviews.belongsTo(User, {
    foreignKey: 'reviewer_id',
    as: 'reviewer'
});
Reviews.belongsTo(Post, {
    foreignKey: 'reviewee_id',
});




module.exports = { User, Post, Reviews , Rel};
