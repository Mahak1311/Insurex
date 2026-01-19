const axios = require('axios');

// Fallback hospital data for when API fails
const fallbackHospitals = {
    '380001': [
        {
            name: 'SVP Hospital',
            address: 'Ellisbridge, Ahmedabad, Gujarat 380006',
            location: { lat: 23.0264, lng: 72.5843 },
            distanceKm: 2.1,
            rating: 4.3,
            cashlessLikely: true
        },
        {
            name: 'Civil Hospital',
            address: 'Asarwa, Ahmedabad, Gujarat 380016',
            location: { lat: 23.0358, lng: 72.5873 },
            distanceKm: 3.2,
            rating: 4.1,
            cashlessLikely: true
        }
    ],
    '110001': [
        {
            name: 'Delhi Heart & Lung Institute',
            address: 'Ranjit Nagar, Delhi 110001',
            location: { lat: 28.6406, lng: 77.1926 },
            distanceKm: 2.4,
            rating: 4.3,
            cashlessLikely: true
        }
    ]
};

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

// Convert PINCODE -> Coordinates (Geocoding API)
async function getCoordinatesFromPincode(pincode, apiKey) {
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

// Find nearby hospitals (Places API New)
async function getNearbyHospitals(lat, lng, apiKey) {
    const radius = 5000; // 5km radius
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

exports.handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            body: ''
        };
    }

    const pincode = event.queryStringParameters?.pincode;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // Validate Pincode
    if (!pincode || !/^\d{6}$/.test(pincode)) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Invalid pincode. Please provide a 6-digit Indian pincode.' })
        };
    }

    // If no API key, use fallback data
    if (!apiKey) {
        console.warn('Missing GOOGLE_MAPS_API_KEY, using fallback data');
        const fallback = fallbackHospitals[pincode] || [];
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pincode,
                searchLocation: fallback[0]?.location || { lat: 0, lng: 0 },
                count: fallback.length,
                hospitals: fallback,
                note: 'Using fallback data - API key not configured'
            })
        };
    }

    try {
        // Step 1: Get Coordinates
        const location = await getCoordinatesFromPincode(pincode, apiKey);
        if (!location) {
            // Use fallback if available
            const fallback = fallbackHospitals[pincode] || [];
            if (fallback.length > 0) {
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pincode,
                        searchLocation: fallback[0].location,
                        count: fallback.length,
                        hospitals: fallback,
                        note: 'Using fallback data - geocoding failed'
                    })
                };
            }
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Location not found for this pincode.', pincode })
            };
        }

        // Step 2: Get Hospitals
        const rawHospitals = await getNearbyHospitals(location.lat, location.lng, apiKey);

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
                cashlessLikely: Math.random() > 0.5 // Mocked for demo
            }))
            .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0)) // Sort by distance
            .slice(0, 10); // Limit to top 10

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pincode,
                searchLocation: location,
                count: hospitals.length,
                hospitals
            })
        };

    } catch (error) {
        console.error('Server Error:', error);
        
        // Try fallback data on error
        const fallback = fallbackHospitals[pincode] || [];
        if (fallback.length > 0) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pincode,
                    searchLocation: fallback[0].location,
                    count: fallback.length,
                    hospitals: fallback,
                    note: 'Using fallback data - API error occurred'
                })
            };
        }
        
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Internal Server Error', details: error.message })
        };
    }
};
