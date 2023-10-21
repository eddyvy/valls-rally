const { MongoClient } = require('mongodb')
const uri = process.env['MONGO_URI']

export async function query(func) {
  const client = new MongoClient(uri)
  await client.connect()
  const database = client.db(process.env['MONGO_DB'])
  try {
    return await func(database)
  } finally {
    await client.close()
  }
}
