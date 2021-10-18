const { fetchArticles, addArticle } = require("../models/articles.model.js");

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

const postArticle = (request, response, next) => {
    console.log(request.body)
    return addArticle(request.body)
        .then(article => {
            delete article.acknowledged;
            delete article.insertedId;
            response.status(201).send({ article })
        })
        .catch(error => {
            next(error)
        })
}

module.exports = { getArticles, postArticle };