import nodemailer from 'nodemailer';

// Configure the email transporter
// NOTE: In a real production app, use environment variables for credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

export async function sendStatusEmail(to: string, fullName: string, status: 'Accepted' | 'Rejected') {
    const subject = status === 'Accepted'
        ? 'Welcome to V64chessclub! - Registration Accepted'
        : 'Update on your V64chessclub Registration';

    const message = status === 'Accepted'
        ? `Dear ${fullName},

Congratulations! Your registration for the Free Trial at V64chessclub has been accepted. 

Our team will contact you shortly with further details about your schedule and coach assignment.

Best regards,
The V64chessclub Team`
        : `Dear ${fullName},

Thank you for your interest in V64chessclub. 

We regret to inform you that we are unable to accept your registration for the Free Trial at this time due to high demand and limited slots. 

We encourage you to try again in the future.

Best regards,
The V64chessclub Team`;

    try {
        // Only attempt to send if credentials are provided, otherwise log to console for development
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail({
                from: '"V64chessclub" <no-reply@V64chessclub.com>',
                to,
                subject,
                text: message,
            });
            console.log(`Email sent to ${to} with status ${status}`);
        } else {
            console.log('--- MOCK EMAIL ---');
            console.log(`To: ${to}`);
            console.log(`Subject: ${subject}`);
            console.log(`Message: ${message}`);
            console.log('------------------');
            console.log('TIP: Set EMAIL_USER and EMAIL_PASS environment variables to send real emails.');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
