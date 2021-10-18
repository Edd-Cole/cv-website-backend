const apiArticles = require("express").Router();
const { getArticles } = require("../controllers/articles.controller.js");

//Route /api/articles - GET, POST
apiArticles.route("/").get(getArticles)

//Route /api/articles/:title - GET
apiArticles.route("/:title")

module.exports = apiArticles;