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
    console.log(totalAmount)
    res.status(200).json({ success: true, data: { totalAmount } });
  });
};
