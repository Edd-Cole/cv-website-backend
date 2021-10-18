const fetchEndpoints = require("../models/endpoints.model.js");

const getEndpoints = (request, response, next) => {
    return fetchEndpoints()
        .then(endpoints => {
            response.status(200).send({ endpoints })
        })
        .catch(error => {
            next(error)
        })
}

module.exports = getEndpoints