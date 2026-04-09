const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

// Import models
const Safari = require('./Safaris');
const Destination = require('./Destinations');
const User = require('./Users');
const Subscribe = require('./Subscriber');

// Initialize models
const models = {
    Safari: Safari,
    Destination: Destination,
    User: User,
    Subscribe: Subscribe
};

// Set up associations if any
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Function to create default admin user if not exists
const createDefaultAdmin = async () => {
    try {
        const defaultEmail = 'development@oweetugorillaholidays.com';
        const existingUser = await User.findOne({ where: { email: defaultEmail } });

        if (!existingUser) {
            const defaultPassword = 'Admin@123456';

            // Don't hash here - let the model hook handle it
            const adminUser = await User.create({
                email: defaultEmail,
                password: defaultPassword,  // Pass plain password, model hook will hash it
                name: 'Super Admin',
                role: 'admin',
                status: 'active'
            });

            console.log('========================================');
            console.log('✅ Default admin user created successfully!');
            console.log(`📧 Email: ${defaultEmail}`);
            console.log(`🔑 Password: ${defaultPassword}`);
            console.log('⚠️  Please change this password after first login!');
            console.log('========================================');

            return adminUser;
        } else {
            console.log(`✅ Admin user already exists: ${defaultEmail}`);
            return existingUser;
        }
    } catch (error) {
        console.error('Error creating default admin user:', error.message);
    }
};

// Sync all models with database
const syncDatabase = async (force = false) => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');

        // Sync all models
        await sequelize.sync({ alter: true, force });
        console.log('✅ Database synchronized successfully.');

        // Create default admin user
        await createDefaultAdmin();

    } catch (error) {
        console.error('❌ Unable to sync database:', error);
        throw error;
    }
};

// Function to check if user exists and create if not
const ensureUserExists = async (userData) => {
    try {
        const [user, created] = await User.findOrCreate({
            where: { email: userData.email },
            defaults: {
                name: userData.name || userData.email.split('@')[0],
                password: userData.password || 'Temp@123456',
                role: userData.role || 'editor',
                status: 'active'
            }
        });

        if (created) {
            console.log(`✅ New user created: ${user.email}`);
            // In production, send email with temporary password
        } else {
            console.log(`✅ User already exists: ${user.email}`);
        }

        return { user, created };
    } catch (error) {
        console.error('Error ensuring user exists:', error.message);
        throw error;
    }
};

// Function to reset admin password (if needed)
const resetAdminPassword = async (email, newPassword) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        user.password = newPassword;
        await user.save();
        console.log(`✅ Password reset for: ${email}`);
        return true;
    } catch (error) {
        console.error('Error resetting password:', error.message);
        return false;
    }
};

// Function to list all users
const listAllUsers = async () => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'email', 'name', 'role', 'status', 'lastLogin', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });
        console.table(users.map(u => u.toJSON()));
        return users;
    } catch (error) {
        console.error('Error listing users:', error.message);
        return [];
    }
};

module.exports = {
    ...models,
    sequelize,
    Sequelize,
    syncDatabase,
    ensureUserExists,
    resetAdminPassword,
    listAllUsers
};