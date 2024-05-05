import mongoose from 'mongoose';

const CustomerFeedbackSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the customer being rated
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user providing the feedback
    politeness: { type: Boolean, default: false }, // Whether the customer was polite
    odorless: { type: Boolean, default: false }, // Whether the customer had no malodor
    cleanliness: { type: Boolean, default: false }, // Whether the customer's place was clean
    punctuality: { type: Boolean, default: false }, // Whether the customer was punctual
    communication: { type: Boolean, default: false }, // Whether the customer had good communication
    comments: { type: String }, // Optional comments about the customer
    createdAt: { type: Date, default: Date.now },
});

const CustomerFeedback = mongoose.model('CustomerFeedback', CustomerFeedbackSchema);

export default CustomerFeedback;
