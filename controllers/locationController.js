const Location = require('../models/location');

exports.addLocation = async (req, res) => {
  const { address, lat, lng } = req.body;

  try {
    const location = new Location({ address, lat, lng });
    await location.save();
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Error adding location' });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching locations' });
  }
};
