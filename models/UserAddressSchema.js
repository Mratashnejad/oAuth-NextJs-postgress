import {Schema , model} from 'mongoose'

const  UserAddressSchema = new Schema ({
    uid : {type : String , require : true , uniqe : true},
    city: { type: String },
    country: { type: String },
    state: { type: String },
    province: { type: String },
    zipcode: { type: String },
    plate: { type: String },
    apartment: { type: String },
    houseNumber: { type: String },
    doorColor: { type: String },
    details : {type : String},
})

const Address = mongoose.model('Address' , UserAddressSchema)

export default Address