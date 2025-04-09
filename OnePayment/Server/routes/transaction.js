const express = require("express");
const {
  qrcode,
  showlogs,
  deleteTransaction,
  editTransaction,
} = require("../controllers/transactionCrotroller");

const router = express.Router();

router.post("/QRPayment", qrcode);
router.get("/showlogs", showlogs);
router.delete("/:id", deleteTransaction);
router.patch("/changeStatus/:status_id", editTransaction);

module.exports = router;
