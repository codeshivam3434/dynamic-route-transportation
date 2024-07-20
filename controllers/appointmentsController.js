const Appointment = require('../models/appointment');

// Create an appointment
exports.createAppointment = async (req, res) => {
    try {
        const { clinic, hospital, date, time, status } = req.body;
        const newAppointment = new Appointment({ clinic, hospital, date, time, status });
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        await Appointment.findByIdAndDelete(id);
        res.status(200).json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
