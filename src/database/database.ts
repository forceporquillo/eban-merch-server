import mysql from 'mysql2';

import logging from '../config/logging';
import config from '../config/config';
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
const getProducts = async () => {
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
const getProduct = async (id: string) => {
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
//TODO: remove test db func
const mockGetAll = async () => {
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
        WHERE GoodsID = 1`;

    const [rows] = await connection.promise().query(stmt);

    return JSON.parse(JSON.stringify(rows))[0];
};

const database = {
    getProducts,
    getProduct,
    mockGetAll
};

export default database;
