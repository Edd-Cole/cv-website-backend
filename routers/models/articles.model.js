const { db } = require("../../database/connection/connection.js");

const fetchArticles = () => {
    return db()
        .then(db => {
            return db.collection("articles")
                .find({})
                .sort({ date: -1 })
                .toArray()
        })
        .then(articles => {
            articles = articles.map(article => {
                delete article._id;
                return article;
            })
            return articles;
        })
}

module.exports = { fetchArticles };