import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import logging from '../config/logging';
import config from '../config/config';
import IProduct from '../interfaces/IProduct';
import IUser from '../interfaces/IUser';
const NAMESPACE = 'Database';

/** Create connection to MySQL */
// TODO: config file
const connection = mysql.createPool({
    host: config.database.hostname,
    user: config.database.user,
    password: config.database.pass,
    database: config.database.database
});

/** Product Functions */

/**
 * Retrieves a list of all product objects
 * @param {void}
 * @returns {array} products
 */
const getProducts = async (): Promise<IProduct[]> => {
    // prepare statement
    const stmt = `
    SELECT GoodsID as id, 
        GoodsName as name, 
        GoodsImage as image, 
        GoodsCategory as category, 
        GoodsDescription as description, 
        Stocks as stocks, 
        GoodsPrice as price 
        FROM goodslistinfo`;

    const [rows] = await connection.promise().query(stmt);

    return JSON.parse(JSON.stringify(rows));

    // make the query
};

/**
 * Retrieves a specific product
 * @param {string} id
 * @returns {object} product
 */
const getProduct = async (id: string): Promise<IProduct> => {
    // prepare statement
    const stmt = `
    SELECT GoodsID as id, 
        GoodsName as name, 
        GoodsImage as image, 
        GoodsCategory as category, 
        GoodsDescription as description, 
        Stocks as stocks, 
        GoodsPrice as price 
        FROM goodslistinfo
        WHERE GoodsID = ${id}`;

    const [rows] = await connection.promise().query(stmt);

    return JSON.parse(JSON.stringify(rows))[0];
};

/**
 * Inserts new user into database
 * @param {IUser} user
 * @returns {number} userId
 */
const postUser = async (user: IUser) => {
    // prepare statement
    const stmt = `
    INSERT INTO users 
    (Email, Name, Pass, Address, ContactNo, Sex, BirthDate)
    VALUES(?, ?, ?, ?, ?, ?, ?);`;

    // hasing the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const [rows] = await connection
        .promise()
        .query(stmt, [
            user.email,
            user.name,
            hashedPassword,
            user.address,
            user.contact,
            user.sex,
            user.birthdate
        ]);

    const result = JSON.parse(JSON.stringify(rows));

    // insertId is the id of the new record
    return result.insertId;
};

/**
 * Login a user
 * @param email: string, password: email
 * @returns {number} userId
 */
const loginUser = async (email: string, password: string): Promise<number> => {
    return 1;
};

/**
 * Determines if email exists
 * @param {string} email
 * @returns {boolean}
 */
const emailExists = async (email: string): Promise<boolean> => {
    // prepare statement
    const stmt = `
    SELECT COUNT(AccountID) as count FROM users WHERE Email = ?`;

    const [rows] = await connection.promise().query(stmt, [email]);

    const result = JSON.parse(JSON.stringify(rows));

    if (result[0].count > 0) {
        return true;
    }

    return false;
};

/**
 * Determines if contact number exists
 * @param {string} contact
 * @returns {boolean}
 */
const contactExists = async (contact: string): Promise<boolean> => {
    // prepare statement
    const stmt = `
    SELECT COUNT(AccountID) as count FROM users WHERE ContactNo = ?`;

    const [rows] = await connection.promise().query(stmt, [contact]);

    const result = JSON.parse(JSON.stringify(rows));

    if (result[0].count > 0) {
        return true;
    }

    return false;
};
//TODO: remove test db func
const mockGetAll = async () => {
    // prepare statement
    const stmt = `
    INSERT INTO users 
    (Email, Name, Pass, Address, ContactNo, Sex, BirthDate)
    VALUES(?, ?, ?, ?, ?, ?, ?);`;

    const [rows] = await connection
        .promise()
        .query(stmt, [
            'jack@email.com',
            'Jack Roe',
            '!Asdf1234',
            'Address',
            '123456',
            0,
            '1999-07-06'
        ]);

    const result = JSON.parse(JSON.stringify(rows));

    logging.info(NAMESPACE, 'result: ', result);

    return result;
};

const database = {
    getProducts,
    getProduct,
    postUser,
    loginUser,
    emailExists,
    contactExists,
    mockGetAll
};

export default database;
