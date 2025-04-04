const db = require("../../Server/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { email, displayName, photoURL, uid } = req.body;

  const newUser = {
    username: displayName || email.split("@")[0], // ตั้งชื่อผู้ใช้จาก displayName หรือส่วนที่อยู่หน้า @ ในอีเมล
    email: email,
    password: "defaultPassword", // ใช้รหัสผ่านเริ่มต้น
    age: 0,
    phone: "",
    height: 0,
  };

  // ตรวจสอบให้แน่ใจว่า password มีค่า
  if (!newUser.password) {
    return res.status(400).json({ error: "Password is required" });
  }

  // เข้ารหัสรหัสผ่าน
  bcrypt.hash(newUser.password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error("❌ Error hashing password:", hashErr);
      return res.status(500).json({ error: "Error hashing password" });
    }

    // อัพเดต newUser ด้วยรหัสผ่านที่เข้ารหัสแล้ว
    newUser.password = hashedPassword;

    const insertSql =
      "INSERT INTO users (username, password, email, age, phone, height) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      insertSql,
      [
        newUser.username,
        newUser.password,
        newUser.email,
        newUser.age,
        newUser.phone,
        newUser.height,
        newUser.photoURL,
      ],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("❌ Insert Error:", insertErr);
          return res.status(500).json({ error: "Insert failed" });
        }

        console.log("✅ User Created:", newUser);
        res.status(201).json({ message: "User created", user: newUser });
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
  const { uid } = req.query;

  const sql = `
    SELECT users.*, role.role_name 
    FROM users 
    JOIN role ON users.role_id = role.role_id 
    WHERE uid = ?`;

  db.query(sql, [uid], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const user = result[0];
      console.log(user);
      return res.json({
        success: true,
        message: "Login successful",
        user: {
          uid: user.uid,
          username: user.username,
          email: user.email,
          age: user.age,
          phone: user.phone,
          height: user.height,
          role: user.role_name, 
        },
      });
    }
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
