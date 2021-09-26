import mysql from 'mysql2';

import logging from '../config/logging';
const NAMESPACE = 'Database';

/** Create connection to MySQL */
// TODO: config file
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ebanmerch'
});

/** Product Functions */

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

const database = {
    getProducts
};

export default database;
