const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Destination = sequelize.define('Destination', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.ENUM('Uganda', 'Kenya', 'Tanzania', 'Rwanda'),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Country name is required' }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tourism: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Key tourism information about the destination'
    },
    map: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Google Maps embed URL'
    },
    banner: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Banner image URL'
    },
    highlights: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Comma-separated list of highlights'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
}, {
    tableName: 'destinations',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: false
});

Destination.prototype.getHighlightsArray = function () {
    if (!this.highlights) return [];
    return this.highlights.split(',').map(highlight => highlight.trim());
};

// Destination.associate = (models) => {
//     Destination.hasMany(models.Safari, {
//         foreignKey: 'country',
//         sourceKey: 'name',
//         as: 'safaris'
//     });
// };

module.exports = Destination;