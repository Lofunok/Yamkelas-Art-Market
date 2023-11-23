const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "79252626Lmk#",
    host: "localhost",
    port: 5432,
    database: "art_market_db"
});

module.exports = pool;