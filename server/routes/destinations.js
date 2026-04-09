const express = require('express');
const router = express.Router();
const { Destination, Safari } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadSingle } = require('../config/multer');
const path = require('path');
const fs = require('fs');

// Get all destinations (public)
router.get('/', async (req, res) => {
    try {
        const { status, name } = req.query;
        const where = {};

        if (status) where.status = status;
        if (name) where.name = name;

        const destinations = await Destination.findAll({
            where,
            order: [['name', 'ASC']]
        });

        res.status(200).json({
            success: true,
            count: destinations.length,
            data: destinations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch destinations',
            error: error.message
        });
    }
});

// Get single destination with related safaris
router.get('/:id', async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: 'Destination not found'
            });
        }

        // Get related safaris for this destination
        // const safaris = await Safari.findAll({
        //     where: { country: destination.name, status: 'active' }
        // });

        res.status(200).json({
            success: true,
            data: {
                ...destination.toJSON(),
                // safaris
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch destination',
            error: error.message
        });
    }
});

// Create destination (protected - admin/editor)
router.post('/', authenticate, authorize('admin', 'editor'), uploadSingle('banner'), async (req, res) => {
    try {
        const destinationData = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            destinationData.banner = `/uploads/destinations/${req.file.filename}`;
        }

        const destination = await Destination.create(destinationData);

        res.status(201).json({ success: true, message: 'Destination created successfully', data: destination });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.status(400).json({ success: false, message: 'Failed to create destination', error: error.message  });
    }
});

// Update destination (protected - admin/editor)
router.put('/:id', authenticate, authorize('admin', 'editor'), uploadSingle('banner'), async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);

        if (!destination) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({
                success: false,
                message: 'Destination not found'
            });
        }

        const destinationData = JSON.parse(JSON.stringify(req.body));

        // Handle file upload
        if (req.file) {
            // Delete old banner if exists
            if (destination.banner) {
                const oldBannerPath = path.join(__dirname, '..', destination.banner);
                if (fs.existsSync(oldBannerPath)) {
                    fs.unlinkSync(oldBannerPath);
                }
            }
            destinationData.banner = `/uploads/destinations/${req.file.filename}`;
        }

        await destination.update(destinationData);

        res.status(200).json({
            success: true,
            message: 'Destination updated successfully',
            data: destination
        });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.status(400).json({
            success: false,
            message: 'Failed to update destination',
            error: error.message
        });
    }
});

// Delete destination (protected - admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: 'Destination not found'
            });
        }

        // Check if there are safaris linked to this destination
        // const safarisCount = await Safari.count({ where: { country: destination.name } });
        // if (safarisCount > 0) {
        //     return res.status(400).json({
        //         success: false,
        //         message: `Cannot delete destination with ${safarisCount} associated safaris. Update or delete the safaris first.`
        //     });
        // }

        // Delete associated banner
        if (destination.banner) {
            const bannerPath = path.join(__dirname, '..', destination.banner);
            if (fs.existsSync(bannerPath)) {
                fs.unlinkSync(bannerPath);
            }
        }

        await destination.destroy();

        res.status(200).json({
            success: true,
            message: 'Destination deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete destination',
            error: error.message
        });
    }
});

// Update destination status (protected - admin/editor)
router.patch('/:id/status', authenticate, authorize('admin', 'editor'), async (req, res) => {
    try {
        const { status } = req.body;

        if (!['active', 'inactive'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const destination = await Destination.findByPk(req.params.id);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: 'Destination not found'
            });
        }

        destination.status = status;
        await destination.save();

        res.status(200).json({
            success: true,
            message: 'Destination status updated successfully',
            data: destination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update destination status',
            error: error.message
        });
    }
});

module.exports = router;