const nodemailer = require('nodemailer');

// In-memory OTP storage (use Redis in production)
const otpStore = new Map();

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Configure email transporter
const getTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

exports.handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { email, phone, name } = JSON.parse(event.body);
        
        if (!email || !phone) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Email and phone are required' })
            };
        }

        // Generate OTP
        const otp = generateOTP();
        const key = `${email}:${phone}`;
        
        // Store OTP with 5-minute expiry
        otpStore.set(key, {
            otp,
            expiry: Date.now() + 5 * 60 * 1000,
            attempts: 0
        });

        // Send email
        try {
            const transporter = getTransporter();
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your Insurex Verification Code',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #ef4444;">Insurex - Verify Your Account</h2>
                        <p>Hi ${name},</p>
                        <p>Your verification code is:</p>
                        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #ef4444; border-radius: 8px; margin: 20px 0;">
                            ${otp}
                        </div>
                        <p>This code will expire in 5 minutes.</p>
                        <p>If you didn't request this code, please ignore this email.</p>
                        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
                            This is an automated message from Insurex. Please do not reply to this email.
                        </p>
                    </div>
                `
            });

            console.log(`OTP sent to ${email}: ${otp}`);
            
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    success: true, 
                    message: 'OTP sent successfully',
                    debug: process.env.NODE_ENV === 'development' ? { otp } : undefined
                })
            };
        } catch (emailError) {
            console.error('Email sending failed:', emailError.message);
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    error: 'Failed to send OTP email. Please check your email address.',
                    details: emailError.message 
                })
            };
        }
    } catch (err) {
        console.error('Send OTP error:', err.message);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Failed to send OTP' })
        };
    }
};
