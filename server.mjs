import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import {ApiError} from './utils/api.error.mjs';
import {globalErrors} from './middlewares/error.middleware.mjs';
import {DBConnection} from './config/database.connection.mjs';
import {bookRouter} from './routes/book.router.mjs';
import {categoryRouter} from "./routes/category.router.mjs";
import {subCategoryRouter} from "./routes/subcategory.router.mjs";
import {authRouter} from "./routes/auth.router.mjs";
import {cartRouter} from "./routes/cart.router.mjs";
import {wishlistRouter} from "./routes/wishlist.router.mjs";


dotenv.config({path: 'config.env'})

DBConnection();

const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
    console.log(`node ${process.env.NODE_ENV}`);
}9


// routes

app.use('/api/v1/books', bookRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subcategories', subCategoryRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/wishlist', wishlistRouter);

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