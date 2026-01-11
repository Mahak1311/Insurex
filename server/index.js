import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

app.use(cors());
app.use(express.json());

// Google OAuth verification
app.post('/api/auth/google', async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: 'Missing token' });
        }
        if (!googleClient) {
            return res.status(500).json({ error: 'Server missing GOOGLE_CLIENT_ID' });
        }

        const ticket = await googleClient.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const { sub, email, name, picture } = payload;
        return res.json({
            user: {
                id: sub,
                email,
                name,
                picture
            }
        });
    } catch (err) {
        console.error('Google auth error:', err.message);
        return res.status(401).json({ error: 'Authentication failed' });
    }
});

// Helper function to calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return parseFloat(d.toFixed(2));
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// 1. Convert PINCODE -> Coordinates (Geocoding API)
async function getCoordinatesFromPincode(pincode) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error('Google Maps API Key is missing');

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&region=in&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status !== 'OK') {
            console.error('Geocoding API Error:', response.data.status);
            return null;
        }
        const location = response.data.results[0].geometry.location;
        return location; // { lat: number, lng: number }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        return null;
    }
}

// 2. Find nearby hospitals (Places API New)
async function getNearbyHospitals(lat, lng) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const radius = 5000; // 5km radius

    // Using the new Places API (New) - Nearby Search
    const url = 'https://places.googleapis.com/v1/places:searchNearby';

    const requestBody = {
        includedTypes: ['hospital'],
        maxResultCount: 20,
        locationRestriction: {
            circle: {
                center: {
                    latitude: lat,
                    longitude: lng
                },
                radius: radius
            }
        }
    };

    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.id'
            }
        });

        // Transform new API response to match old format
        const places = response.data.places || [];
        return places.map(place => ({
            name: place.displayName?.text || 'Unknown',
            vicinity: place.formattedAddress || '',
            geometry: {
                location: {
                    lat: place.location?.latitude,
                    lng: place.location?.longitude
                }
            },
            place_id: place.id,
            rating: place.rating,
            user_ratings_total: place.userRatingCount
        }));
    } catch (error) {
        console.error('Error fetching hospitals:', error.response?.data || error.message);
        return [];
    }
}

// Main Route
app.get('/api/hospitals', async (req, res) => {
    const { pincode } = req.query;

    // Validate Pincode
    if (!pincode || !/^\d{6}$/.test(pincode)) {
        return res.status(400).json({ error: 'Invalid pincode. Please provide a 6-digit Indian pincode.' });
    }

    try {
        // Step 1: Get Coordinates
        const location = await getCoordinatesFromPincode(pincode);
        if (!location) {
            return res.status(404).json({ error: 'Location not found for this pincode.', pincode });
        }

        // Step 2: Get Hospitals
        const rawHospitals = await getNearbyHospitals(location.lat, location.lng);

        // Step 3: Format Response
        const hospitals = rawHospitals
            .filter(hospital => hospital && hospital.geometry?.location)
            .map(hospital => ({
                name: hospital.name || 'Unknown Hospital',
                address: hospital.vicinity || 'Address not available',
                location: hospital.geometry.location,
                distanceKm: calculateDistance(location.lat, location.lng, hospital.geometry.location?.lat, hospital.geometry.location?.lng),
                placeId: hospital.place_id,
                rating: hospital.rating,
                userRatingsTotal: hospital.user_ratings_total,
                source: 'google_places',
                cashlessLikely: Math.random() > 0.5 // Mocked for hackathon demo
            }))
            .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0)) // Sort by distance
            .slice(0, 10); // Limit to top 10

        res.json({
            pincode,
            searchLocation: location,
            count: hospitals.length,
            hospitals
        });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
