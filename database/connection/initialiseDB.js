const { client } = require('./connection');

const initialiseDB = async(name) => {
    await client.connect();
    const db1 = await client.db(`${name}-backend`);
    const db2 = await client.db(`${name}-frontend`);
}

initialiseDB();