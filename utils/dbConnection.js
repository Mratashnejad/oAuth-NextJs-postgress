const mongoose = require('mongoose');

// Connect to MONGODB

let isConnected = false; //Tracking database Connection...

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); 

    // Check
    if (isConnected) {
        console.log('MongoDB is Already Connected');
        return mongoose.connection;
    }

    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            dbName: 'Gtnelu_DB'
        });

        isConnected = true;
        console.log('MongoDB is Connected');
        return mongoose.connection;

    } catch (error) {
        console.error('Failed to Connecting to MongoDB', error);
        throw error;
    }
};
