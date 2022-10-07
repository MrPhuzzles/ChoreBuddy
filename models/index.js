// import all models 
const Post = require('./Post');
const User = require('./User');
const Reviews = require('./Reviews');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
User.belongsToMany(Reviews, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
});
Reviews.belongsToMany(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});




module.exports = { User, Post, Reviews };
