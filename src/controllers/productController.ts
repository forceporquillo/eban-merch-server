import { Request, Response, NextFunction } from 'express';
import IDatabase from '../interfaces/IDatabase';
import logging from '../config/logging';

const NAMESPACE = 'Product Controller';

const productController = (database: IDatabase) => {
    // @route GET api/products
    // @desc get list of all products
    // @access Public
    const getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await database.getProducts();
            res.status(200).json({
                message: 'Query Success.',
                data: products
            });
        } catch (error) {
            // throw error to error request handler automagically
            next(error);
        }
    };

    return {
        getProducts
    };
};

export default productController;
