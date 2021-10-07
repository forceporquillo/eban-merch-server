import dotenv from 'dotenv';

dotenv.config();

// http server config
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

// db server config
const MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME || 'localhost';
const MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
// edit .env if you want a different db name
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'ebanmerch';

const DATABASE = {
    hostname: MYSQL_HOSTNAME,
    user: MYSQL_USERNAME,
    pass: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
};

// secret key
const KEY = {
    secret: 'TLajRs30u1'
};

const config = {
    server: SERVER,
    database: DATABASE,
    key: KEY
};

export default config;
