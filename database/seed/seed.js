const { db } = require("../connection/connection.js");

async function seed(data) {
    return db()
        .then(async(db) => {
            await db.collection("articles").drop();
            await db.createCollection("articles")
            await db.collection("articles").insertMany(data.articleData)
            return db
        })
}

module.exports = seed;