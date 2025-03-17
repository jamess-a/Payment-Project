const db = require("../../Server/db");
exports.qrcode = (req, res) => {
  const { bank_id, divided, amount, timestamp, user_uid, status } = req.body;
  console.log("body", req.body);

  const sql =
    "INSERT INTO transactions (transaction_id, bank_id, divided, amount, timestamp, user_uid, status) VALUES (UUID(), ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [bank_id, divided, amount, timestamp, user_uid, status],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.status(201).json({
        success: true,
        data: {
          transaction_id: result.insertId,
          bank_id,
          divided,
          amount,
          timestamp,
          user_uid,
          status,
        },
      });
    }
  );
};

exports.showlogs = (req, res) => {
  const sql = `
    SELECT transactions.*, users.username AS user_name 
    FROM transactions 
    JOIN users ON transactions.user_uid = users.uid
    ORDER BY transaction_id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.status(200).json({ success: true, data: result });
  });
};

exports.deleteTransaction = (req, res) => {
  const { id } = req.params; // เปลี่ยนจาก transaction_id เป็น id
  console.log("Transaction ID:", id);

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Transaction ID is required." });
  }

  const sql = "DELETE FROM logs WHERE transaction_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting transaction:", err);
      return res.status(500).json({
        success: false,
        message: "Error deleting transaction.",
      });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found." });
    }

    res.status(200).json({
      success: true,
      message: `Transaction with ID ${id} deleted successfully.`,
    });
  });
};

exports.editTransaction = (req, res) => {
  const { status_id } = req.params;
  const { status } = req.body;
  if (!status_id) {
    return res
      .status(400)
      .json({ success: false, message: "Transaction ID is required." });
  }
  const sql = "UPDATE transactions SET status = ? WHERE transaction_id = ?";
  db.query(sql, [status, status_id], (err, result) => {
    if (err) {
      console.error("Error updating transaction:", err);
      return res.status(500).json({
        success: false,
        message: "Error updating transaction.",
      });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found." });
    }

    res.status(200).json({
      success: true,
      message: `Transaction with ID ${status_id} updated successfully.`,
    });
  });
};
