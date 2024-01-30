const express = require("express");
const router = express.Router();

router.use("/add", require("./addReward.js"));
router.use("/get", require("./getRewards.js"));
router.use("/update", require("./updateReward.js"));
router.use("/delete", require("./deleteReward.js"));
router.use("/redeem", require("./reedemReward.js"));

module.exports = router;
