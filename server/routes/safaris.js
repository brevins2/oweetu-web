const express = require('express');
const router = express.Router();
const { Safari } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadSingle } = require('../config/multer');
const path = require('path');
const fs = require('fs');

// Get all safaris (public)
router.get('/', async (req, res) => {
    try {
        const { status, country, search } = req.query;
        const where = {};

        if (status) where.status = status;
        if (country) where.country = country;
        if (search) {
            where[require('sequelize').Op.or] = [
                { title: { [require('sequelize').Op.like]: `%${search}%` } },
                { description: { [require('sequelize').Op.like]: `%${search}%` } }
            ];
        }

        const safaris = await Safari.findAll({
            where,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            count: safaris.length,
            data: safaris
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch safaris',
            error: error.message
        });
    }
});

// Get single safari
router.get('/:id', async (req, res) => {
    try {
        const safari = await Safari.findByPk(req.params.id);

        if (!safari) {
            return res.status(404).json({
                success: false,
                message: 'Safari not found'
            });
        }

        res.status(200).json({
            success: true,
            data: safari
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch safari',
            error: error.message
        });
    }
});

// Create safari (protected - admin/editor)
router.post('/', authenticate, authorize('admin', 'editor'), uploadSingle('image'), async (req, res) => {
    try {
        const safariData = { ...req.body };

        if (req.file) {
            safariData.image = `/uploads/safaris/${req.file.filename}`;
        } else {
            console.log('No image file uploaded');
        }

        if (safariData.price) {
            safariData.price = parseFloat(safariData.price);
        }

        const safari = await Safari.create(safariData);

        res.status(201).json({
            success: true,
            message: 'Safari created successfully',
            data: safari
        });
    } catch (error) {
        console.error('Create safari error:', error);
        if (req.file) {
            try {
                fs.unlinkSync(req.file.path);
                console.log('Deleted uploaded file due to error');
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }

        res.status(400).json({
            success: false,
            message: 'Failed to create safari',
            error: error.message
        });
    }
});

// Update safari (protected - admin/editor)
router.put('/:id', authenticate, authorize('admin', 'editor'), uploadSingle('image'), async (req, res) => {
    try {
        const safari = await Safari.findByPk(req.params.id);

        if (!safari) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({
                success: false,
                message: 'Safari not found'
            });
        }

        const safariData = JSON.parse(JSON.stringify(req.body));

        // Handle file upload
        if (req.file) {
            if (safari.image) {
                const oldImagePath = path.join(__dirname, '..', safari.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            safariData.image = `/uploads/safaris/${req.file.filename}`;
        }

        await safari.update(safariData);

        res.status(200).json({
            success: true,
            message: 'Safari updated successfully',
            data: safari
        });
    } catch (error) {
        // Delete uploaded file if there's an error
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.status(400).json({
            success: false,
            message: 'Failed to update safari',
            error: error.message
        });
    }
});

// Delete safari (protected - admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const safari = await Safari.findByPk(req.params.id);

        if (!safari) {
            return res.status(404).json({
                success: false,
                message: 'Safari not found'
            });
        }

        // Delete associated image
        if (safari.image) {
            const imagePath = path.join(__dirname, '..', safari.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await safari.destroy();

        res.status(200).json({
            success: true,
            message: 'Safari deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete safari',
            error: error.message
        });
    }
});

// Update safari status (protected - admin/editor)
router.patch('/:id/status', authenticate, authorize('admin', 'editor'), async (req, res) => {
    try {
        const { status } = req.body;

        if (!['active', 'inactive', 'archived'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const safari = await Safari.findByPk(req.params.id);

        if (!safari) {
            return res.status(404).json({
                success: false,
                message: 'Safari not found'
            });
        }

        safari.status = status;
        await safari.save();

        res.status(200).json({
            success: true,
            message: 'Safari status updated successfully',
            data: safari
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update safari status',
            error: error.message
        });
    }
});

module.exports = router;