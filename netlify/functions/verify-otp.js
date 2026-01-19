// In-memory OTP storage (shared with send-otp - in production use Redis)
const otpStore = new Map();

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
        const { email, phone, otp } = JSON.parse(event.body);
        
        if (!email || !phone || !otp) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Email, phone, and OTP are required' })
            };
        }

        const key = `${email}:${phone}`;
        const stored = otpStore.get(key);

        if (!stored) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'OTP expired or not found. Please request a new one.' })
            };
        }

        // Check expiry
        if (Date.now() > stored.expiry) {
            otpStore.delete(key);
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'OTP has expired. Please request a new one.' })
            };
        }

        // Check attempts (prevent brute force)
        if (stored.attempts >= 3) {
            otpStore.delete(key);
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Too many failed attempts. Please request a new OTP.' })
            };
        }

        // Verify OTP
        if (stored.otp !== otp) {
            stored.attempts++;
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    error: 'Invalid OTP. Please try again.',
                    attemptsLeft: 3 - stored.attempts
                })
            };
        }

        // OTP verified successfully - delete it
        otpStore.delete(key);
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                success: true, 
                message: 'OTP verified successfully' 
            })
        };
    } catch (err) {
        console.error('Verify OTP error:', err.message);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Failed to verify OTP' })
        };
    }
};
