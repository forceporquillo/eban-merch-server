import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException.class';
import IDatabase from '../interfaces/IDatabase';
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

    return {
        postUser
    };
};

export default userController;
