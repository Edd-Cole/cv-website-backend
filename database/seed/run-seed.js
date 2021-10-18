const data = require("../data/devData/exports.js");
 const seed = require("./seed.js");
 const db = require("../connection/connection.js");

 const runSeed = (data) => {
     return seed(data).then(() => );
 }

 runSeed(data);
