const mongoose = require ('mongoose')

//Connect to MONGODB

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery' , ture)

    //check
    if (isConnected){
        console.log('MongoDB is Already Connected')
        return mongoose.connection;

    }
    try {
        await mongoose.connect(process.env.mongoURI ,{
            dbName : 'Gtnelu_DB'
        });

        isConnected = ture;
        console.log('MongoDB is Connected');
        return mongoose.connection;
        
    } catch (error) {
        console.error('Failed to Connecting to MongoDB' , error)
        throw error;

    }
}
