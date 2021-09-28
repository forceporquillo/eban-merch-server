import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import loggerMiddleware from './middlewares/loggerMiddleware';
import IDatabase from './interfaces/IDatabase';

// Route Imports
import productRoutes from './routes/productRoutes';
import logging from './config/logging';

const NAMESPACE = 'Server';
const app = express();

const createApp = (database: IDatabase) => {
    /** Logger */
    app.use(loggerMiddleware);

    /** Parse the request */
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    /** Rules of the API */
    app.use((req, res, next) => {
        // TODO: edit this for production
        res.header('Access-Control-Allow-Origin', '*');

        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    app.get('/', (req, res) => {
        res.status(200).json({
            message: 'Welcome to the API!'
        });
    });

    // Product Routes
    app.use('/api', productRoutes(database));

    // Test Route
    app.get('/api/test', async (req, res) => {
        const result = await database.mockGetAll();
        logging.info(NAMESPACE, 'query res: ', result);

        res.status(200).json(result);
    });

    /** Not Found */
    app.use((req, res, next) => {
        // TODO: reconsider error handling to avoid defining errors as 'any'
        const error: any = new Error('Route Not Found.');
        error.status = 404;

        next(error);
    });

    /** Error Handling */
    app.use(errorMiddleware);

    return app;
};

export default createApp;
