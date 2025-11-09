import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  // Throwing helps detect misconfiguration early on server start
  throw new Error(
    "Please set the MONGODB_URI environment variable in .env.local"
  );
}

let client;
let clientPromise;

// In development, reuse a global variable to avoid exhausting connections
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
