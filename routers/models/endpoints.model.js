const fs = require("fs/promises");

const fetchEndpoints = () => {
    return fs.readFile(`${__dirname}/../../endpoints.json`, "utf8")
        .then(endpoints => {
            endpoints = JSON.parse(endpoints);
            return endpoints;
        })
}

module.exports = fetchEndpoints;