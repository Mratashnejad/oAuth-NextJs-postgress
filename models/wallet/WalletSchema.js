import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true , unique :true},
    balance: { type: Number, default: 0 },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
});

const Wallet = mongoose.models.Wallet ||  mongoose.model('Wallet', WalletSchema)

export default Wallet;
