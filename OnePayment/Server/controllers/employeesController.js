const db = require("../../Server/db");

exports.getEmployees = (req, res) => {
  const { uid, email, role } = req.query;

  let sql = `
    SELECT users.*, role.role_name as role_name
    FROM users
    LEFT JOIN role ON users.role_id = role.role_id
    WHERE 1=1
  `;
  let values = [];

  if (uid) {
    sql += " AND users.uid LIKE ?";
    values.push(`%${uid}%`);
  }
  if (email) {
    sql += " AND users.email LIKE ?";
    values.push(`%${email}%`);
  }
  if (role) {
    sql += " AND users.role_id = ?"; 
    values.push(role);
  }

  console.log(values);

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      }
      res.status(200).json({ success: true, data: result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
exports.getRole = (req, res) => {
  const sql = "SELECT * FROM role";
  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.status(200).json({ success: true, data: result });
  });
};
