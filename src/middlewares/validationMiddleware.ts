import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException.class';

/** validation */

const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    let message: string;

    // validate email
    message = validateEmail(newUser.email);
    if (message.length != 0) {
        throw new HttpException(400, message);
    }

    // validate password
    message = validatePassword(newUser.password);
    if (message.length != 0) {
        throw new HttpException(400, message);
    }
    next();
};

const validationMiddleware = {
    user: validateUser
};

// helper funcs
const validateEmail = (email: string): string => {
    if (email.length < 1) {
        return 'Email is empty.';
    }

    if (
        !email.match(
            /^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/
        )
    ) {
        return 'Email is invalid please input your email correctly. (eg. abcd.xyz_123@domain.com )';
    }

    return '';
};

const validatePassword = (password: string): string => {
    // check if password is empty
    if (password.length < 1) {
        return 'Password is empty.';
    }

    // check if password length is atleast 8 or at most 32
    if (password.length < 8 || password.length > 32) {
        return 'Password length must be greater than or equals 8 but less than or equals 32.';
    }

    // check if password is valid
    if (!password.match(/^.*(?=.{8,32})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& ]).*$/)) {
        return 'Password must be atleast one uppercase letter, one lowercase letter, one number and one special character.';
    }

    return '';
};

export default validationMiddleware;
