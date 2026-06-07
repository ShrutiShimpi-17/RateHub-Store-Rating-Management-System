const { Rating, Store, User } = require('../models');

const submitOrUpdateRating = async (req, res, next) => {
  try {
    const { rating, storeId } = req.body;
    const userId = req.user.id;

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found."
      });
    }

    let userRating = await Rating.findOne({
      where: { userId, storeId }
    });

    if (userRating) {
      userRating.rating = rating;
      await userRating.save();
      return res.status(200).json({
        success: true,
        message: "Rating updated successfully.",
        data: userRating
      });
    } else {
      userRating = await Rating.create({
        userId,
        storeId,
        rating
      });
      return res.status(201).json({
        success: true,
        message: "Rating submitted successfully.",
        data: userRating
      });
    }
  } catch (error) {
    next(error);
  }
};

const getStoreRatings = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found."
      });
    }

    const ratings = await Rating.findAll({
      where: { storeId },
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'address'] }],
      order: [['updatedAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: ratings
    });
  } catch (error) {
    next(error);
  }
};

const getOwnerStoreData = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    // Fetch all stores owned by this user
    const stores = await Store.findAll({
      where: { ownerId },
      include: [
        {
          model: Rating,
          as: 'ratings',
          include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'address'] }]
        }
      ],
      order: [[{ model: Rating, as: 'ratings' }, 'updatedAt', 'DESC']]
    });

    if (!stores || stores.length === 0) {
      return res.status(404).json({
        success: false,
        message: "You have not been assigned to any store yet. Please contact an administrator."
      });
    }

    // Process each store to compute aggregates
    const processedStores = stores.map(store => {
      const storeJSON = store.toJSON();
      const ratings = storeJSON.ratings || [];
      const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
      const averageRating = ratings.length > 0 ? parseFloat((sum / ratings.length).toFixed(1)) : 0;

      // Rating distribution (1-5 stars)
      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      ratings.forEach(r => {
        distribution[r.rating] = (distribution[r.rating] || 0) + 1;
      });

      // Attach computed fields
      storeJSON.averageRating = averageRating;
      storeJSON.totalRatingsCount = ratings.length;
      storeJSON.ratingDistribution = Object.keys(distribution).map(stars => ({
        name: `${stars} Star`,
        count: distribution[stars]
      }));
      return storeJSON;
    });

    res.status(200).json({
      success: true,
      data: processedStores
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitOrUpdateRating,
  getStoreRatings,
  getOwnerStoreData
};
