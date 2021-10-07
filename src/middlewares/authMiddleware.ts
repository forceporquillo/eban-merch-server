import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException.class';
import config from '../config/config';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // get auth header
    const bearerHeader = req.headers['authorization'];
    // Check if bearer
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        bearerToken;

        jwt.verify(bearerToken, config.key.secret, (error, decoded) => {
            // we keep the decoded argument in case we need it later
            if (error) {
                throw new HttpException(403, 'Access Token is invalid.');
            } else {
                next(decoded);
            }
        });
    } else {
        // forbidden
        // throw the error to be caught by error handling middleware
        throw new HttpException(401, 'Endpoint forbidden. Missing Authorization header.');
    }
};

export default verifyToken;
