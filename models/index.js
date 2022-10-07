// import all models 
const Post = require('./Post');
const User = require('./User');
const Reviews = require('./Reviews');
const Rel = require('./Rel');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});
User.belongsToMany(Reviews, {
    through:Rel,
    foreignKey: 'user_id',
});

Reviews.belongsToMany(User, {
    through: Rel,
    foreignKey: 'review_id',
    
});




module.exports = { User, Post, Reviews , Rel};
