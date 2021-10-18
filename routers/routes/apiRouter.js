const apiRouter = require("express").Router();
const getEndpoints = require("../controllers/endpoints.controller.js")
const apiArticles = require("./apiArticles.js")

apiRouter.get("/", getEndpoints);
apiRouter.use("/articles", apiArticles)

module.exports = apiRouter;