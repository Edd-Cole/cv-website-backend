const apiArticles = require("express").Router();
const { getArticles } = require("../controllers/articles.controller.js");

//Route /api/articles - GET, POST
apiArticles.route("/").get(getArticles)

module.exports = apiArticles;