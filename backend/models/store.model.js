const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Store name cannot be empty."
      }
    }
  },
  address: {
    type: DataTypes.STRING(400),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Store address cannot be empty."
      },
      len: {
        args: [0, 400],
        msg: "Store address cannot exceed 400 characters."
      }
    }
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'stores',
  timestamps: true
});

module.exports = Store;
