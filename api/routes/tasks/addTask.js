const express = require("express");
const router = express.Router();
const { returnError, createTask } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { ChildId, TaskName, Deadline, Points, UserId } = req.body;
  if (!ChildId) {
    return await returnError(req, res, "Nem található ChildId");
  }
  if (!TaskName) {
    return await returnError(req, res, "Nem adtál meg nevet");
  }
  if (!Deadline) {
    return await returnError(req, res, "Nem adtál meg határidőt");
  }
  if (!Points) {
    return await returnError(req, res, "Nem adtál meg pontszámot");
  }
  if (!UserId) {
    return await returnError(req, res, "Nem található userId");
  }

  const task = await createTask(ChildId, TaskName, Deadline, Points, UserId);
  if (!task) {
    return await returnError(req, res, "Hiba történt a feladat létrehozása közben");
  }

  res.status(200).json({
    success: true,
    message: "Sikeresen létrehoztad a feladatot",
    task,
  });
});

module.exports = router;
