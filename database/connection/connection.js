const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
let client = new MongoClient(url);

const ENV = process.env.NODE_ENV || "development";

const dbName = ENV === "test" ? "cv-website-test" : "cv-website-dev";

if (ENV === "production") {
    const uri = "mongodb+srv://eddkleszcz:${{secrets.MONGO_PASSWORD}}@cluster0.hzrzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

const db = async() => {
    await client.connect();
    const db = client.db(dbName);
    return db;
};

module.exports = { client, db };