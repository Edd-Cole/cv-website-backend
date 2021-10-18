const data = require("../data/devData/exports.js");
const seed = require("./seed.js");
const { db, client } = require("../connection/connection.js");

const runSeed = (data) => {
    return seed(data).then(() => client.close());
}

runSeed(data);