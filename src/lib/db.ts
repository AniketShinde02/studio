
import 'dotenv/config';
import mongoose, { Mongoose, Db } from 'mongoose';
import { MongoClient, Db as MongoDb } from 'mongodb';


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

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    
    console.log('Attempting to connect to MongoDB...');
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

export function getDb(): MongoDb {
    if (!cached.conn) {
        throw new Error('Database not connected. Call dbConnect first.');
    }
    // Mongoose connection object has a `db` property which is the native driver's Db object
    return cached.conn.connection.db;
}


export default dbConnect;
