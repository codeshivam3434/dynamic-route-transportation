const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliveryPersonnelSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    assignedOrderId: { type: Schema.Types.ObjectId, ref: 'Order', default: null },
    location: { type: String, required: true },
    status: { type: String, enum: ['available', 'on_delivery'], default: 'available' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

deliveryPersonnelSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('DeliveryPersonnel', deliveryPersonnelSchema);
