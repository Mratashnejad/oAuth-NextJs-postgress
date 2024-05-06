import mongoose from 'mongoose';

const JobSchema = new Schema ({
    customerId : {type : mongoose.Schema.ObjectId , ref : 'User' , require : true},
    expertId   : {type : mongoose.Schema.ObjectId , ref : 'User' , require : true},

    //category
    categoryId : {type : mongoose.Schema.ObjectId , ref : 'Category' , require :true},
   
    // address
    addresses: {type : mongoose.Schema.ObjectId , ref :'address'},

    //// other details
    price      : {type : Number},
    description : {type : String},
    workingHours : {type : String},
    
    // Wallet reference
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },

    // Badges
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],

    //Transactions
    transaction : [{type : mongoose.Schema.type.ObjectId , ref: 'Transaction'}],

    //status
    status : {type : String ,
        eunm :[
            'open',
            'completed',
        ] , default : 'open'},


})

const Job = mongoose.Model('Job' , JobSchema)

export default Job;