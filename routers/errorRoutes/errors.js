const dbErrors = (error, request, response, next) => {
    // if(error.code === ) {

    // } else {
    //     next(error);
    // }
}

const customErrors = (error, request, response, next) => {
    if (error.code && error.message) {
        response.status(error.code).send({ message: error.message });
    } else {
        next(error);
    }
}

const fatalErrors = (error, request, response, next) => {
    response.status(500).send({ message: "Internal Server Error" })
}

module.exports = { dbErrors, customErrors, fatalErrors };