const express = require("express");
const { getEmployees, getRole } = require("../controllers/employeesController");

const router = express.Router();

router.get("/", getEmployees);
router.get("/masterRole", getRole);

module.exports = router;
