import mongoose from 'mongoose';

const CustomerRatingSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }, // Reference to the rated customer
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }, // Reference to the reviewer (another user)
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating given by the reviewer (1-5)
    reviewText: { type: String }, // Review text provided by the reviewer
    createdAt: { type: Date, default: Date.now },
});

const CustomerRating = mongoose.model('CustomerRating', CustomerRatingSchema);

export default CustomerRating;
