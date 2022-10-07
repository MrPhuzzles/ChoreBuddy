// import all models 
const Post = require('./Post');
const User = require('./User');
const Reviews = require('./Reviews');
const Relation = require('./Relation');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
User.hasMany(Reviews, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
});
Reviews.belongsToMany(User, {
    through: Relation,
    foreignKey: 'user_id',
    
});




module.exports = { User, Post, Reviews };
