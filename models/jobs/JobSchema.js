import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema ({
    customerId : {type : mongoose.Schema.ObjectId , ref : 'User' , require : true},
    expertId   : {type : mongoose.Schema.ObjectId , ref : 'User' , require : true},

    //category
    categoryId : {type : mongoose.Schema.ObjectId , ref : 'Category' , require :true},
   
    // address
    addresses: {type : mongoose.Schema.ObjectId , ref :'address'},

    //// other details
    price      : {type : Number},
    description : {type : String},
    estimatedTime : {type : String},
    
    // // Wallet reference
    // wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },

    // Badges
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],

    // //Transactions
    // transaction : [{type : mongoose.Schema.type.ObjectId , ref: 'Transaction'}],

    //status
    status : {type : String ,
        eunm :[
            'open',
            'inComplate',
            'completed',
            
        ] , default : 'open'},


})

const Job = mongoose.models.Job || mongoose.model('Job' , JobSchema)


export default Job;