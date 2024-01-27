const express = require("express");
const router = express.Router();

router.use("/login", require("./loginUser.js"));
router.use("/register", require("./registerUser.js"));
router.use("/authenticate", require("./authenticate.js"));
router.use("/logout", require("./logout.js"));

module.exports = router;
