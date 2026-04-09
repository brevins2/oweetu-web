const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    subject: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tour: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    travelDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    people: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('contact', 'booking', 'inquiry'),
        defaultValue: 'contact'
    },
    status: {
        type: DataTypes.ENUM('unread', 'read', 'replied', 'archived'),
        defaultValue: 'unread'
    },
    repliedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'messages',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

module.exports = Message;