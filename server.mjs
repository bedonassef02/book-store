import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { ApiError } from './utils/api.error.mjs';
import { globalErrors } from './middlewares/error.middleware.mjs';
import { DBConnection } from './config/database.connection.mjs';
import { bookRouter } from './routes/book.route.mjs';


dotenv.config({path: 'config.env'})

DBConnection();

const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
    console.log(`node ${process.env.NODE_ENV}`);
}

// routes

app.use('/api/v1/books', bookRouter);

app.all('*', (req, res, next) => {
    next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
})

app.use(globalErrors);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})

process.on('uncaughtException', (err) => {
    console.error(`unhandled rejection error: ${err.name} ${err.message}`);

    server.close(() => {
        console.error('shutdown server...');
        process.exit(1);
    })
})