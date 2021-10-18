const { db } = require("../../database/connection/connection.js");

const fetchArticles = () => {
    //Connect to DB
    return db()
        .then(db => {
            //Find and return the relevant articles in reverse chronological order
            return db.collection("articles")
                .find({})
                .sort({ date: -1 })
                .toArray()
        })
        .then(articles => {
            //Remove any id tags and the return to the controller
            articles = articles.map(article => {
                delete article._id;
                return article;
            })
            return articles;
        })
}

const addArticle = (article) => {
    return db()
        .then(db => {
            return db.collection("article")
                .insertOne(article)
        })
}

module.exports = { fetchArticles, addArticle };