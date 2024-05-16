import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    amount: { type: Number, require: true },
    type: { type: String, enum: ['credit', 'debit'], require: true },
    description: { type: String },
    timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
