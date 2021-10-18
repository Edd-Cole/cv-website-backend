const { client } = require('./connection');

const initialiseDB = async(name) => {
    await client.connect();
    const db1 = await client.db(`${name}-test`);
    const db2 = await client.db(`${name}-dev`);
    await db1.createCollection("articles");
    await db2.createCollection("articles");
    console.log("db's initialised")
    return client.close();
}

initialiseDB("cv-website");