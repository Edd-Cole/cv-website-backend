const app = require("./routers/app.js")

const { PORT = 7000 } = process.env;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`)
})