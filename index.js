// index.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);

// Test route
app.get('/test', (req, res) => {
    res.send('Test route working!');
});

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
