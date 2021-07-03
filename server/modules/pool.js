const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}

const pool = new Pool(config);

// debugging
pool.on('connect', (client) => {
    console.log('PostgeSQL connected');
});

pool.on('error', (err, client) => {
    console.log('Unexpected error on idle client', err);
  });

module.exports = pool;