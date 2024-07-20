const Location = require('../models/location');
const { optimizeRoute } = require('../utils/routeUtils');

exports.optimizeRoute = async (req, res) => {
  try {
    const { startLocation, endLocation, timeWindows, isEmergency } = req.body;

    // Fetch locations from database
    const locations = await Location.find();

    // Implement the route optimization considering traffic, emergency, and time windows
    const optimizedRoute = await optimizeRoute(locations, startLocation, endLocation, timeWindows, isEmergency);

    res.status(200).json(optimizedRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
