const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { sendEmail } = require('../utils/nodemailer');
const { Subscribe } = require('../models');
const crypto = require('crypto');

// Contact form - send message to admin (public)
router.post('/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message, tour } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'info@oweetugorillaholidays.com';

        await sendEmail({
            to: adminEmail,
            subject: `New Contact Message: ${subject || 'Website Contact'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #d97706; padding: 20px; text-align: center; color: white;">
                        <h1>New Contact Message</h1>
                    </div>
                    <div style="padding: 30px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px;"><strong>Name:</strong></td><td>${name}</td></tr>
                            <tr><td style="padding: 8px;"><strong>Email:</strong></td><td>${email}</td></tr>
                            ${phone ? `<tr><td style="padding: 8px;"><strong>Phone:</strong></td><td>${phone}</td></tr>` : ''}
                            ${subject ? `<tr><td style="padding: 8px;"><strong>Subject:</strong></td><td>${subject}</td></tr>` : ''}
                            ${tour ? `<tr><td style="padding: 8px;"><strong>Tour:</strong></td><td>${tour}</td></tr>` : ''}
                            <tr><td style="padding: 8px;"><strong>Message:</strong></td><td>${message.replace(/\n/g, '<br>')}</td></tr>
                        </table>
                        <p style="font-size: 12px; color: #666; margin-top: 20px;">Reply directly to: ${email}</p>
                    </div>
                </div>
            `
        });

        await sendEmail({
            to: email,
            subject: 'Thank you for contacting Oweetu Gorilla Holidays',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #d97706; padding: 20px; text-align: center; color: white;">
                        <h1>Thank You!</h1>
                    </div>
                    <div style="padding: 30px;">
                        <p>Dear ${name},</p>
                        <p>Thank you for reaching out to Oweetu Gorilla Holidays!</p>
                        <p>We have received your message and our travel experts will get back to you within 24 hours.</p>
                        <p>Warm regards,<br><strong>The Oweetu Team</strong></p>
                    </div>
                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully. We will get back to you soon!'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.',
            error: error.message
        });
    }
});

// Booking inquiry (public)
router.post('/booking-inquiry', async (req, res) => {
    try {
        const { name, email, phone, tour, travelDate, people, message } = req.body;

        if (!name || !email || !tour) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and tour are required'
            });
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'info@oweetugorillaholidays.com';

        await sendEmail({
            to: adminEmail,
            subject: `New Booking Inquiry: ${tour}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #d97706; padding: 20px; text-align: center; color: white;">
                        <h1>New Booking Inquiry</h1>
                    </div>
                    <div style="padding: 30px;">
                        <table style="width: 100%;">
                            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
                            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
                            ${phone ? `<tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>` : ''}
                            <tr><td><strong>Tour:</strong></td><td>${tour}</td></tr>
                            ${travelDate ? `<tr><td><strong>Travel Date:</strong></td><td>${travelDate}</td></tr>` : ''}
                            ${people ? `<tr><td><strong>People:</strong></td><td>${people}</td></tr>` : ''}
                            ${message ? `<tr><td><strong>Message:</strong></td><td>${message}</td></tr>` : ''}
                        </table>
                        <p style="margin-top: 20px;">Reply to: ${email} | Phone: ${phone || 'Not provided'}</p>
                    </div>
                </div>
            `
        });

        await sendEmail({
            to: email,
            subject: `Booking Inquiry Received: ${tour}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #d97706; padding: 20px; text-align: center; color: white;">
                        <h1>Booking Received</h1>
                    </div>
                    <div style="padding: 30px;">
                        <p>Dear ${name},</p>
                        <p>Thank you for your interest in <strong>${tour}</strong>!</p>
                        <p>We will get back to you within 24 hours.</p>
                        <p>Warm regards,<br><strong>The Oweetu Team</strong></p>
                    </div>
                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: 'Your booking inquiry has been submitted. We will contact you shortly!'
        });
    } catch (error) {
        console.error('Booking inquiry error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit booking inquiry',
            error: error.message
        });
    }
});

// Subscribe to newsletter (public) - SAVES TO DATABASE
router.post('/subscribe', async (req, res) => {
    try {
        const { email, name, ipAddress, userAgent } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Check if already subscribed
        const existingSubscriber = await Subscribe.findOne({ where: { email } });

        if (existingSubscriber) {
            if (existingSubscriber.status === 'active') {
                return res.status(400).json({
                    success: false,
                    message: 'This email is already subscribed to our newsletter'
                });
            } else if (existingSubscriber.status === 'unsubscribed') {
                // Reactivate subscription
                existingSubscriber.status = 'active';
                existingSubscriber.unsubscribedAt = null;
                existingSubscriber.unsubscribeToken = null;
                existingSubscriber.ipAddress = ipAddress || existingSubscriber.ipAddress;
                existingSubscriber.userAgent = userAgent || existingSubscriber.userAgent;
                await existingSubscriber.save();

                // Send welcome back email
                await sendEmail({
                    to: email,
                    subject: 'Welcome Back to Oweetu Gorilla Holidays Newsletter!',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #d97706; padding: 20px; text-align: center; color: white;">
                                <h1>Welcome Back!</h1>
                            </div>
                            <div style="padding: 30px;">
                                <p>Dear ${name || email.split('@')[0]},</p>
                                <p>You have successfully resubscribed to our newsletter!</p>
                                <p>We're glad to have you back.</p>
                                <p>Warm regards,<br><strong>The Oweetu Team</strong></p>
                            </div>
                        </div>
                    `
                });

                return res.status(200).json({
                    success: true,
                    message: 'Successfully resubscribed to newsletter!'
                });
            }
        }

        // Generate unsubscribe token
        const unsubscribeToken = crypto.randomBytes(32).toString('hex');

        // Create new subscriber
        await Subscribe.create({
            email,
            name: name || null,
            status: 'active',
            ipAddress: ipAddress || null,
            userAgent: userAgent || null,
            unsubscribeToken: unsubscribeToken
        });

        const adminEmail = process.env.ADMIN_EMAIL || 'info@oweetugorillaholidays.com';
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

        // Notify admin
        await sendEmail({
            to: adminEmail,
            subject: 'New Newsletter Subscriber',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2 style="color: #d97706;">New Subscriber!</h2>
                    <p><strong>Name:</strong> ${name || 'Not provided'}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Total Subscribers:</strong> ${await Subscribe.count({ where: { status: 'active' } })}</p>
                </div>
            `
        });

        // Send welcome email with unsubscribe link
        const unsubscribeLink = `${frontendUrl}/unsubscribe?token=${unsubscribeToken}`;

        await sendEmail({
            to: email,
            subject: 'Welcome to Oweetu Gorilla Holidays Newsletter!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #d97706; padding: 20px; text-align: center; color: white;">
                        <h1>Welcome to Our Community!</h1>
                    </div>
                    <div style="padding: 30px;">
                        <p>Dear ${name || 'Travel Enthusiast'},</p>
                        <p>Thank you for subscribing to the Oweetu Gorilla Holidays newsletter!</p>
                        <p>You'll now receive exclusive safari deals, travel tips, and special offers.</p>
                        <p>You can <a href="${unsubscribeLink}" style="color: #d97706;">unsubscribe anytime</a>.</p>
                        <p>Warm regards,<br><strong>The Oweetu Team</strong></p>
                    </div>
                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: 'Successfully subscribed to newsletter!'
        });
    } catch (error) {
        console.error('Subscribe error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to subscribe',
            error: error.message
        });
    }
});

// Unsubscribe from newsletter (public)
router.post('/unsubscribe', async (req, res) => {
    try {
        const { email, token } = req.body;

        let subscriber = null;

        if (token) {
            subscriber = await Subscribe.findOne({ where: { unsubscribeToken: token } });
        } else if (email) {
            subscriber = await Subscribe.findOne({ where: { email } });
        }

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Subscriber not found'
            });
        }

        subscriber.status = 'unsubscribed';
        subscriber.unsubscribedAt = new Date();
        await subscriber.save();

        res.status(200).json({
            success: true,
            message: 'Successfully unsubscribed from newsletter'
        });
    } catch (error) {
        console.error('Unsubscribe error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to unsubscribe',
            error: error.message
        });
    }
});

// Get all subscribers (protected - admin only)
router.get('/subscribers', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { status } = req.query;
        const where = {};

        if (status) where.status = status;

        const subscribers = await Subscribe.findAll({
            where,
            attributes: { exclude: ['unsubscribeToken'] },
            order: [['subscribedAt', 'DESC']]
        });

        const activeCount = await Subscribe.count({ where: { status: 'active' } });
        const unsubscribedCount = await Subscribe.count({ where: { status: 'unsubscribed' } });

        res.status(200).json({
            success: true,
            stats: {
                total: subscribers.length,
                active: activeCount,
                unsubscribed: unsubscribedCount
            },
            data: subscribers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch subscribers',
            error: error.message
        });
    }
});

// Send bulk email to subscribers (protected - admin only)
router.post('/send-bulk-email', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { subject, htmlContent, textContent, sendTo = 'active' } = req.body;

        if (!subject || !htmlContent) {
            return res.status(400).json({
                success: false,
                message: 'Subject and email content are required'
            });
        }

        // Get subscribers based on filter
        const where = {};
        if (sendTo === 'active') where.status = 'active';
        else if (sendTo === 'all') where.status = ['active', 'unsubscribed'];
        else if (sendTo === 'specific' && req.body.emails) {
            where.email = req.body.emails;
        }

        const subscribers = await Subscribe.findAll({ where });

        if (subscribers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No subscribers found'
            });
        }

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

        // Send emails in batches to avoid overwhelming the email server
        const batchSize = 10;
        const results = {
            total: subscribers.length,
            sent: 0,
            failed: 0,
            errors: []
        };

        for (let i = 0; i < subscribers.length; i += batchSize) {
            const batch = subscribers.slice(i, i + batchSize);

            await Promise.all(batch.map(async (subscriber) => {
                try {
                    // Add unsubscribe link to email content
                    const unsubscribeLink = `${frontendUrl}/unsubscribe?token=${subscriber.unsubscribeToken}`;
                    const personalizedHtml = htmlContent
                        .replace(/{{name}}/g, subscriber.name || 'Valued Subscriber')
                        .replace(/{{unsubscribe_link}}/g, unsubscribeLink)
                        .replace(/{{email}}/g, subscriber.email);

                    const personalizedText = textContent
                        ? textContent.replace(/{{name}}/g, subscriber.name || 'Valued Subscriber')
                            .replace(/{{unsubscribe_link}}/g, unsubscribeLink)
                            .replace(/{{email}}/g, subscriber.email)
                        : null;

                    await sendEmail({
                        to: subscriber.email,
                        subject: subject,
                        html: personalizedHtml,
                        text: personalizedText
                    });

                    results.sent++;
                } catch (error) {
                    results.failed++;
                    results.errors.push({
                        email: subscriber.email,
                        error: error.message
                    });

                    // If email bounces, mark subscriber as bounced
                    if (error.message.includes('invalid') || error.message.includes('bounce')) {
                        subscriber.status = 'bounced';
                        await subscriber.save();
                    }
                }
            }));

            // Small delay between batches
            if (i + batchSize < subscribers.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        // Log bulk email action
        console.log(`Bulk email sent: Subject "${subject}", Sent: ${results.sent}, Failed: ${results.failed}`);

        // Notify admin of completion
        const adminEmail = process.env.ADMIN_EMAIL || 'info@oweetugorillaholidays.com';
        await sendEmail({
            to: adminEmail,
            subject: `Bulk Email Completed: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Bulk Email Report</h2>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Total Recipients:</strong> ${results.total}</p>
                    <p><strong>Successfully Sent:</strong> ${results.sent}</p>
                    <p><strong>Failed:</strong> ${results.failed}</p>
                    ${results.errors.length > 0 ? `
                    <h3>Failed Emails:</h3>
                    <ul>
                        ${results.errors.slice(0, 10).map(e => `<li>${e.email}: ${e.error}</li>`).join('')}
                        ${results.errors.length > 10 ? `<li>... and ${results.errors.length - 10} more</li>` : ''}
                    </ul>
                    ` : ''}
                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: `Bulk email sent to ${results.sent} out of ${results.total} subscribers`,
            results: {
                sent: results.sent,
                failed: results.failed,
                total: results.total
            }
        });
    } catch (error) {
        console.error('Bulk email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send bulk emails',
            error: error.message
        });
    }
});

// Send test email to single subscriber (protected - admin only)
router.post('/test-email', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { email, subject, htmlContent } = req.body;

        if (!email || !subject || !htmlContent) {
            return res.status(400).json({
                success: false,
                message: 'Email, subject, and content are required'
            });
        }

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const testUnsubscribeLink = `${frontendUrl}/unsubscribe?token=test-token`;

        const personalizedHtml = htmlContent
            .replace(/{{name}}/g, 'Test User')
            .replace(/{{unsubscribe_link}}/g, testUnsubscribeLink)
            .replace(/{{email}}/g, email);

        await sendEmail({
            to: email,
            subject: `[TEST] ${subject}`,
            html: `
                <div style="border: 2px solid #d97706; padding: 10px; margin-bottom: 10px;">
                    <p style="color: #d97706; font-weight: bold;">TEST EMAIL - This is a preview of your newsletter</p>
                </div>
                ${personalizedHtml}
                <div style="border: 2px solid #d97706; padding: 10px; margin-top: 10px;">
                    <p style="color: #d97706; font-weight: bold;">TEST EMAIL - This is a preview only</p>
                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: `Test email sent to ${email}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to send test email',
            error: error.message
        });
    }
});

// Export subscribers as CSV (protected - admin only)
router.get('/export-subscribers', authenticate, authorize('admin'), async (req, res) => {
    try {
        const subscribers = await Subscribe.findAll({
            where: { status: 'active' },
            attributes: ['email', 'name', 'subscribedAt', 'ipAddress']
        });

        let csv = 'Email,Name,Subscribed Date,IP Address\n';
        subscribers.forEach(sub => {
            csv += `"${sub.email}","${sub.name || ''}","${sub.subscribedAt}","${sub.ipAddress || ''}"\n`;
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to export subscribers',
            error: error.message
        });
    }
});

module.exports = router;