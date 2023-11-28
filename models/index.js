const User = require('./user');
const Post = require('./post');
const Comments = require('./comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comments.belongsTo(Post, {
    foreignKey: 'post_id'
});

Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comments, {

});

Post.hasMany(Comments, {

});

module.exports = { User, Post, Comments };

