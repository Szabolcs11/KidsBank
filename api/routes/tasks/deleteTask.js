const express = require("express");
const router = express.Router();
const { returnError, removeTask } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { TaskId } = req.body;
  if (!TaskId) {
    return await returnError(req, res, "Nem található TaskId");
  }
  const tasks = await removeTask(TaskId);
  if (!tasks) {
    return await returnError(req, res, "Hiba történt a feladat törlése közben");
  }
  res.status(200).json({
    success: true,
    message: "Sikeresen törölted a feladatot",
  });
});

module.exports = router;
