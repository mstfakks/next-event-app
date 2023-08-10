import { MongoClient } from "mongodb";

const userName = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${userName}:${password}@cluster0.dr31itw.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return documents;
}
