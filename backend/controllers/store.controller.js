const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');

const getStores = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'name', order = 'ASC' } = req.query;
    const offset = (page - 1) * limit;
    const userId = req.user ? req.user.id : null;

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Store.findAndCountAll({
      where: whereClause,
      include: [
        { 
          model: Rating, 
          as: 'ratings', 
          attributes: ['id', 'userId', 'rating'] 
        }
      ],
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      distinct: true
    });

    const storesData = rows.map(store => {
      const storeJSON = store.toJSON();
      const ratings = storeJSON.ratings || [];
      const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
      const averageRating = ratings.length > 0 ? parseFloat((sum / ratings.length).toFixed(1)) : 0;

      // Find if this logged-in user has rated the store
      const myRatingObj = userId ? ratings.find(r => r.userId === userId) : null;
      const myRating = myRatingObj ? myRatingObj.rating : null;
      const myRatingId = myRatingObj ? myRatingObj.id : null;

      storeJSON.averageRating = averageRating;
      storeJSON.totalRatingsCount = ratings.length;
      storeJSON.myRating = myRating;
      storeJSON.myRatingId = myRatingId;
      delete storeJSON.ratings;
      return storeJSON;
    });

    res.status(200).json({
      success: true,
      data: {
        stores: storesData,
        total: count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getStoreDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id, {
      include: [
        {
          model: Rating,
          as: 'ratings',
          include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }]
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found."
      });
    }

    const storeJSON = store.toJSON();
    const ratings = storeJSON.ratings || [];
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = ratings.length > 0 ? parseFloat((sum / ratings.length).toFixed(1)) : 0;
    storeJSON.averageRating = averageRating;
    storeJSON.totalRatingsCount = ratings.length;

    res.status(200).json({
      success: true,
      data: storeJSON
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStores,
  getStoreDetails
};
