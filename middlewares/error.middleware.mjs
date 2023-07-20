const globalErrors = (err, req, res, next) => {
    err.statusCode = res.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV !== 'production') {

    } else {

    }
}

const developmentErrors = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const productionErrors = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

export { globalErrors};