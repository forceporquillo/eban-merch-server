import express from 'express';
import IDatabase from '../interfaces/IDatabase';
import productController from '../controllers/productController';

/**
 * Function that returns a router with the controllers
 * This is for using dependency injection with the database
 */
const productRoutes = (database: IDatabase) => {
    const controller = productController(database);
    const router = express.Router();

    // @route GET api/products
    // @desc get list of all products
    // @access Public
    router.get('/products', controller.getProducts);

    return router;
};

export default productRoutes;
