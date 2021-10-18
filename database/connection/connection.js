const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
let client = new MongoClient(url);

const ENV = process.env.NODE_ENV || "development";

let dbSuffix = process.env.NODE_ENV || "";

const dbName = ENV === "test" ? "cv-site-test" : "cv-site-dev";

if (ENV === "production") {
    const uri = //Add in on hosting
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

const db = async() => {
    await client.connect();
    const db = client.db(dbName);
    return db;
};

module.exports = { client, db };