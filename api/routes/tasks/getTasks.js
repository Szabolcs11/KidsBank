const express = require("express");
const router = express.Router();
const { returnError, getTasks } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { UserId } = req.body;
  if (!UserId) {
    return await returnError(req, res, "Nem található userId");
  }
  const tasks = await getTasks(UserId);
  if (!tasks) {
    return await returnError(req, res, "Hiba történt a feladat lekérése közben");
  }

  res.status(200).json({
    success: true,
    tasks,
  });
});

module.exports = router;
