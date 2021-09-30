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
     * @desc get list of all products
     * @access Public
     */
    router.post('/', validation.user, controller.postUser);
    return router;
};

export default userRoutes;
