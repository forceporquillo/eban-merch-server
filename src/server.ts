import createApp from './app';
import database from './database/database';
import config from './config/config';
import logging from './config/logging';

const NAMESPACE = 'Server';
// TODO: live database
// create app with live database
const server = createApp(database);

// start server
server.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`);
});
