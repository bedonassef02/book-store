class ApiError extends Error {
    constructor(message, statusCode) {
        super(message, statusCode);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'failed' : 'error';
        this.isOperational = true;
    }
}

export {ApiError};