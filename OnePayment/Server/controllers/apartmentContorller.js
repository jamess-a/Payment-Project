const db = require("../../Server/db");

exports.getRoom = (req, res) => {
  const sql = "SELECT * FROM rooms";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
};
