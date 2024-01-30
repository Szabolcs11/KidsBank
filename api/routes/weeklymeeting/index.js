const express = require("express");
const router = express.Router();

router.use("/add", require("./addMeeting.js"));
router.use("/get", require("./getMeetings.js"));

module.exports = router;
