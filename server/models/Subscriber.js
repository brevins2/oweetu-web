const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscriber = sequelize.define('Subscriber', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Must be a valid email address' },
            notEmpty: { msg: 'Email is required' }
        }
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'unsubscribed', 'bounced'),
        defaultValue: 'active'
    },
    subscribedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    unsubscribedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    unsubscribeToken: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    userAgent: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'subscribers',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

// Instance method to generate unsubscribe token
Subscriber.prototype.generateUnsubscribeToken = function () {
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    this.unsubscribeToken = token;
    return token;
};

module.exports = Subscriber;