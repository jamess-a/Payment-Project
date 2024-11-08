const db = require("../../Server/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.showlogs = (req, res) => {
  const sql = "SELECT * FROM logs";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({ success: true, data: result });
  });
};

exports.transaction = (req, res) => {
  const { transaction_id, bank_id, divided, amount, timestamp } = req.body;

  // Validate parameters
  if (bank_id == null) {
    return res
      .status(400)
      .json({ success: false, error: "Missing parameter: bank_id" });
  }
  if (typeof amount !== "number" || amount < 0) {
    return res
      .status(400)
      .json({ success: false, error: "Amount must be a positive number" });
  }
  if (isNaN(divided)) {
    return res
      .status(400)
      .json({ success: false, error: "'divided' must be a number" });
  }

  const sql =
    "INSERT INTO logs (transaction_id, bank_id, divided, amount, timestamp) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [transaction_id, bank_id, divided, amount, timestamp],
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.status(201).json({
        success: true,
        data: { transaction_id, bank_id, divided, amount, timestamp },
      });
    }
  );
};

exports.register = (req, res) => {
  console.log(req.body);
  const { username, password, email, ages, phone, height } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;
    const sql =
      "INSERT INTO users (username, password, email , age , phone , height) VALUES (?, ?, ? , ? , ? , ?)";
    db.query(
      sql,
      [username, hashedPassword, email, ages, phone, height],
      (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send("User registered");
      }
    );
  });
};

exports.show = (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(400).send("User not found");

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(400).send("Incorrect password");
      const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
        expiresIn: "1h",
      });
      res.json({ token });
    });
  });
};

exports.Admin_login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM admins WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(400).send("User not found");

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(400).send("Incorrect password");
      const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
        expiresIn: "1h",
      });
      res.json({ token });
    });
  });
};
