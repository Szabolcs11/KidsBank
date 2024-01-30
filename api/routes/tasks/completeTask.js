const express = require("express");
const router = express.Router();
const { returnError, completeTask } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { TaskId } = req.body;
  if (!TaskId) {
    return await returnError(req, res, "Nem található TaskId");
  }
  const tasks = await completeTask(TaskId);
  if (!tasks) {
    return await returnError(req, res, "Hiba történt");
  }
  res.status(200).json({
    success: true,
    message: "Sikeresen elvégezted a feladatot",
  });
});

module.exports = router;
