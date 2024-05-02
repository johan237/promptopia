import mongoose from 'mongoose';

let isConnected = false; // track the connection status


export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
    }
    try {
        const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/promptopia'

        await mongoose.connect(url, {
            dbName: 'share_prompt',
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('MongoDB connected successfully')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}