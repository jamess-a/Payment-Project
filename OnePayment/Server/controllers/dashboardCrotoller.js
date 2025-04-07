const db = require("../../Server/db");

exports.getSummary = (req, res) => {
  const sql = `
  SELECT SUM(IFNULL(amount, 0)) AS total_amount
  FROM transactions
  WHERE timestamp BETWEEN NOW() - INTERVAL 7 DAY AND NOW() 
  AND status = 'approved';
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    const totalAmount = result[0]?.total_amount || 0;
    res.status(200).json({ success: true, data: { totalAmount } });
  });
};

exports.getlastestTransactions = (req, res) => {
  const sql = `
  SELECT 
  transactions.id AS transaction_id,
  transactions.transaction_ref AS transaction_ref,
  transactions.timestamp AS timestamp_thai,
  users.username AS payee,
  transactions.status AS transaction_status
  FROM transactions
  JOIN users ON transactions.user_uid = users.uid
  ORDER BY transactions.timestamp DESC
  LIMIT 15;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.status(200).json({ success: true, data: result });
  });
};

exports.getMostPopular = (req, res) => {
  const sql = `
  SELECT 
  users.id AS users_id, 
  users.username, 
  COUNT(transactions.id) AS transaction_count,
  SUM(IFNULL(amount, 0)) AS total_amount
  FROM transactions
  JOIN users ON transactions.user_uid = users.uid
  GROUP BY users.id, users.username
  ORDER BY transaction_count DESC
  LIMIT 1;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(200).json({ success: true, data: result[0] });
    } else {
      return res.status(200).json({ success: true, data: null });
    }
  });
};

exports.getTotalTransactions = (req, res) => {
  const sql = `
  SELECT COUNT(*) AS total_transactions
  FROM transactions
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    const totalTransactions = result[0]?.total_transactions || 0;
    res.status(200).json({ success: true, data: { totalTransactions } });
  });
};
