import express from 'express';
import IDatabase from '../interfaces/IDatabase';
import userController from '../controllers/userController';
import validation from '../middlewares/validationMiddleware';

/**
 * Function that returns a router with the controllers
 * This is for using dependency injection with the database
 */
const userRoutes = (database: IDatabase) => {
    const controller = userController(database);
    const router = express.Router();

    /**
     * @route POST api/user
     * @desc register a user
     * @access Public
     */
    router.post('/', validation.user, controller.postUser);

    /**
     * @route POST api/user/login
     * @desc log a user in
     * @access Public
     */
    router.post('/login', controller.loginUser);
    return router;
};

export default userRoutes;
