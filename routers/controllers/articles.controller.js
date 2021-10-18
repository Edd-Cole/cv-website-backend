const { fetchArticles } = require("../models/articles.model.js");

const getArticles = (request, response, next) => {
    //Invoke the model to get the articles from the database
    return fetchArticles()
        .then(articles => {
            //If successful, return the articles
            response.status(200).send({ articles });
        })
        .catch(error => {
            //Otherwise, send an error
            next(error);
        })
}

module.exports = { getArticles };