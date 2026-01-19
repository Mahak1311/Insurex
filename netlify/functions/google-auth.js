// Netlify Serverless Function for Google OAuth
// This allows you to run the backend on Netlify without a separate server

const { OAuth2Client } = require('google-auth-library');

exports.handler = async function(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    const { token } = JSON.parse(event.body);
    
    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing token' })
      };
    }

    // Check if GOOGLE_CLIENT_ID is configured
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    if (!GOOGLE_CLIENT_ID) {
      console.error('GOOGLE_CLIENT_ID not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Verify the Google token
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    
    if (!payload) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid token' })
      };
    }

    // Return user data
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture
        }
      })
    };
  } catch (error) {
    console.error('Google auth error:', error.message);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Authentication failed: ' + error.message })
    };
  }
};
