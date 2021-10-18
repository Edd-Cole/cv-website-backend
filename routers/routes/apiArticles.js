const apiArticles = require("express").Router();
const { getArticles } = require("../controllers/articles.controller.js");

apiArticles.route("/").get(getArticles)

module.exports = apiArticles;