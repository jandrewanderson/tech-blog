const sequelize = require('../config/connection');
const { User, Posts, Comment } = require('../models');

const userData = require('./userData.json');
const postsData = require('./postsData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const posts of postsData) {
    await Posts.create({
      ...posts,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  process.exit(0);
};

seedDatabase();
