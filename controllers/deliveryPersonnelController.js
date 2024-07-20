// controllers/deliveryPersonnelController.js
const DeliveryPersonnel = require('../models/deliveryPersonnel');

// Get all delivery personnel
exports.getAllDeliveryPersonnel = async (req, res) => {
    try {
        const personnel = await DeliveryPersonnel.find();
        res.status(200).json(personnel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new delivery personnel
exports.createDeliveryPersonnel = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        
        // Validate input fields
        if (!name || !email || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newPersonnel = new DeliveryPersonnel({
            name,
            email,
            phone,
            address
        });
        const savedPersonnel = await newPersonnel.save();
        res.status(201).json(savedPersonnel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update delivery personnel details
exports.updateDeliveryPersonnel = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate ID
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const updatedPersonnel = await DeliveryPersonnel.findByIdAndUpdate(id, req.body, { new: true });

        // Check if personnel exists
        if (!updatedPersonnel) {
            return res.status(404).json({ message: 'Delivery personnel not found' });
        }

        res.status(200).json(updatedPersonnel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete delivery personnel
exports.deleteDeliveryPersonnel = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate ID
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const deletedPersonnel = await DeliveryPersonnel.findByIdAndDelete(id);

        // Check if personnel exists
        if (!deletedPersonnel) {
            return res.status(404).json({ message: 'Delivery personnel not found' });
        }

        res.status(200).json({ message: 'Delivery personnel deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
