const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Safari = sequelize.define('Safari', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Title is required' }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    duration: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    price: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(225),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Country is required' }
        }
    },
    activities: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Comma-separated list of activities'
    },
    accommodation: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    best_time: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    itinerary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'archived'),
        defaultValue: 'active'
    }
}, {
    tableName: 'safaris',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: false
});

Safari.prototype.getActivitiesArray = function () {
    if (!this.activities) return [];
    return this.activities.split(',').map(activity => activity.trim());
};

Safari.prototype.updateTimestamp = function () {
    this.updatedAt = new Date();
};

module.exports = Safari;