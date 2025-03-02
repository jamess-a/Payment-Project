const db = require("../../Server/db");
exports.qrcode = (req, res) => {
    const { transaction_id, bank_id, divided, amount, timestamp } = req.body;
    
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

exports.showlogs = (req, res) => {
  const sql = "SELECT * FROM logs";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({ success: true, data: result });
  });
};