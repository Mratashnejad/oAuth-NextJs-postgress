import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema ({

    uid:{ type:String , require : true ,unique : true}, //Firebase UID
    email : {type : String , unique : true},
    password : { type : String  , required : true},
    phoneNumber : {type : String , require : true , unique : true}, //User Phone

    //user Information
    name :{ type : String},
    family : { type : String},
    avatar : { type : String},
    bio : {type : String},
    category :{type :String }, // user category should come from the selected category
    location : {type :String}, // location user country , city
    skills : [{type:String}], // skills 
    
     // User Language
    language: [{type: String}],
    rate : [{type: String}],

    // user Address
    addresses: [{type: String}], // Reference to Address model
    //user Categoreis

    //Review
    receivedReviews :[{type: String}],
    givenReviews    :[{type:String}],

    //Safety and Emergncy Managment
    redFlags :   [{type : String , default: 0}],//Red flags 
    KPI :        [{type : String , default: 0}],//Key Performance Indicators
    violations : [{type : String , default: 0}],// List of violations committed by the user
    breachs :    [{type : String , default: 0}],// Security breaches or incidents involving the user


    //Emergency Contact Information
    emergencyContact:{
        name: { type : String},// Emergency contact person's name
        relationship : {type : String} , // Relationship to the user (e.g., parent, spouse)
        phoneNumber : {type : String} // Emergency contact phone number
    },
    emergencyNumber : {type : String},// Emergency Number (102, 911 ) related to Armenia.

       // Timestamps
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now },
   }, { timestamps: true } // Enable automatic management of createdAt and updatedAt
); 
   
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;