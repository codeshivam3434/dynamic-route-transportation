// routes/routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const appointmentsController = require('../controllers/appointmentsController');
const deliveryPersonnelController = require('../controllers/deliveryPersonnelController');
const ordersController = require('../controllers/ordersController');
const { authorized, verifyAdmin } = require('../middlewares/auth');

// Appointment routes
router.post('/appointments', verifyAdmin, appointmentsController.createAppointment);
router.get('/appointments', verifyAdmin, appointmentsController.getAllAppointments);
router.put('/appointments/:id', verifyAdmin, appointmentsController.updateAppointment);
router.delete('/appointments/:id', verifyAdmin, appointmentsController.deleteAppointment);

// Delivery Personnel routes
router.post('/deliveryPersonnel', verifyAdmin, deliveryPersonnelController.createDeliveryPersonnel);
router.get('/deliveryPersonnel', verifyAdmin, deliveryPersonnelController.getAllDeliveryPersonnel);
router.put('/deliveryPersonnel/:id', verifyAdmin, deliveryPersonnelController.updateDeliveryPersonnel);
router.delete('/deliveryPersonnel/:id', verifyAdmin, deliveryPersonnelController.deleteDeliveryPersonnel);

// Order routes
router.get('/orders', verifyAdmin, ordersController.getAllOrders);
router.put('/orders/accept/:id', verifyAdmin, ordersController.acceptOrder);
router.put('/orders/reject/:id', verifyAdmin, ordersController.rejectOrder);

// Authentication routes
router.post('/signup', authController.register);
router.post('/login', authorized,authController.login);
// route

const routeController = require('../controllers/routeController');

router.post('/optimize', routeController.optimizeRoute);

// 
const locationController = require('../controllers/locationController');

router.post('/add', locationController.addLocation);
router.get('/all', locationController.getAllLocations);


module.exports = router;
