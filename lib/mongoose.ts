import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  // This option tells Mongoose to filter out any properties in a query that aren't defined in the schema before it sends the query to MongoDB. This can help prevent bugs and improve security.
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    return console.log('MONGODB_URL not found');
  }

  if (isConnected) {
    return console.log('MongoDB is already connected');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'stackquery',
    });
    console.log('MongoDB connection success.');
    isConnected = true;
  } catch (err) {
    console.log('MongoDB connection error.: ' + err);
  }
};
