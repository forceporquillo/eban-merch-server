import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException.class';
import IDatabase from '../interfaces/IDatabase';
import logging from '../config/logging';

const NAMESPACE = 'Product Controller';

const productController = (database: IDatabase) => {
    /**
     * @route GET api/products
     * @desc get list of all products
     * @access Public
     */
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

    /**
     * @route GET api/products/:id
     * @desc get info of specific product
     * @access Public
     */
    const getProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = await database.getProduct(id);

            // if product does not exist
            // getProduct returns falsy if does not exist
            if (!product) {
                throw new HttpException(404, 'Product does not exist.');
            }

            res.status(200).json({
                message: 'Query Success.',
                data: product
            });
        } catch (error) {
            next(error);
        }
    };
    return {
        getProducts,
        getProduct
    };
};

export default productController;
