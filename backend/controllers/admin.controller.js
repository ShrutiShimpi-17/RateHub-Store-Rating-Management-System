const { User, Store, Rating } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    // Get breakdown of users by role
    const adminCount = await User.count({ where: { role: 'ADMIN' } });
    const userCount = await User.count({ where: { role: 'USER' } });
    const ownerCount = await User.count({ where: { role: 'STORE_OWNER' } });

    // Calculate overall average store rating
    const allRatings = await Rating.findAll({ attributes: ['rating'] });
    const totalSum = allRatings.reduce((sum, r) => sum + r.rating, 0);
    const overallAvg = allRatings.length > 0 ? parseFloat((totalSum / allRatings.length).toFixed(2)) : 0;

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStores,
        totalRatings,
        overallAvg,
        roles: {
          admin: adminCount,
          user: userCount,
          owner: ownerCount
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: role || 'USER'
    });

    res.status(201).json({
      success: true,
      message: "User created successfully by admin.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address
      }
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'id', order = 'DESC', role = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } }
      ];
    }
    if (role) {
      whereClause.role = role;
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      success: true,
      data: {
        users: rows,
        total: count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Rating,
          as: 'ratings',
          include: [{ model: Store, as: 'store', attributes: ['id', 'name', 'address'] }]
        },
        {
          model: Store,
          as: 'stores',
          attributes: ['id', 'name', 'address']
        }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const addStore = async (req, res, next) => {
  try {
    const { name, address, ownerId } = req.body;

    if (ownerId) {
      const owner = await User.findByPk(ownerId);
      if (!owner || owner.role !== 'STORE_OWNER') {
        return res.status(400).json({
          success: false,
          message: "Assigned owner must be a valid user with the STORE_OWNER role."
        });
      }
    }

    const store = await Store.create({
      name,
      address,
      ownerId: ownerId || null
    });

    res.status(201).json({
      success: true,
      message: "Store created successfully.",
      data: store
    });
  } catch (error) {
    next(error);
  }
};

const getStores = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'id', order = 'DESC' } = req.query;
    const offset = (page - 1) * limit;

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
        { model: User, as: 'owner', attributes: ['id', 'name', 'email'] },
        { model: Rating, as: 'ratings', attributes: ['rating'] }
      ],
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const storesWithAverages = rows.map(store => {
      const storeJSON = store.toJSON();
      const ratings = storeJSON.ratings || [];
      const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
      const averageRating = ratings.length > 0 ? parseFloat((sum / ratings.length).toFixed(1)) : 0;
      storeJSON.averageRating = averageRating;
      storeJSON.totalRatingsCount = ratings.length;
      delete storeJSON.ratings;
      return storeJSON;
    });

    res.status(200).json({
      success: true,
      data: {
        stores: storesWithAverages,
        total: count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  addUser,
  getUsers,
  getUserDetails,
  addStore,
  getStores
};
