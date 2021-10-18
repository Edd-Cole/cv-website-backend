const apiArticles = require("express").Router();
const { getArticles, postArticle, getArticle } = require("../controllers/articles.controller.js");

//Route /api/articles - GET, POST
apiArticles.route("/").get(getArticles).post(postArticle)

//Route /api/articles/:title - GET, PATCH, DELETE
apiArticles.route("/:title").get(getArticle)

module.exports = apiArticles;