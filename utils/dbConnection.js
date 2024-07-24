const mongoose = require('mongoose');

// Connect to MONGODB

let isConnected = false; //Tracking database Connection...

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); 

    // Check
    if (isConnected) {
        console.log('MongoDB is already connected');
        return mongoose.connection;
    }
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            dbName: 'Gtnelu_DB'
        });

        isConnected = true;
        console.log('MongoDB connected successfully');
        return mongoose.connection;

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};
