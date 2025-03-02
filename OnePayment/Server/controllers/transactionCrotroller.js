const db = require("../../Server/db");
exports.qrcode = (req, res) => {
  const {
    transaction_id,
    bank_id,
    divided,
    amount,
    timestamp,
    user_id,
    status,
  } = req.body;
  console.log("body", req.body);

  const sql =
    "INSERT INTO logs (transaction_id, bank_id, divided, amount, timestamp, user_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [transaction_id, bank_id, divided, amount, timestamp, user_id, status],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.status(201).json({
        success: true,
        data: {
          transaction_id,
          bank_id,
          divided,
          amount,
          timestamp,
          user_id,
          status,
        },
      });
    }
  );
};

exports.showlogs = (req, res) => {
  const sql = `
      SELECT logs.*, users.username AS user_name 
      FROM logs 
      JOIN users ON logs.user_id = users.id
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
  const sql = "UPDATE logs SET status = ? WHERE transaction_id = ?";
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
