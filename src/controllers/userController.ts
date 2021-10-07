import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException.class';
import IDatabase from '../interfaces/IDatabase';
import config from '../config/config';
import logging from '../config/logging';

const NAMESPACE = 'User Controller';

const userController = (database: IDatabase) => {
    /**
     * @route POST api/user
     * @desc get list of all products
     * @access Public
     */
    const postUser = async (req: Request, res: Response, next: NextFunction) => {
        const newUser = req.body;
        try {
            // check if email is taken
            logging.debug(NAMESPACE, 'new user:', newUser);
            const isExist = await database.emailExists(newUser.email);
            logging.debug(NAMESPACE, 'is exist: ', isExist);
            if (isExist) {
                throw new HttpException(400, 'Email is already taken.');
            }
            // check if contact number is taken
            if (await database.contactExists(newUser.contact)) {
                throw new HttpException(400, 'Contact number is already taken.');
            }
            // insert into database
            const newUserID = await database.postUser(newUser);
            res.status(201).json({
                message: 'User created successfully.',
                data: {
                    userID: newUserID
                }
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * @route POST api/user/login
     * @desc get list of all products
     * @access Public
     */
    const loginUser = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {
            // login user
            const userId = await database.loginUser(email, password);

            if (userId == -1) {
                throw new HttpException(400, 'Login Failed.');
            }

            // generate jwt token
            const signOptions = { expiresIn: 3 * 24 * 60 * 60 };

            const token = jwt.sign({ id: userId }, config.key.secret, signOptions);

            return res.status(200).json({
                message: 'Login Success.',
                token
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * @route GET api/user
     * @desc get list of all products
     * @access Public
     */
    const getUser = async (
        decoded: JwtPayload,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = decoded;
            const user = await database.getUserById(id);
            res.status(200).json({
                message: 'Query Success.',
                data: user
            });
        } catch (error) {
            next(error);
        }
    };

    return {
        postUser,
        loginUser,
        getUser
    };
};

export default userController;
