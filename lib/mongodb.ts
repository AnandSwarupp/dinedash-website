import mongoose from "mongoose";
import { setServers, setDefaultResultOrder } from "dns";

// Windows DNS Client blocks SRV record lookups needed by mongodb+srv://
// Force Node.js to query Google DNS directly, bypassing the local resolver
setServers(["8.8.8.8", "8.8.4.4"]);
setDefaultResultOrder("ipv4first");

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

declare global {
  var _mongooseConn: typeof mongoose | null;
  var _mongoosePromise: Promise<typeof mongoose> | null;
}

let cached = global._mongooseConn;
let cachedPromise = global._mongoosePromise;

export async function connectDB() {
  if (cached) return cached;

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      family: 4, // force IPv4 — avoids Windows IPv6 DNS resolution issues
    }).catch((err) => {
      // Clear the cached promise on failure so the next request retries
      cachedPromise = null;
      global._mongoosePromise = null;
      throw err;
    });
    global._mongoosePromise = cachedPromise;
  }

  cached = await cachedPromise;
  global._mongooseConn = cached;
  return cached;
}
