const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/apiRouter.js");
const { dbErrors, customErrors, fatalErrors } = require("./errorRoutes/errors.js");

//Setting up routing compilation for backend
const app = express();
app.use(cors());
app.use(express.json());

//Routing for backend and errors
app.use("/", apiRouter);
app.use(dbErrors);
app.use(customErrors);
app.use(fatalErrors);

module.exports = app;
