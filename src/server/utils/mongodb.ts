import { MongoClient } from "mongodb";
import { DbSchema } from "src/server/utils/dbSchema";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "estore";

let connected = false;

export async function getCollection<T extends keyof DbSchema>(collection: T) {
  if (!connected) {
    await client.connect();
    connected = true;
  }

  const db = client.db(dbName);
  return db.collection<DbSchema[T]>(collection);
}
