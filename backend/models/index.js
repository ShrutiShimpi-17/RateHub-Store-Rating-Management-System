const User = require('./user.model');
const Store = require('./store.model');
const Rating = require('./rating.model');

// 1. User -> Ratings (One-to-Many)
User.hasMany(Rating, { foreignKey: 'userId', as: 'ratings', onDelete: 'CASCADE' });
Rating.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// 2. Store -> Ratings (One-to-Many)
Store.hasMany(Rating, { foreignKey: 'storeId', as: 'ratings', onDelete: 'CASCADE' });
Rating.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// 3. User (STORE_OWNER) -> Stores (One-to-Many / One-to-One depending on setup, but structurally One-to-Many allows maximum flexibility)
User.hasMany(Store, { foreignKey: 'ownerId', as: 'stores', onDelete: 'SET NULL' });
Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = {
  User,
  Store,
  Rating
};
