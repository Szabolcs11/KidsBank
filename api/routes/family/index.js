const express = require("express");
const router = express.Router();

router.use("/add", require("./AddFamlyMember.js"));
router.use("/get", require("./GetFamilyMembers.js"));
router.use("/update", require("./UpdateFamilyMember.js"));
router.use("/delete", require("./DeleteFamilyMember.js"));

module.exports = router;
