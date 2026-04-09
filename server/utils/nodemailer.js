const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER || 'info@oweetugorillaholidays.com',
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify transporter
const verifyTransporter = async () => {
    try {
        await transporter.verify();
        console.log('Email transporter is ready');
    } catch (error) {
        console.error('Email transporter error:', error);
    }
};

// Send email function
const sendEmail = async ({ to, subject, html, text, attachments = [] }) => {
    try {
        const mailOptions = {
            from: `"Oweetu Gorilla Holidays" <${process.env.SMTP_USER || 'info@oweetugorillaholidays.com'}>`,
            to,
            subject,
            html,
            text: text || html.replace(/<[^>]*>/g, ''),
            attachments
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
};

// Email templates
const emailTemplates = {
    // Welcome email template
    welcome: (name, email) => ({
        subject: 'Welcome to Oweetu Gorilla Holidays!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #f5f5f5; padding: 20px; text-align: center;">
                    <img src="https://oweetugorillaholidays.com/logo.png" alt="Oweetu" style="max-width: 150px;">
                </div>
                <div style="padding: 30px;">
                    <h2 style="color: #d97706;">Welcome ${name}!</h2>
                    <p>Thank you for joining Oweetu Gorilla Holidays. We're excited to help you plan your dream African safari adventure.</p>
                    <p>With us, you'll discover:</p>
                    <ul>
                        <li>Incredible gorilla trekking experiences</li>
                        <li>Customized safari packages</li>
                        <li>Expert local guides</li>
                        <li>Best price guaranteed</li>
                    </ul>
                    <p>Start exploring our amazing destinations today!</p>
                    <a href="https://oweetugorillaholidays.com/explore" style="display: inline-block; background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Explore Safaris</a>
                </div>
                <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                    <p>Oweetu Gorilla Holidays | info@oweetugorillaholidays.com | +256 XXX XXX XXX</p>
                    <p>&copy; ${new Date().getFullYear()} All rights reserved.</p>
                </div>
            </div>
        `
    }),

    // Booking inquiry template
    bookingInquiry: (data) => ({
        subject: `New Booking Inquiry: ${data.tour}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #d97706;">New Booking Inquiry</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phone}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Tour:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.tour}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Travel Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.travelDate}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Number of People:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.people}</td></tr>
                    <tr><td style="padding: 8px; vertical-align: top;"><strong>Message:</strong></td><td style="padding: 8px;">${data.message}</td></tr>
                </table>
                <p style="margin-top: 20px;">Please respond to this inquiry within 24 hours.</p>
            </div>
        `
    }),

    // Contact form template
    contactForm: (data) => ({
        subject: `New Contact Message from ${data.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #d97706;">New Contact Message</h2>
                <p><strong>From:</strong> ${data.name} (${data.email})</p>
                <p><strong>Subject:</strong> ${data.subject}</p>
                <div style="background: #f5f5f5; padding: 15px; margin: 15px 0;">
                    <p><strong>Message:</strong></p>
                    <p>${data.message}</p>
                </div>
                <p>Reply directly to: ${data.email}</p>
            </div>
        `
    }),

    // Auto-reply template
    autoReply: (name) => ({
        subject: 'Thank you for contacting Oweetu Gorilla Holidays',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #f5f5f5; padding: 20px; text-align: center;">
                    <img src="https://oweetugorillaholidays.com/logo.png" alt="Oweetu" style="max-width: 150px;">
                </div>
                <div style="padding: 30px;">
                    <h2 style="color: #d97706;">Dear ${name},</h2>
                    <p>Thank you for reaching out to Oweetu Gorilla Holidays!</p>
                    <p>We have received your inquiry and our travel experts will get back to you within 24 hours.</p>
                    <p>While you wait, feel free to explore our:</p>
                    <ul>
                        <li><a href="https://oweetugorillaholidays.com/safaris">Latest Safari Packages</a></li>
                        <li><a href="https://oweetugorillaholidays.com/destinations">Amazing Destinations</a></li>
                        <li><a href="https://oweetugorillaholidays.com/blog">Travel Tips & Guides</a></li>
                    </ul>
                    <p>For urgent matters, please call us at +256 XXX XXX XXX.</p>
                    <p>We look forward to helping you create unforgettable memories!</p>
                    <p>Warm regards,<br><strong>The Oweetu Team</strong></p>
                </div>
                <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                    <p>Oweetu Gorilla Holidays | info@oweetugorillaholidays.com</p>
                </div>
            </div>
        `
    }),

    // Newsletter template
    newsletter: (email, content) => ({
        subject: content.subject || 'Oweetu Gorilla Holidays Newsletter',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #d97706; padding: 20px; text-align: center; color: white;">
                    <h1>Oweetu Gorilla Holidays</h1>
                    <p>Your Gateway to African Adventures</p>
                </div>
                <div style="padding: 30px;">
                    ${content.html || '<p>Check out our latest safari packages and exclusive offers!</p>'}
                    <a href="https://oweetugorillaholidays.com/unsubscribe?email=${encodeURIComponent(email)}" style="font-size: 12px; color: #999;">Unsubscribe</a>
                </div>
            </div>
        `
    })
};

// Send booking confirmation
const sendBookingConfirmation = async (bookingData, userEmail) => {
    return await sendEmail({
        to: userEmail,
        subject: `Booking Confirmation: ${bookingData.tour}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #d97706;">Booking Confirmed!</h2>
                <p>Dear ${bookingData.name},</p>
                <p>Your booking for <strong>${bookingData.tour}</strong> has been confirmed.</p>
                <p>Booking Reference: <strong>${bookingData.reference}</strong></p>
                <p>We'll send you more details about your itinerary soon.</p>
                <p>Thank you for choosing Oweetu Gorilla Holidays!</p>
            </div>
        `
    });
};

// Send admin notification
const sendAdminNotification = async (type, data) => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@oweetugorillaholidays.com';

    return await sendEmail({
        to: adminEmail,
        subject: `Admin Notification: ${type}`,
        html: `
            <div style="font-family: Arial, sans-serif;">
                <h2>${type}</h2>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>
        `
    });
};

module.exports = {
    transporter,
    verifyTransporter,
    sendEmail,
    emailTemplates,
    sendBookingConfirmation,
    sendAdminNotification
};