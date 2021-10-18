const apiArticles = require("express").Router();

apiArticles.route("/").get(getArticles)