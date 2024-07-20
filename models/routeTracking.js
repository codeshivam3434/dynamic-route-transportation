const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeTrackingSchema = new Schema({
    deliveryPersonnelId: { type: Schema.Types.ObjectId, ref: 'DeliveryPersonnel', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    location: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RouteTracking', routeTrackingSchema);
