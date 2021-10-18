const { fetchArticles, addArticle, fetchArticle, editArticle, removeArticle } = require("../models/articles.model.js");

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
    //Invoke the model function
    return addArticle(request.body)
        .then(article => {
            //If successful, return the response with the attached article
            response.status(201).send({ article })
        })
        .catch(error => {
            //Otherwise, send an error
            next(error)
        })
}

const getArticle = (request, response, next) => {
    //Invoke the model with the title extracted from the parametric endpoint
    return fetchArticle(request.params.title)
        .then(article => {
            //If successful, return the desired article
            response.status(200).send({ article })
        })
        .catch(error => {
            //Otherwise, send an error
            next(error)
        })
}

const patchArticle = (request, response, next) => {
    //Invoke model with the title extracted from the parametric endpoint
    return editArticle(request.params.title, request.body)
        .then(article => {
            //If successful, return the updated article
            response.status(200).send({ article })
        })
        .catch(error => {
            //Otherwise, send an error
            next(error)
        })
}

const deleteArticle = (request, response, next) => {
    return removeArticle(request.params.title)
        .then(() => {
            response.sendStatus(204);
        })
        .catch(error => {
            next(error)
        })
}

module.exports = { getArticles, postArticle, getArticle, patchArticle, deleteArticle };