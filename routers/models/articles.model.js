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

const fetchArticle = (title) => {
    //Remove underscores and replace them with spaces
    title = title.replace(/\_/g, " ")
        //Connect to Database
    return db()
        .then(db => {
            //Find and return the desired article
            return db.collection("articles")
                .findOne({ title })
        })
        .then(article => {
            //If article does not exist in the database, send an error
            if (!article) {
                return Promise.reject({ code: 404, message: "Article Not Found" })
            }
            //Delete the _id key and return to controller
            delete article._id;
            return article;
        });
}

const addArticle = async(article) => {
    //Create a date for the new article and attach it into the article object
    const date = new Date();
    article.date = date;
    console.log(article)
    if (!article.author || !article.date || !article.title || !article.article) {
        return Promise.reject({ code: 400, message: "Invalid Data" })
    }
    //Connect to Database
    await db()
        .then(db => {
            //Add in the received article
            return db.collection("articles")
                .insertOne(article);
        });
    //Using the above function, find and return the desired article
    return fetchArticle(article.title)
}

const editArticle = async(title, body) => {
    //If the body doesn't contain any relevant info to update the article with, return an error
    if (!body.title && !body.article && !body.date && !body.author) {
        return Promise.reject({ code: 400, message: "Invalid Data" })
    }
    //Remove underscores and replace them with spaces
    title = title.replace(/\_/g, " ");
    //Connect to Database
    await db()
        .then(db => {
            //Update the article given the title and the update for the article
            return db.collection("articles")
                .updateOne({ title }, { $set: body })
        });
    //Lastly, return the updated article
    return fetchArticle(title);
}

const removeArticle = (title) => {
    //Remove underscores and replace them with spaces
    title = title.replace(/\_/g, " ");
    return db()
        .then(db => {
            return db.collection("articles")
                .deleteOne({ title })
        })
}

module.exports = { fetchArticles, addArticle, fetchArticle, editArticle, removeArticle };