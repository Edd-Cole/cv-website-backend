const { fetchArticles } = require("../models/articles.model.js");

const getArticles = (request, response, next) => {
    return fetchArticles()
        .then(articles => {
            response.status(200).send({ articles });
        })
        .catch(error => {
            next(error);
        })
}

module.exports = { getArticles };