const express = require("express");
const router = express.Router();
const { returnError, updateChild, updateTask } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { ChildId, TaskName, Deadline, Points, TaskId } = req.body;
  if (!ChildId) {
    return await returnError(req, res, "Nem adtál meg nevet");
  }
  if (!TaskName) {
    return await returnError(req, res, "Nem adtál meg jelszót");
  }
  if (!Deadline) {
    return await returnError(req, res, "Nem adtál meg pontot");
  }
  if (!Points) {
    return await returnError(req, res, "Nem található userId");
  }
  if (!TaskId) {
    return await returnError(req, res, "Nem található TaskId");
  }
  const updatedTask = await updateTask(ChildId, TaskName, Deadline, Points, TaskId);
  if (!updatedTask) {
    return await returnError(req, res, "Hiba történt a módosítás folyamán");
  }

  res.status(200).json({
    success: true,
    message: "Sikeres módosítás",
    updatedTask,
  });
});

module.exports = router;
