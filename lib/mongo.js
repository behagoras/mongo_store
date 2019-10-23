const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;
// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    if (config.dev) {
      // console.log(MONGO_URI);
    }
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }

          // eslint-disable-next-line no-console
          console.log('Connected successfully to mongo', this.dbName);
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  getAll(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  }

  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });

  }

  create(collection, data) {
    return this.connect().then((db) => {
      return db.collection(collection).insertOne({ data });
    }).then((result) => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect().then((db) => {
      return db.collection(collection).updateOne(
        { _id: ObjectId(id) },
        { $set: data },
        { upsert: true },
      );
    }).then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).deleteOne({ id });
    }).then(() => id);

  }
}

module.exports = MongoLib;

