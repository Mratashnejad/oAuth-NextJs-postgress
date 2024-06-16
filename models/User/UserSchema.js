import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema ({

    uid:{ type:String , require : true ,unique : true}, //Firebase UID
    // email : {type : String , unique : true},
    // password : { type : String  , required : true} 
    phoneNumber : {type : String , require : true , unique : true}, //User Phone
    email : {type : String },

    //user Information
    name :{ type : String},
    family : { type : String},
    avatar : { type : String},
    bio : {type : String},
    
     // User Language
    language: [{type: String}],
    rate : {type:mongoose.Schema.Types.ObjectId , ref:'ExpertRating'},

    // user Address
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }], // Reference to Address model
    //user Categoreis
    selectedCategories : [
        {
            category : {type : mongoose.Schema.Types.ObjectId , ref : 'Category'},
            subcategories : [
                {type : mongoose.Schema.Types.ObjectId , ref :'SubCategorySchema'}
            ],
        }
    ],

    //Jobs
    postedJobs:[{type : mongoose.Schema.Types.ObjectId , ref: 'Job'}], // jobs posted by the user (customer)
    takenJobs :[{type : mongoose.Schema.Types.ObjectId , ref: 'Job'}], // Jobs Taken By the User ( Expert )

    //Review
    receivedReviews :[{type :mongoose.Schema.Types.ObjectId , ref: 'CustomerRating'}],
    givenReviews    :[{type :mongoose.Schema.Types.ObjectId , ref: 'CustomerRating'}],

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

    //virtual property to calculate number of jobs
    jobCount :{ type:Number , 
        default:function (){
            return this.postedJobs.length + this.takenJobs.length;
    }},

    // Virtual property to calculate number of completed jobs
    completedJobCount:{
        type : Number,
        default : function(){
            const totalJobs =   [...this.postedJobs , ...this.takenJobs];
            return totalJobs.reduce((count , job)=>{
                return count + (job.status === 'completed' ? 1 : 0);
            }, 0 );
        },
   },
   role :{
    isAdmin : {type :Boolean , default :false}, // is user admin ? default is false.
    isExpert : {type : Boolean , default : false}, //is user is Expert ? default false.
    isCustomer : {type :Boolean , default : false },// is user is a customer ? default false.
   },


       // Timestamps
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now },
   }, { timestamps: true } // Enable automatic management of createdAt and updatedAt
); 
   
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;