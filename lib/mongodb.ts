import { MongoClient, Db } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb+srv://glowsenior:ckdrhkd19612@yj.f3s0wwr.mongodb.net/?retryWrites=true&w=majority&appName=YJ"
const dbName = process.env.MONGODB_DB || "test"

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment variables")
}

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}


