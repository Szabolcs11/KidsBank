const express = require("express");
const router = express.Router();

router.use("/add", require("./addInvestment.js"));
router.use("/get", require("./getInvestment.js"));
router.use("/delete", require("./deleteInvestment.js"));

module.exports = router;
