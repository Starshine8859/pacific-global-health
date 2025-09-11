import { MongoClient, Db } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb+srv://globalhealth:kTTTqqjoM4kcQg2b@cluster0.qlxqtts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const dbName = process.env.MONGODB_DB || "sample_mflix"

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

  // Ensure indexes exist for performance and opened tracking
  try {
    await Promise.all([
      db.collection('contacts').createIndexes([
        { key: { createdAt: -1 }, name: 'contacts_createdAt_desc' },
        { key: { opened: 1, openedAt: -1 }, name: 'contacts_opened_openedAt' },
        { key: { 'openedBy.id': 1 }, name: 'contacts_openedBy_id' },
      ]),
      db.collection('training_applications').createIndexes([
        { key: { createdAt: -1 }, name: 'training_createdAt_desc' },
        { key: { opened: 1, openedAt: -1 }, name: 'training_opened_openedAt' },
        { key: { 'openedBy.id': 1 }, name: 'training_openedBy_id' },
      ]),
      db.collection('users').createIndexes([
        { key: { email: 1 }, name: 'users_email_unique', unique: true },
        { key: { username: 1 }, name: 'users_username_unique', unique: true },
        { key: { role: 1 }, name: 'users_role' },
        { key: { isActive: 1 }, name: 'users_isActive' },
        { key: { createdAt: -1 }, name: 'users_createdAt_desc' },
      ]),
      db.collection('login_logs').createIndexes([
        { key: { timestamp: -1 }, name: 'login_logs_timestamp_desc' },
        { key: { email: 1 }, name: 'login_logs_email' },
        { key: { success: 1 }, name: 'login_logs_success' },
        { key: { email: 1, timestamp: -1 }, name: 'login_logs_email_timestamp' },
      ]),
    ])
  } catch (e) {
    console.warn('Index creation warning:', e)
  }

  cachedClient = client
  cachedDb = db

  return { client, db }
}


