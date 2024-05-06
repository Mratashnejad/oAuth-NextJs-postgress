import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema ({

    uid:{ type:String , require : true ,unique : true}, //Firebase UID
    // email : {type : String , unique : true},
    // password : { type : String  , required : true} 
    phoneNumber : {type : String , require : true , unique : true}, //User Phone
    email : {type : String , unique : true}, // user email is not reqiure but it must be unique

    //user Information
    name :{ type : String},
    family : { type : String},
    avatar : { type : String},
    bio : {type : String},

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
    jobs : [
        {
            type : mongoose.Schema.Types.ObjectId, ref:'Job'
        },
    ],


    //Safety and Emergncy Managment
    redFlags : [{type : String}],
    KPI : [{type :String}] , //Key Performance Indicators
    violations : [{type : String}],// List of violations committed by the user
    breachs : [{type : String}],// Security breaches or incidents involving the user


    //Emergency Contact Information
    emergencyContact:{
        name: { type : String},// Emergency contact person's name
        relationship : {type : String} , // Relationship to the user (e.g., parent, spouse)
        phoneNumber : {type : String} // Emergency contact phone number
    },

    emergencyNumber : {type : String},// Emergency Number (102, 911 ) related to Armenia.

    //virtual property to calculate number of jobs
    jobCount :{ type:Number , default:function (){return this.jobs.length;}},

    // Virtual property to calculate number of completed jobs
    completedJobCount:{
        type : Number,
        default : function(){
            return this.jobs.reduce((count , job)=>{
                return count + (job.status === 'completed' ? 1 : 0);
            }, 0 );
        },
    },


    //TimeStamps:
    createAt : {type : Date , default : Date.now},
    updateAt : {type : Date , default : Date.now},
    },

    
)

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;