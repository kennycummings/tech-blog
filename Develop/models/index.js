const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Project = require('./Project');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
})

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
})

module.exports = { User, Post, Comment, Project };