import mongoose from 'mongoose';

const ExpertFeedbackSchema = new mongoose.Schema({
    expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }, // Reference to the expert being rated
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }, // Reference to the user providing the feedback
    politeness: { type: Boolean, default: false }, // Whether the expert was polite
    odorless: { type: Boolean, default: false }, // Whether the expert had no malodor
    cleanliness: { type: Boolean, default: false }, // Whether the expert maintained cleanliness
    punctuality: { type: Boolean, default: false }, // Whether the expert was punctual
    expertise: { type: Boolean, default: false }, // Whether the expert demonstrated expertise
    comments: { type: String }, // Optional comments about the expert
    createdAt: { type: Date, default: Date.now },
});

const ExpertFeedback = mongoose.model('ExpertFeedback', ExpertFeedbackSchema);

export default ExpertFeedback;
