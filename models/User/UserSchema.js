import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema ({
    email : {type : String , unique : true},
    password : { type : String  , required : true},
    phoneNumber : {type : String , require : true , unique : true}, //User Phone

    //user Information
    name :{ type : String},
    family : { type : String},
    avatar : { type : String},
    bio : {type : String},

    //category
    category :{type :String }, // user category should come from the selected category
    skills : [{type:String}], // skills 

     // User Language
    language: [{type: String}],
   
    // user Address
    city: {type: String}, // Reference to Address model
    country:{type :String}, // location user country , city
    state:{type:String}, // Nork Marash , ...
    street:{type:String},// vilnius 
    apartment:{type:String}, // 7 
    plate:{type:String},//123

    //Review
    rate : [{type: String}],
    receivedReviews :[{type: String}],
    givenReviews :[{type:String}],


    //Safety and Emergncy Managment
    redFlags :   [{type : String , default: 0}],//Red flags 
    KPI :        [{type : String , default: 0}],//Key Performance Indicators
    violations : [{type : String , default: 0}],// List of violations committed by the user
    breachs :    [{type : String , default: 0}],// Security breaches or incidents involving the user
    //Emergency Contact Information
    EmergencyParentName: { type : String},// Emergency contact person's name
    EmergencyParentRelationship : {type : String} , // Relationship to the user (e.g., parent, spouse)
    EmergencyPhoneNumber : {type : String}, // Emergency contact phone number
    EmergencySOSNumber : {type : String},// Emergency Number (102, 911 ) related to Armenia.

       // Timestamps
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now },
   }, { timestamps: true } // Enable automatic management of createdAt and updatedAt
); 
   
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;