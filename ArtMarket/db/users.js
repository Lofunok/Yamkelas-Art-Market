var mysql = require('mysql2')

var con = mysql.createConnection({
    host: "localhost",
  user: "root",
  password: "79252626Lmk#",
  database: "art_market_db",
})

con.connect(function(err)
{
if (err) throw err;
console.log("Connected to MySQL");
});


module.exports.findByUsername = (username, password, done) => {
    try {
        var sql = "select userid name, surname, password, age, email, usertype, bio, phonenumber where username=? AND password=?"

        var values = [
            username,
            password
        ]

        con.query(sql, values, function (err, result)
        {
            if (err) {
                console.log(err);
                return done(err);
            }

            if (result.length > 0)
            done(null, result[0]);
        else
        done (new Error("User Not Found"));
        });
} catch (e) {
    console.log(e);
}
}

module.exports.getprofile = (id, done) => {
    try {
        var sql = "select userid name, surname, password, age, email, usertype, bio, phonenumber where id=?"

        var values = [
            id
        ]

        con.query(sql, values, function (err, result)
        {
            if (err) {
                console.log(err);
                return done(err);
            }

            if (result.length > 0)
            done(null, result[0]);
        else
        done (new Error("User Not Found"));
        });
} catch (e) {
    console.log(e);
}
}