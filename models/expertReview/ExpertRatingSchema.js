import mongoose from 'mongoose';

const ExpertRatingSchema = new mongoose.Schema({
    expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the rated expert
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the reviewer (another user)
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating given by the reviewer (1-5)
    reviewText: { type: String }, // Review text provided by the reviewer

    //items for logos 

    politeness: { type: Boolean, default: false }, // Whether the expert was polite
    odorless: { type: Boolean, default: false }, // Whether the expert had no malodor
    cleanliness: { type: Boolean, default: false }, // Whether the expert maintained cleanliness
    punctuality: { type: Boolean, default: false }, // Whether the expert was punctual
    expertise: { type: Boolean, default: false }, // Whether the expert demonstrated expertise


    createdAt: { type: Date, default: Date.now },
});

const ExpertRating = mongoose.models.ExpertRating || mongoose.model('ExpertRating', ExpertRatingSchema);

export default ExpertRating;
