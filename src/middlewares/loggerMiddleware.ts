import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'LOGGER';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logging.info(
        NAMESPACE,
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS [${res.statusCode}]`
        );
    });

    next();
};

export default loggerMiddleware;
