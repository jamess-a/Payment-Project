const express = require("express");
const { getRoom } = require("../controllers/apartmentContorller");

const router = express.Router();

router.get("/getroom", getRoom);

module.exports = router;
