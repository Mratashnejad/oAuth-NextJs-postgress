import mongoose from 'mongoose';

const JobSchema = new Schema ({
    customerId : {type : mongoose.Schema.ObjectId , ref : 'User' , require : true},
    expertId   : {type : mongoose.Schema.ObjectId , ref : 'User' , require : true},

    //category
    categoryId : {type : mongoose.Schema.ObjectId , ref : 'Category' , require :true},
   
    // address
    selectedAddress : {type :mongoose.Schema.ObjectId , ref : 'Address' , require : true},
    //// other details
    price      : {type : Number},
    description : {type : String},
    workingHours : {type : String},
    
    
    //status
    status : {type : String ,
        eunm :[
            'open',
            'completed',
        ] , default : 'open'},


})

const Job = mongoose.Model('Job' , JobSchema)

export default Job;