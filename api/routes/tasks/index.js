const express = require("express");
const router = express.Router();

router.use("/add", require("./addTask.js"));
router.use("/get", require("./getTasks.js"));
router.use("/update", require("./updateTasks.js"));
router.use("/delete", require("./deleteTask.js"));
router.use("/complete", require("./completeTask.js"));

module.exports = router;
