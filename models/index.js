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
User.hasMany(Reviews, {
    foreignKey: 'reviewee_id',
});
Reviews.belongsTo(User, {
    foreignKey: 'reviewer_id',
    as: 'reviewer'
});
Reviews.belongsTo(User, {
    foreignKey: 'reviewee_id',
    as:'reviewee'
});




module.exports = { User, Post, Reviews , Rel};
