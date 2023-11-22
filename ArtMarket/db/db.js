const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Khumalo1959",
    host: "localhost",
    port: 5432,
    database: "art_market_db"
});

module.exports = pool;