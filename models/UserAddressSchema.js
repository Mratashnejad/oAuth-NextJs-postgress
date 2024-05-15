import mongoose from 'mongoose';

const UserAddressSchema = new mongoose.Schema({
    userId:{type:String },
    city: { type: String },
    country: { type: String },
    state: { type: String },
    province: { type: String },
    zipcode: { type: String },
    plate: { type: String },
    apartment: { type: String },
    houseNumber: { type: String },
    doorColor: { type: String },
    details: { type: String },
    
});

const Address = mongoose.models.Address || mongoose.model('Address', UserAddressSchema);
export default Address;
