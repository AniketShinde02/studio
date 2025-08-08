
import 'dotenv/config';
import mongoose, { Mongoose } from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('CRITICAL: MONGODB_URI is not defined in .env file.');
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;
let cachedClient = (global as any).mongoClient;


if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

if (!cachedClient) {
    cachedClient = (global as any).mongoClient = { client: null, promise: null };
}


async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    
    console.log('Attempting to connect to MongoDB with Mongoose...');
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('New Mongoose connection established.');
      return mongoose;
    }).catch(err => {
      console.error('Mongoose connection error:', err);
      cached.promise = null; // Reset promise on error
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!cachedClient.promise) {
    client = new MongoClient(MONGODB_URI);
    cachedClient.promise = client.connect();
  }
  clientPromise = cachedClient.promise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export { clientPromise };
export default dbConnect;
