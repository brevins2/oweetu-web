const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { sendEmail, emailTemplates } = require('../utils/nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if (user.status !== 'active') {
            return res.status(403).json({
                success: false,
                message: 'Account is not active. Please contact administrator.'
            });
        }

        // Use the model's validatePassword method
        const isValidPassword = await user.validatePassword(password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Update last login
        await user.updateLastLogin();

        // Generate token
        const { generateToken } = require('../middleware/auth');
        const token = generateToken(user.id, user.email, user.role);

        // Remove sensitive data
        const userData = user.toJSON();
        delete userData.password;
        delete userData.refreshToken;
        delete userData.passwordResetToken;
        delete userData.passwordResetExpires;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: userData,
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});

// Forgot password - send reset email
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            // For security, don't reveal if email exists or not
            return res.status(200).json({
                success: true,
                message: 'If your email is registered, you will receive a password reset link'
            });
        }

        // Generate reset token
        const resetToken = user.generatePasswordResetToken();
        await user.save();

        // Create reset URL
        const resetURL = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

        // Send email
        const emailSent = await sendEmail({
            to: user.email,
            subject: 'Password Reset Request - Oweetu Gorilla Holidays',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #d97706; padding: 20px; text-align: center; color: white;">
                        <h1>Reset Your Password</h1>
                    </div>
                    <div style="padding: 30px;">
                        <p>Dear ${user.name || user.email.split('@')[0]},</p>
                        <p>We received a request to reset your password for your Oweetu Gorilla Holidays account.</p>
                        <p>Click the button below to reset your password:</p>
                        <a href="${resetURL}" style="display: inline-block; background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                            Reset Password
                        </a>
                        <p>This link will expire in 1 hour.</p>
                        <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
                        <hr style="margin: 20px 0;">
                        <p style="font-size: 12px; color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
                        <p style="font-size: 12px; color: #999;">${resetURL}</p>
                    </div>
                    <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                        <p>Oweetu Gorilla Holidays | info@oweetugorillaholidays.com</p>
                    </div>
                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: 'If your email is registered, you will receive a password reset link'
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process request',
            error: error.message
        });
    }
});

// Reset password
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Token and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        // Hash the token to compare with stored hash
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            where: {
                passwordResetToken: hashedToken,
                passwordResetExpires: { [require('sequelize').Op.gt]: new Date() }
            }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Update password
        user.password = newPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await user.save();

        // Send confirmation email
        await sendEmail({
            to: user.email,
            subject: 'Password Reset Successful - Oweetu Gorilla Holidays',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #d97706; padding: 20px; text-align: center; color: white;">
                        <h1>Password Reset Successful</h1>
                    </div>
                    <div style="padding: 30px;">
                        <p>Dear ${user.name || user.email.split('@')[0]},</p>
                        <p>Your password has been successfully reset.</p>
                        <p>If you did not perform this action, please contact us immediately.</p>
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" style="display: inline-block; background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                            Login to Your Account
                        </a>
                    </div>
                    <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                        <p>Oweetu Gorilla Holidays | info@oweetugorillaholidays.com</p>
                    </div>
                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: 'Password reset successful. You can now login with your new password.'
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reset password',
            error: error.message
        });
    }
});

// Get current user profile (protected)
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password', 'refreshToken', 'passwordResetToken', 'passwordResetExpires'] }
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get profile',
            error: error.message
        });
    }
});

// Update profile (protected)
router.put('/profile', authenticate, async (req, res) => {
    try {
        const { name, profileImage } = req.body;

        const user = await User.findByPk(req.user.id);

        if (name) user.name = name;
        if (profileImage) user.profileImage = profileImage;

        await user.save();

        const userData = user.toJSON();
        delete userData.password;

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: userData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message
        });
    }
});

// Change password (protected)
router.put('/change-password', authenticate, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters'
            });
        }

        const user = await User.findByPk(req.user.id);

        const isValidPassword = await user.validatePassword(currentPassword);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to change password',
            error: error.message
        });
    }
});

// Logout
router.post('/logout', authenticate, async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

// Admin only routes
// Get all users
router.get('/', authenticate, authorize('admin'), async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password', 'refreshToken', 'passwordResetToken', 'passwordResetExpires'] },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to list users',
            error: error.message
        });
    }
});

// Create new user (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { email, name, role, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        const user = await User.create({
            email,
            name: name || email.split('@')[0],
            password: password || 'Temp@123456',
            role: role || 'viewer',
            status: 'active'
        });

        // Send welcome email
        await sendEmail({
            to: user.email,
            ...emailTemplates.welcome(name || email, email)
        });

        const userData = user.toJSON();
        delete userData.password;

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
});

// Update user (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, status } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (name) user.name = name;
        if (role) user.role = role;
        if (status) user.status = status;

        await user.save();

        const userData = user.toJSON();
        delete userData.password;

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: userData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: error.message
        });
    }
});

// Delete user (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prevent deleting the last admin
        const adminCount = await User.count({ where: { role: 'admin', status: 'active' } });
        if (user.role === 'admin' && adminCount <= 1) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete the last admin user'
            });
        }

        await user.destroy();

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        });
    }
});

module.exports = router;